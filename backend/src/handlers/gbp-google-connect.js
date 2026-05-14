// import supabase from '../_supabase.js';

const GOOGLE_CLIENT_ID = process.env.VITE_GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'Unauthorized' });
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) return res.status(401).json({ error: 'Invalid token' });

    const { code, redirect_uri } = req.body;
    if (!code) return res.status(400).json({ error: 'Authorization code is required' });

    // Step 1: Exchange code for Google tokens
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET || '',
        redirect_uri,
        grant_type: 'authorization_code',
      }).toString()
    });

    const tokenData = await tokenRes.json();
    if (tokenData.error) {
      console.error('Token exchange error:', tokenData.error);
      return res.status(400).json({ error: `Google auth failed: ${tokenData.error_description || tokenData.error}` });
    }

    const googleAccessToken = tokenData.access_token;
    const googleRefreshToken = tokenData.refresh_token;

    // Step 2: Get user's Google profile info
    const profileRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${googleAccessToken}` }
    });
    const profileData = await profileRes.json();
    const googleEmail = profileData.email;
    const googleName = profileData.name;

    if (!googleEmail) {
      return res.status(400).json({ error: 'Could not retrieve Google email' });
    }

    // Check if email matches
    const emailMatches = user.email?.toLowerCase() === googleEmail.toLowerCase();

    // Step 3: Try to fetch Google Business Profile data
    let businesses = [];
    let gbpApiAvailable = false;

    try {
      // List GBP accounts
      const accountsRes = await fetch(
        'https://mybusinessaccountmanagement.googleapis.com/v1/accounts',
        { headers: { Authorization: `Bearer ${googleAccessToken}` } }
      );
      const accountsData = await accountsRes.json();

      if (accountsData.accounts && accountsData.accounts.length > 0) {
        gbpApiAvailable = true;

        for (const account of accountsData.accounts) {
          try {
            // List locations for this account
            const locRes = await fetch(
              `https://mybusinessbusinessinformation.googleapis.com/v1/${account.name}/locations?readMask=title,name,phoneNumbers,websiteUri,categories,storefrontAddress,metadata`,
              { headers: { Authorization: `Bearer ${googleAccessToken}` } }
            );
            const locData = await locRes.json();

            if (locData.locations) {
              for (const loc of locData.locations) {
                businesses.push({
                  account_name: account.name,
                  location_name: loc.name,
                  business_name: loc.title || '',
                  business_phone: loc.phoneNumbers?.primaryPhone || '',
                  business_website: loc.websiteUri || '',
                  business_category: loc.categories?.primaryCategory?.displayName || '',
                  business_address: loc.storefrontAddress
                    ? [loc.storefrontAddress.locality, loc.storefrontAddress.administrativeArea, loc.storefrontAddress.postalCode].filter(Boolean).join(', ')
                    : '',
                  business_description: loc.metadata?.description || '',
                  is_verified: loc.metadata?.isVerified || false,
                });
              }
            }
          } catch (locErr) {
            console.error('Location fetch error:', locErr.message);
          }
        }
      }
    } catch (gbpErr) {
      console.log('GBP API not available or no profiles:', gbpErr.message);
    }

    // Step 4: Auto-create GBP accounts for found businesses
    const createdAccounts = [];
    for (const biz of businesses) {
      // Check if already connected
      const { data: existing } = await supabase
        .from('gbp_accounts')
        .select('id')
        .eq('user_id', user.id)
        .eq('business_name', biz.business_name)
        .maybeSingle();

      if (!existing) {
        const { data, error } = await supabase
          .from('gbp_accounts')
          .insert({
            user_id: user.id,
            business_name: biz.business_name,
            business_address: biz.business_address,
            business_phone: biz.business_phone,
            business_category: biz.business_category,
            business_description: biz.business_description,
            business_website: biz.business_website,
            business_tags: [],
            status: biz.is_verified ? 'connected' : 'pending',
            google_email: googleEmail,
            google_connected: true,
            google_access_token: googleAccessToken,
            google_refresh_token: googleRefreshToken || null,
            rating: 0,
            review_count: 0,
          })
          .select()
          .single();

        if (!error && data) createdAccounts.push(data);
      }
    }

    // Step 5: Log activity
    if (createdAccounts.length > 0) {
      for (const acc of createdAccounts) {
        await supabase.from('activity_logs').insert({
          user_id: user.id,
          action: 'Connected GBP via Google',
          resource: acc.business_name,
          details: `Email: ${googleEmail}`,
          status: 'success',
        });
      }
    }

    return res.status(200).json({
      google_email: googleEmail,
      google_name: googleName,
      email_matches: emailMatches,
      gbp_api_available: gbpApiAvailable,
      businesses_found: businesses,
      accounts_created: createdAccounts,
      access_token: googleAccessToken,
      refresh_token: googleRefreshToken || null,
    });

  } catch (err) {
    console.error('GBP Google connect error:', err);
    res.status(500).json({ error: err.message });
  }
}
