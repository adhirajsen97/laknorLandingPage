# LAKNOR Landing Page

A modern, responsive landing page for LAKNOR - a lightweight health-record management platform designed for middle-aged and older users. Built with Next.js, React, and Tailwind CSS, featuring scroll-triggered animations and comprehensive accessibility features.

## ✨ Features

- **Modern Tech Stack**: Next.js 14, React 18, Tailwind CSS
- **Scroll-Triggered Animations**: Interactive caduceus animation with anime.js
- **A/B Testing Ready**: Easy headline/subheadline variant swapping
- **Fully Responsive**: Mobile-first design approach
- **Accessibility First**: WCAG 2.1 AA compliant, keyboard navigation, screen reader support
- **Performance Optimized**: Static export ready, optimized for Core Web Vitals
- **Email Capture**: Integrated waitlist signup with validation
- **SEO Optimized**: Open Graph tags, structured data, sitemap ready

## 🚀 Quick Start

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn package manager

### Installation

1. **Clone and install dependencies:**
   ```bash
   git clone <repository-url>
   cd mvp
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build and Deploy

```bash
# Build for production
npm run build

# Start production server
npm run start

# Export static files (for static hosting)
npm run export
```

## 📁 Project Structure

```
mvp/
├── components/           # React components
│   ├── Header.jsx       # Sticky navigation
│   ├── Hero.jsx         # Hero section with A/B testing
│   ├── ScrollableFeatures.jsx  # Animated features section
│   ├── Principles.jsx   # Core principles grid
│   ├── HowItWorks.jsx   # 3-step process
│   ├── SignupModal.jsx  # Email capture modal
│   └── Footer.jsx       # Footer with links
├── pages/
│   ├── index.jsx        # Main landing page
│   ├── _app.js          # App wrapper with analytics
│   ├── _document.js     # HTML document structure
│   └── api/
│       └── subscribe.js # Email subscription API
├── public/
│   ├── logo.png         # Brand logo (placeholder)
│   ├── favicon.ico      # Site favicon
│   ├── og-image.png     # Social sharing image
│   └── svg/
│       └── caduceus.svg # Medical symbol for animations
├── styles/
│   └── globals.css      # Global styles and Tailwind
├── next.config.js       # Next.js configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── package.json         # Dependencies and scripts
```

## 🎨 Customization Guide

### Replace Placeholder Assets

1. **Logo**: Replace `/public/logo.png` with your actual logo (200x60px recommended)
2. **Favicon**: Generate and replace favicon files in `/public/`
3. **OG Image**: Replace `/public/og-image.png` (1200x630px)
4. **Caduceus SVG**: Customize `/public/svg/caduceus.svg` for your brand

### A/B Testing Headlines

Edit the variants in `/components/Hero.jsx`:

```javascript
const VARIANTS = {
  headlines: [
    "Your Custom Headline Here",
    "Alternative Headline",
    "Third Variant"
  ],
  subheadlines: [
    "Your custom subheadline...",
    "Alternative subheadline...",
    "Third variant subheadline..."
  ]
}
```

To implement A/B testing:
- Use URL parameters: `?variant=1`
- Hash user ID for consistent experience
- Integrate with analytics tools

### Email Service Integration

Replace the stub in `/pages/api/subscribe.js`:

```javascript
// Examples for popular services:

// Mailchimp
const response = await fetch(`https://us1.api.mailchimp.com/3.0/lists/${listId}/members`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.MAILCHIMP_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email_address: email,
    status: 'subscribed'
  })
})

// ConvertKit
const response = await fetch('https://api.convertkit.com/v3/forms/your-form-id/subscribe', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    api_key: process.env.CONVERTKIT_API_KEY,
    email: email
  })
})
```

### Analytics Integration

Uncomment and configure in `/pages/_app.js`:

```javascript
// Google Analytics 4
<script
  async
  src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
/>
```

Add event tracking throughout components:
```javascript
// Track waitlist signups
gtag('event', 'waitlist_signup', {
  event_category: 'conversion',
  event_label: 'hero_form'
})
```

### Animation Customization

Modify scroll triggers in `/components/ScrollableFeatures.jsx`:

```javascript
// Adjust trigger points
const features = [
  {
    triggerStart: 0.2,  // Start at 20% scroll
    triggerEnd: 0.35,   // End at 35% scroll
    // ...
  }
]

// Modify animation duration
anime({
  targets: segment,
  duration: 2000,     // 2 seconds
  easing: 'easeInOutQuad'
})
```

### Color Scheme

Update brand colors in `/tailwind.config.js`:

```javascript
colors: {
  primary: {
    50: '#your-light-color',
    500: '#your-main-color',
    900: '#your-dark-color',
  },
  accent: {
    500: '#your-accent-color',
  }
}
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect repository:**
   ```bash
   npm i -g vercel
   vercel
   ```

2. **Environment variables:**
   - `NEXT_PUBLIC_GA_ID` - Google Analytics ID
   - `MAILCHIMP_API_KEY` - For email integration
   - `NODE_ENV=production`

3. **Custom domain:** Configure in Vercel dashboard

### Netlify

1. **Build settings:**
   - Build command: `npm run build && npm run export`
   - Publish directory: `out`

2. **Form handling:**
   Use Netlify Forms by adding to signup forms:
   ```html
   <form name="waitlist" method="POST" data-netlify="true">
     <input type="hidden" name="form-name" value="waitlist" />
     <!-- form fields -->
   </form>
   ```

### Static Hosting (GitHub Pages, S3, etc.)

```bash
npm run export
# Upload the 'out' directory to your static host
```

## 🔧 Development

### Environment Variables

Create `.env.local`:

```bash
# Analytics
NEXT_PUBLIC_GA_ID=your-google-analytics-id

# Email Service (choose one)
MAILCHIMP_API_KEY=your-mailchimp-key
CONVERTKIT_API_KEY=your-convertkit-key

# Database (optional)
DATABASE_URL=your-database-url
```

### Code Quality

```bash
# Linting
npm run lint

# Type checking (if using TypeScript)
npm run type-check

# Format code
npx prettier --write .
```

### Performance Testing

```bash
# Lighthouse CI
npm install -g @lhci/cli
lhci autorun
```

## ♿ Accessibility

The landing page includes comprehensive accessibility features:

- **Keyboard Navigation**: Full tab order and focus management
- **Screen Readers**: ARIA labels and semantic HTML
- **Reduced Motion**: Respects `prefers-reduced-motion`
- **Color Contrast**: WCAG AA compliant color combinations
- **Focus Management**: Proper focus trapping in modals

Test with:
- Screen readers (NVDA, VoiceOver, JAWS)
- Keyboard-only navigation
- axe-core browser extension

## 📊 Analytics Events

Track these key events:

- `waitlist_signup` - Email capture success
- `cta_click` - CTA button interactions  
- `modal_open` - Signup modal opened
- `scroll_milestone` - Feature section milestones

## 🔒 Privacy & Security

- **Data Collection**: Only email addresses with explicit consent
- **Form Validation**: Client and server-side validation
- **Rate Limiting**: Consider implementing for API routes
- **Privacy Policy**: Update links in footer to actual policy

## 🐛 Troubleshooting

### Common Issues

**Animations not working:**
- Check if `prefers-reduced-motion` is enabled
- Verify anime.js is properly imported
- Ensure SVG paths have correct IDs

**Email signup failing:**
- Check API route is configured correctly
- Verify environment variables are set
- Test with network devtools

**Build errors:**
- Clear Next.js cache: `rm -rf .next`
- Update dependencies: `npm update`
- Check for TypeScript errors if applicable

### Performance Optimization

- **Image Optimization**: Use Next.js Image component for images
- **Font Loading**: Optimize Google Fonts loading
- **Bundle Analysis**: Use `@next/bundle-analyzer`
- **Lazy Loading**: Implement for below-fold components

## 📞 Support

For technical questions or issues:

- **Documentation**: Check Next.js and Tailwind CSS docs
- **Community**: Next.js GitHub Discussions
- **Issues**: Create an issue in this repository

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Ready to launch LAKNOR? 🚀**

1. Replace all placeholder content
2. Configure your email service
3. Add analytics tracking
4. Deploy to your preferred platform
5. Monitor performance and conversions

*Built with ❤️ for better health record management* 