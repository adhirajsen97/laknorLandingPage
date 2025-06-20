# Vercel Deployment Guide for CURALOG

## 🚀 Quick Setup

### 1. Supabase Database Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Go to your project's SQL Editor
3. Run the SQL commands from `database/schema.sql` to create your tables
4. Get your project credentials from Settings > API

### 2. Environment Variables

Set these environment variables in Vercel:

#### Required - Supabase
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

#### Optional - Analytics
```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=your_facebook_pixel_id
```

#### Optional - Site Configuration
```
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
NEXT_PUBLIC_SUPPORT_EMAIL=support@curalog.app
```

### 3. Deploy to Vercel

#### Option A: GitHub Integration (Recommended)
1. Push your code to GitHub
2. Connect your GitHub repo to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on each push

#### Option B: Vercel CLI
```bash
npm install -g vercel
vercel login
vercel --prod
```

## 📋 Pre-Deployment Checklist

- [ ] Supabase project created and tables set up
- [ ] Environment variables configured in Vercel
- [ ] Google Analytics property created (if using)
- [ ] Domain configured (if using custom domain)
- [ ] Social media accounts created and links updated

## 🔧 Environment Variables Setup in Vercel

1. Go to your Vercel project dashboard
2. Click "Settings" → "Environment Variables"
3. Add each variable with these scopes:
   - `NEXT_PUBLIC_*`: Production, Preview, Development
   - `SUPABASE_SERVICE_ROLE_KEY`: Production, Preview, Development

## 🗄️ Supabase Configuration

### Database Tables Created:
- `email_subscriptions` - Main waitlist subscribers
- `market_research_participants` - Market research participants

### Security Features:
- Row Level Security (RLS) enabled
- Service role policies configured
- Automatic timestamp updates
- Email uniqueness constraints

## 📊 Monitoring Your Deployment

### Check These URLs After Deployment:
- Main site: `https://your-domain.vercel.app`
- API health: `https://your-domain.vercel.app/api/subscribe` (should return 405 for GET)
- Analytics: Check Google Analytics Real-Time reports

### Email Collection Testing:
```bash
# Test main subscription
curl -X POST https://your-domain.vercel.app/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","marketingConsent":true,"subscriptionType":"notification"}'

# Test market research subscription
curl -X POST https://your-domain.vercel.app/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"research@example.com","marketingConsent":true,"subscriptionType":"research"}'
```

## 🎯 Features Enabled

✅ **Email Collection**: Both waitlist and market research signups
✅ **Database Storage**: Separate tables for different subscription types
✅ **Analytics**: Google Analytics 4 integration
✅ **Security**: HTTPS, security headers, input validation
✅ **Performance**: Optimized images, fonts, and assets
✅ **SEO**: Meta tags, structured data, sitemap

## 🔍 Troubleshooting

### Common Issues:

1. **API Routes 404 Error**
   - Check that `output: 'export'` is removed from `next.config.js`
   - Verify API files are in `pages/api/` directory

2. **Supabase Connection Error**
   - Verify environment variables are set correctly
   - Check Supabase URL format (should include https://)
   - Ensure service role key has correct permissions

3. **Database Errors**
   - Run the SQL schema in Supabase SQL Editor
   - Check RLS policies are correctly configured
   - Verify table names match the code

4. **Analytics Not Working**
   - Check Google Analytics Measurement ID format
   - Verify Script components are loading
   - Check browser network tab for GA requests

## 📈 Scaling Considerations

As your traffic grows:
- Monitor Supabase usage and upgrade plan if needed
- Set up database indexes for better performance (already included in schema)
- Consider adding rate limiting to the subscription API
- Set up monitoring with Sentry or similar service

## 🔐 Security Best Practices

The deployment includes:
- Environment variable protection
- SQL injection prevention (parameterized queries)
- XSS protection headers
- HTTPS enforcement
- Input validation and sanitization

## 📧 Email Service Integration

To connect to email marketing platforms:
1. Uncomment the relevant integration in `pages/api/subscribe.js`
2. Add the required environment variables
3. Test the integration with your email service

Supported integrations:
- Mailchimp
- ConvertKit  
- SendGrid
- Custom webhook integrations

---

**Your CURALOG landing page is now production-ready! 🎉**

Monitor your Supabase dashboard to see email subscriptions coming in, and check your analytics for traffic insights. 