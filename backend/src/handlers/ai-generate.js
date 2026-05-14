import { authMiddleware } from '../_auth_middleware.js';

const AI_KEY = process.env.GOOGLE_AI_API_KEY;
const AI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

async function callAI(prompt, maxTokens = 1024) {
  if (!AI_KEY) return { error: 'AI API key not configured. Add GOOGLE_AI_API_KEY to your environment.' };
  try {
    const res = await fetch(`${AI_URL}?key=${AI_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { maxOutputTokens: maxTokens, temperature: 0.7 }
      })
    });
    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) return { error: 'AI returned empty response' };
    return { text };
  } catch (err) {
    return { error: err.message };
  }
}

function cleanJSON(text) {
  try {
    const match = text.match(/\[[\s\S]*?\]/);
    if (match) return JSON.parse(match[0]);
    return JSON.parse(text);
  } catch {
    return null;
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    // Use custom auth instead of Supabase
    let user;
    try {
      user = await authMiddleware(req);
    } catch (authError) {
      return res.status(401).json({ error: authError.message });
    }

    const { action, data: payload } = req.body;

    // 1. ANALYZE REVIEW SENTIMENT
    if (action === 'analyze_sentiment') {
      const { reviews } = payload;
      if (!reviews || !reviews.length) return res.status(400).json({ error: 'Reviews array required' });
      const reviewTexts = reviews.map((r, i) => `${i + 1}. "${r.content}" (Rating: ${r.rating}/5)`).join('\n');
      const prompt = `You are a Google Business Profile review analyst. Analyze these reviews and for EACH review return a JSON array with: { "index": number, "sentiment": "positive"|"negative"|"neutral", "confidence": 0-100, "key_topics": ["topic1","topic2"], "urgency": "low"|"medium"|"high" }. Reviews:\n${reviewTexts}\n\nReturn ONLY the JSON array, no other text.`;
      const result = await callAI(prompt, 2048);
      if (result.error) return res.status(500).json({ error: result.error });
      const parsed = cleanJSON(result.text);
      return res.status(200).json({ analysis: parsed || result.text, raw: result.text });
    }

    // 2. GENERATE REVIEW REPLY
    if (action === 'generate_reply') {
      const { review_content, review_rating, sentiment, business_name, tone } = payload;
      const toneStyle = tone || 'professional';
      const sentimentContext = sentiment === 'negative' ? 'The customer had a negative experience. Be empathetic, apologize sincerely, and offer a resolution.' : sentiment === 'positive' ? 'The customer had a great experience. Express gratitude and invite them back.' : 'The review is neutral. Acknowledge their feedback professionally.';
      const prompt = `You are replying to a Google Business Profile review for "${business_name || 'our business'}". ${sentimentContext} Use a ${toneStyle} tone. Keep it concise (2-4 sentences). Do NOT use placeholders like [Name]. Write the actual reply.\n\nReview: "${review_content}" (Rating: ${review_rating}/5)\n\nWrite the reply:`;
      const result = await callAI(prompt, 512);
      if (result.error) return res.status(500).json({ error: result.error });
      return res.status(200).json({ reply: result.text.trim() });
    }

    // 3. GENERATE POST CONTENT
    if (action === 'generate_post') {
      const { business_name, business_category, post_type, topic, keywords } = payload;
      const prompt = `Create a Google Business Profile ${post_type || 'update'} post for "${business_name || 'our business'}" (Category: ${business_category || 'General'}). Topic: ${topic || 'general business update'}. ${keywords ? `Include keywords: ${keywords}.` : ''} The post should be engaging, include a call-to-action, and be 150-300 words. Include 3-5 relevant hashtags. Post type: ${post_type || 'update'}.\n\nWrite the post:`;
      const result = await callAI(prompt, 1024);
      if (result.error) return res.status(500).json({ error: result.error });
      return res.status(200).json({ post: result.text.trim() });
    }

    // 4. PROFILE OPTIMIZATION SUGGESTIONS
    if (action === 'optimize_profile') {
      const { business_name, category, description, address, phone, hours, website, photos_count, posts_count } = payload;
      const prompt = `You are a Google Business Profile SEO expert. Analyze this business profile and provide optimization suggestions. Return a JSON array of suggestions, each with: { "category": "completeness"|"keywords"|"content"|"engagement"|"photos"|"posts", "suggestion": "specific actionable suggestion", "priority": "high"|"medium"|"low", "impact": "brief explanation of SEO impact" }.\n\nBusiness Profile:\n- Name: ${business_name || 'Not set'}\n- Category: ${category || 'Not set'}\n- Description: ${description || 'Not set'}\n- Address: ${address || 'Not set'}\n- Phone: ${phone || 'Not set'}\n- Hours: ${hours || 'Not set'}\n- Website: ${website || 'Not set'}\n- Photos: ${photos_count || 0}\n- Posts (last 30 days): ${posts_count || 0}\n\nReturn ONLY the JSON array:`;
      const result = await callAI(prompt, 2048);
      if (result.error) return res.status(500).json({ error: result.error });
      const parsed = cleanJSON(result.text);
      return res.status(200).json({ suggestions: parsed || result.text, raw: result.text });
    }

    // 5. SUGGEST TAGS/CATEGORIES
    if (action === 'suggest_tags') {
      const { business_name, description, current_category } = payload;
      const prompt = `Suggest Google Business Profile categories and service tags for this business. Return a JSON object with: { "primary_category": "best category", "additional_categories": ["cat1","cat2","cat3"], "service_tags": ["tag1","tag2",...up to 15 tags], "keywords": ["kw1","kw2",...up to 10 keywords for local SEO] }.\n\nBusiness: ${business_name || 'Unknown'}\nDescription: ${description || 'No description'}\nCurrent Category: ${current_category || 'None'}\n\nReturn ONLY the JSON:`;
      const result = await callAI(prompt, 1024);
      if (result.error) return res.status(500).json({ error: result.error });
      try {
        const match = result.text.match(/\{[\s\S]*?\}/);
        const parsed = match ? JSON.parse(match[0]) : null;
        return res.status(200).json(parsed || { raw: result.text });
      } catch { return res.status(200).json({ raw: result.text }); }
    }

    // 6. RANKING STRATEGY
    if (action === 'ranking_strategy') {
      const { business_name, category, city, current_rating, review_count, competitor_names } = payload;
      const prompt = `You are a local SEO expert specializing in Google Business Profile ranking. Create a detailed 30-day ranking strategy to get this business to #1 in Google Local Pack. Return a JSON array of weekly tasks: { "week": number, "tasks": [{ "task": "specific action", "details": "how to do it", "impact": "expected result" }] }.\n\nBusiness: ${business_name || 'Unknown'}\nCategory: ${category || 'Unknown'}\nCity: ${city || 'Unknown'}\nCurrent Rating: ${current_rating || 'N/A'}\nReview Count: ${review_count || 0}\nCompetitors: ${competitor_names || 'Unknown'}\n\nReturn ONLY the JSON array:`;
      const result = await callAI(prompt, 3000);
      if (result.error) return res.status(500).json({ error: result.error });
      const parsed = cleanJSON(result.text);
      return res.status(200).json({ strategy: parsed || result.text, raw: result.text });
    }

    return res.status(400).json({ error: 'Unknown action' });
  } catch (err) {
    console.error('AI API error:', err);
    res.status(500).json({ error: err.message });
  }
}
