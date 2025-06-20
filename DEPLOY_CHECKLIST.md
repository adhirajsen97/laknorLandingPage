# 🚀 CURALOG Vercel Deployment Checklist

## Prerequisites
- [ ] GitHub account with this repository
- [ ] Vercel account (free tier is fine)
- [ ] Supabase account for database

## Step 1: Supabase Setup (5 minutes)
1. [ ] Create a new project at [supabase.com](https://supabase.com)
2. [ ] Go to SQL Editor in your Supabase dashboard
3. [ ] Run the SQL from `database/schema.sql`
4. [ ] Go to Settings → API
5. [ ] Copy your `Project URL` and `Service Role Key`

## Step 2: Deploy to Vercel (3 minutes)
1. [ ] Go to [vercel.com](https://vercel.com)
2. [ ] Click "Import Project"
3. [ ] Import your GitHub repository
4. [ ] Configure project:
   - Framework Preset: `Next.js` (auto-detected)
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (default)

## Step 3: Environment Variables (2 minutes)
Add these in Vercel Dashboard → Settings → Environment Variables:

**Required:**
- [ ] `NEXT_PUBLIC_SUPABASE_URL` = Your Supabase Project URL
- [ ] `SUPABASE_SERVICE_ROLE_KEY` = Your Supabase Service Role Key

**Recommended:**
- [ ] `NEXT_PUBLIC_SITE_URL` = https://curalog.app (or your domain)
- [ ] `NEXT_PUBLIC_SUPPORT_EMAIL` = support@curalog.app

**Optional (Analytics):**
- [ ] `NEXT_PUBLIC_GA_ID` = Your Google Analytics ID

## Step 4: Deploy! 🎉
1. [ ] Click "Deploy" in Vercel
2. [ ] Wait ~2 minutes for build to complete
3. [ ] Visit your live site at `your-project.vercel.app`

## Step 5: Test Your Deployment
1. [ ] Open your deployed site
2. [ ] Try subscribing with a test email
3. [ ] Check Supabase dashboard for the new entry
4. [ ] Test mobile responsiveness

## Step 6: Custom Domain (Optional)
1. [ ] Go to Vercel Dashboard → Settings → Domains
2. [ ] Add your domain (e.g., curalog.app)
3. [ ] Follow DNS configuration instructions

## Quick Test Commands
Test your API after deployment:
```bash
# Test email subscription
curl -X POST https://your-domain.vercel.app/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","marketingConsent":true,"subscriptionType":"notification"}'
```

## 🎯 That's it! Your site is live!

### Need help?
- Check `VERCEL_DEPLOYMENT.md` for detailed guide
- Check `DEPLOYMENT.md` for production tips
- Create an issue on GitHub if stuck 