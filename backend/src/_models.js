import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  googleId: { type: String, default: null },
  created_at: { type: Date, default: Date.now },
});

export const User = mongoose.models.User || mongoose.model('User', UserSchema);

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  environment: { type: String, default: 'Production' },
  branch: { type: String, default: 'main' },
  user_id: { type: String, required: true },
  status: { type: String, default: 'Active' },
  deploys: { type: Number, default: 0 },
  updated_at: { type: Date, default: Date.now },
  created_at: { type: Date, default: Date.now },
});

const UserSettingsSchema = new mongoose.Schema({
  user_id: { type: String, required: true, unique: true },
  theme: { type: String, default: 'dark' },
  notifications: { type: Boolean, default: true },
  email_notifications: { type: Boolean, default: true },
  updated_at: { type: Date, default: Date.now },
});

const TeamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, required: true },
  owner_id: { type: String, required: true },
  status: { type: String, default: 'Active' },
  created_at: { type: Date, default: Date.now },
});

const TestimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String },
  created_at: { type: Date, default: Date.now },
});

const ActivityLogSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  action: { type: String, required: true },
  resource: { type: String, required: true },
  details: { type: String },
  status: { type: String, default: 'info' },
  created_at: { type: Date, default: Date.now },
});

const NewsletterSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  created_at: { type: Date, default: Date.now },
});

const LeadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  company: { type: String },
  plan: { type: String },
  message: { type: String },
  created_at: { type: Date, default: Date.now },
});

const BlogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String },
  category: { type: String },
  published_at: { type: Date, default: Date.now },
});

const DomainSchema = new mongoose.Schema({
  domain: { type: String, required: true },
  user_id: { type: String, required: true },
  status: { type: String, default: 'Pending' },
  ssl_enabled: { type: Boolean, default: true },
  dns_verified: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
});

const GBPAccountSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  business_name: { type: String, required: true },
  business_address: { type: String },
  business_phone: { type: String },
  business_category: { type: String },
  business_description: { type: String },
  business_website: { type: String },
  business_tags: { type: [String], default: [] },
  status: { type: String, default: 'pending' },
  google_email: { type: String },
  google_connected: { type: Boolean, default: false },
  google_access_token: { type: String },
  google_refresh_token: { type: String },
  rating: { type: Number, default: 0 },
  review_count: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
});

const PricingPlanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String },
  interval: { type: String },
  features: { type: [String] },
  sort_order: { type: Number, default: 0 },
});

const FAQSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  category: { type: String },
  sort_order: { type: Number, default: 0 },
});

const FeatureSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  icon: { type: String },
  sort_order: { type: Number, default: 0 },
});

const IntegrationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  icon: { type: String },
  status: { type: String, default: 'Available' },
});

export const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);
export const UserSettings = mongoose.models.UserSettings || mongoose.model('UserSettings', UserSettingsSchema);
export const TeamMember = mongoose.models.TeamMember || mongoose.model('TeamMember', TeamMemberSchema);
export const Testimonial = mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema);
export const ActivityLog = mongoose.models.ActivityLog || mongoose.model('ActivityLog', ActivityLogSchema);
export const Newsletter = mongoose.models.Newsletter || mongoose.model('Newsletter', NewsletterSchema);
export const Lead = mongoose.models.Lead || mongoose.model('Lead', LeadSchema);
export const BlogPost = mongoose.models.BlogPost || mongoose.model('BlogPost', BlogPostSchema);
export const Domain = mongoose.models.Domain || mongoose.model('Domain', DomainSchema);
export const GBPAccount = mongoose.models.GBPAccount || mongoose.model('GBPAccount', GBPAccountSchema);
export const PricingPlan = mongoose.models.PricingPlan || mongoose.model('PricingPlan', PricingPlanSchema);
export const FAQ = mongoose.models.FAQ || mongoose.model('FAQ', FAQSchema);
export const Feature = mongoose.models.Feature || mongoose.model('Feature', FeatureSchema);
export const Integration = mongoose.models.Integration || mongoose.model('Integration', IntegrationSchema);
