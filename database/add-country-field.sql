-- Add country field to email_subscriptions table
ALTER TABLE email_subscriptions 
ADD COLUMN country TEXT;

-- Add country field to market_research_participants table  
ALTER TABLE market_research_participants 
ADD COLUMN country TEXT;

-- Add index on country for better query performance (optional but recommended)
CREATE INDEX idx_email_subscriptions_country ON email_subscriptions(country);
CREATE INDEX idx_market_research_participants_country ON market_research_participants(country);

-- Add comments to document the new columns
COMMENT ON COLUMN email_subscriptions.country IS 'Country detected from user IP address during signup';
COMMENT ON COLUMN market_research_participants.country IS 'Country detected from user IP address during signup';

-- Optional: View to see country distribution
CREATE OR REPLACE VIEW country_subscription_stats AS
SELECT 
  country,
  COUNT(*) as subscription_count,
  COUNT(*) * 100.0 / SUM(COUNT(*)) OVER() as percentage
FROM email_subscriptions 
WHERE country IS NOT NULL
GROUP BY country
ORDER BY subscription_count DESC; 