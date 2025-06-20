import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  },
  global: {
    headers: {
      Authorization: `Bearer ${supabaseServiceKey}`
    }
  }
})

export const emailService = {
  async addEmailSubscription(email, options = {}) {
    const { data, error } = await supabase
      .from('email_subscriptions')
      .insert([
        {
          email,
          marketing_consent: options.marketingConsent || false,
          source: options.source || 'landing_page',
          ip_address: options.ipAddress || null,
          user_agent: options.userAgent || null,
          utm_source: options.utmSource || null,
          utm_medium: options.utmMedium || null,
          utm_campaign: options.utmCampaign || null,
          notes: options.notes || null
        }
      ])
      .select()

    if (error) {
      if (error.code === '23505') {
        throw new Error('EMAIL_ALREADY_EXISTS')
      }
      throw error
    }

    return data[0]
  },

  async addMarketResearchParticipant(email, options = {}) {
    const { data, error } = await supabase
      .from('market_research_participants')
      .insert([
        {
          email,
          source: options.source || 'email_modal',
          ip_address: options.ipAddress || null,
          user_agent: options.userAgent || null,
          notes: options.notes || null
        }
      ])
      .select()

    if (error) {
      if (error.code === '23505') {
        throw new Error('EMAIL_ALREADY_EXISTS')
      }
      throw error
    }

    return data[0]
  }
} 