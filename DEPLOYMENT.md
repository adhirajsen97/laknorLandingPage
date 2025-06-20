# CURALOG Landing Page - Production Deployment Guide

## 🚀 Production Checklist

### 1. Environment Variables Configuration

Create a `.env.local` file in your project root with the following variables:

```bash
# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=your_facebook_pixel_id

# Email Service Provider (choose one)
MAILCHIMP_API_KEY=your_mailchimp_api_key
MAILCHIMP_LIST_ID=your_mailchimp_list_id
MAILCHIMP_SERVER=us1

# OR ConvertKit
CONVERTKIT_API_KEY=your_convertkit_api_key
CONVERTKIT_FORM_ID=your_convertkit_form_id

# OR SendGrid
SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_FROM_EMAIL=hello@curalog.app

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://curalog.app
NEXT_PUBLIC_SUPPORT_EMAIL=support@curalog.app
```

### 2. Email Service Integration

The site is currently configured to work with multiple email service providers. Uncomment and configure one of the following in `pages/api/subscribe.js`:

#### Mailchimp Integration
1. Create a Mailchimp account and get your API key
2. Create a mailing list and note the List ID
3. Uncomment the Mailchimp function in the API file
4. Update the subscription handler to use `addToMailchimp`

#### ConvertKit Integration
1. Create a ConvertKit account and get your API key
2. Create a form and note the Form ID
3. Uncomment the ConvertKit function in the API file
4. Update the subscription handler to use `addToConvertKit`

### 3. Analytics Setup

#### Google Analytics
1. Create a Google Analytics 4 property
2. Get your Measurement ID (G-XXXXXXXXXX)
3. Add it to your environment variables as `NEXT_PUBLIC_GA_ID`

#### Facebook Pixel (Optional)
1. Create a Facebook Pixel
2. Add the Pixel ID to your environment variables

### 4. Social Media Accounts

Update the social media links in `components/Footer.jsx`:
- Create Twitter account: @curalog_health
- Create LinkedIn company page: /company/curalog
- Create GitHub organization: /curalog

### 5. Domain and SSL

1. Register your domain (curalog.app)
2. Configure DNS settings
3. Set up SSL certificate (automatic with most hosting providers)

### 6. Performance Optimizations

The site includes several performance optimizations:
- Font preloading
- DNS prefetching
- Image optimization with Next.js Image component
- Tailwind CSS purging
- Mobile-first responsive design

### 7. SEO Configuration

Update the following in `pages/index.jsx`:
- Meta descriptions
- Keywords
- Open Graph images
- Structured data

## 🏗️ Deployment Platforms

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

```bash
npm install -g vercel
vercel --prod
```

### Netlify
1. Connect your GitHub repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `out`
4. Add environment variables in Netlify dashboard

### AWS Amplify
1. Connect your GitHub repository
2. Build settings will be auto-detected
3. Add environment variables in Amplify console

### Self-Hosted
```bash
npm run build
npm start
```

## 📊 Analytics Events

The site tracks the following events:
- Email subscriptions
- Social media clicks
- Section scrolling
- Button interactions

## 🔒 Security Considerations

1. **Email Validation**: Server-side email validation implemented
2. **Rate Limiting**: Consider adding rate limiting to the subscription API
3. **CORS**: Configure CORS policies for production
4. **Headers**: Add security headers via Next.js config

## 🧪 Testing

### Pre-deployment Testing
```bash
# Run build to check for errors
npm run build

# Test email subscription locally
curl -X POST http://localhost:3000/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","marketingConsent":true}'

# Check responsive design
# Use browser dev tools to test mobile layouts

# Verify analytics
# Check Google Analytics Real-Time reports
```

### A/B Testing Setup

The Hero component includes A/B testing configuration. To implement:
1. Add A/B testing logic based on URL parameters or user segments
2. Track conversion rates for different variants
3. Use the variants array to test different headlines/subheadlines

## 📈 Monitoring

### Essential Monitoring
1. **Uptime Monitoring**: Use Pingdom, UptimeRobot, or similar
2. **Analytics**: Google Analytics for traffic and conversions
3. **Error Tracking**: Consider Sentry for error monitoring
4. **Performance**: Use Lighthouse CI for performance monitoring

### Key Metrics to Track
- Email subscription conversion rate
- Page load times
- Mobile vs desktop traffic
- Bounce rate
- Social media click-through rates

## 🚀 Post-Launch Checklist

- [ ] Test email subscription flow
- [ ] Verify all social media links work
- [ ] Check Google Analytics is tracking
- [ ] Test mobile responsiveness
- [ ] Verify footer animations work on desktop
- [ ] Test header navigation scroll detection
- [ ] Check all CTAs are working
- [ ] Verify SEO meta tags are correct
- [ ] Test GSAP animations in footer
- [ ] Confirm email service integration

## 🔄 Content Updates

### Adding New Features
The codebase is structured for easy updates:
- Features: Update `components/ScrollableFeatures.jsx`
- How It Works: Update `components/HowItWorks.jsx`
- Testimonials: Add new component and import in `pages/index.jsx`

### Typography System
Enhanced typography is consistently applied across components:
- Headlines: `font-extrabold tracking-tight`
- Subheads: `font-medium leading-relaxed`
- Body text: Responsive sizing with `text-xl md:text-2xl`

## 📧 Support

For deployment issues or questions:
- Email: support@curalog.app
- Create an issue in the GitHub repository

---

**Ready to launch CURALOG? 🎉**

This production-ready setup includes all necessary components for a successful health-tech landing page launch. 