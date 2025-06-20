import { emailService } from '../../utils/supabase'

// Email subscription API endpoint
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { email, marketingConsent = false, subscriptionType = 'notification' } = req.body

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ 
      message: 'Valid email address is required',
      error: 'INVALID_EMAIL'
    })
  }

  try {
    // Get client IP and user agent for tracking
    const clientIP = req.headers['x-forwarded-for'] || 
                     req.headers['x-real-ip'] || 
                     req.connection.remoteAddress || 
                     req.socket.remoteAddress || 
                     null

    const userAgent = req.headers['user-agent'] || null

    // Extract UTM parameters if present
    const { utm_source, utm_medium, utm_campaign } = req.query

    const options = {
      marketingConsent,
      ipAddress: clientIP,
      userAgent,
      utmSource: utm_source,
      utmMedium: utm_medium,
      utmCampaign: utm_campaign,
      source: subscriptionType === 'research' ? 'email_modal' : 'landing_page'
    }

    let result

    // Store in appropriate table based on subscription type
    if (subscriptionType === 'research') {
      result = await emailService.addMarketResearchParticipant(email, options)
    } else {
      result = await emailService.addEmailSubscription(email, options)
    }

    // Log for monitoring (optional)
    console.log('New email subscription:', {
      email,
      subscriptionType,
      marketingConsent,
      timestamp: new Date().toISOString(),
      id: result.id
    })

    return res.status(200).json({ 
      message: 'Successfully subscribed!',
      success: true,
      subscriptionType,
      id: result.id
    })

  } catch (error) {
    console.error('Subscription error:', error)

    // Handle duplicate email specifically
    if (error.message === 'EMAIL_ALREADY_EXISTS') {
      return res.status(409).json({ 
        message: 'This email is already subscribed.',
        error: 'EMAIL_ALREADY_EXISTS'
      })
    }

    return res.status(500).json({ 
      message: 'Internal server error. Please try again.',
      error: 'SUBSCRIPTION_FAILED'
    })
  }
}

// Example integration functions (uncomment and configure for production)

/*
// Mailchimp integration example
async function addToMailchimp(email, options = {}) {
  const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY
  const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID
  const MAILCHIMP_SERVER = process.env.MAILCHIMP_SERVER
  
  const response = await fetch(
    `https://${MAILCHIMP_SERVER}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(`any:${MAILCHIMP_API_KEY}`).toString('base64')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email_address: email,
        status: 'subscribed',
        tags: ['landing-page', 'early-access'],
        merge_fields: {
          SOURCE: 'landing_page',
          MARKETING: options.marketingConsent ? 'yes' : 'no'
        }
      })
    }
  )
  
  return response.json()
}

// ConvertKit integration example
async function addToConvertKit(email, options = {}) {
  const CONVERTKIT_API_KEY = process.env.CONVERTKIT_API_KEY
  const CONVERTKIT_FORM_ID = process.env.CONVERTKIT_FORM_ID
  
  const response = await fetch(
    `https://api.convertkit.com/v3/forms/${CONVERTKIT_FORM_ID}/subscribe`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: CONVERTKIT_API_KEY,
        email: email,
        tags: ['landing-page', 'early-access'],
        fields: {
          marketing_consent: options.marketingConsent,
          source: 'landing_page'
        }
      })
    }
  )
  
  return response.json()
}
*/ 