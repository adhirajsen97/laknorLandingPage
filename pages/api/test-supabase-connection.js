import { supabase } from '../../utils/supabase'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const results = {}

    // Test 1: Check if we can connect to Supabase
    results.connection = 'testing...'
    
    // Test 2: Check email_subscriptions table
    try {
      const { data: emailData, error: emailError } = await supabase
        .from('email_subscriptions')
        .select('count')
        .limit(1)
      
      results.email_subscriptions_table = emailError ? 
        { error: emailError.message, code: emailError.code } : 
        { status: 'accessible', count_query: 'success' }
    } catch (error) {
      results.email_subscriptions_table = { error: error.message, type: 'catch_error' }
    }

    // Test 3: Check market_research_participants table
    try {
      const { data: researchData, error: researchError } = await supabase
        .from('market_research_participants')
        .select('count')
        .limit(1)
      
      results.market_research_table = researchError ? 
        { error: researchError.message, code: researchError.code } : 
        { status: 'accessible', count_query: 'success' }
    } catch (error) {
      results.market_research_table = { error: error.message, type: 'catch_error' }
    }

    // Test 4: Try to insert a test record (and immediately delete it)
    try {
      const testEmail = `test-${Date.now()}@example.com`
      
      // Test insertion
      const { data: insertData, error: insertError } = await supabase
        .from('market_research_participants')
        .insert([{ email: testEmail, source: 'api_test' }])
        .select()
      
      if (insertError) {
        results.insert_test = { error: insertError.message, code: insertError.code }
      } else {
        results.insert_test = { status: 'success', inserted_id: insertData[0]?.id }
        
        // Clean up - delete the test record
        await supabase
          .from('market_research_participants')
          .delete()
          .eq('email', testEmail)
      }
    } catch (error) {
      results.insert_test = { error: error.message, type: 'catch_error' }
    }

    results.connection = 'success'
    results.timestamp = new Date().toISOString()

    return res.status(200).json(results)

  } catch (error) {
    console.error('Supabase connection test error:', error)
    return res.status(500).json({ 
      error: error.message,
      type: 'general_error',
      timestamp: new Date().toISOString()
    })
  }
} 