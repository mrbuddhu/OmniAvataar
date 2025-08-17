-- Create subscriptions table for payment and billing management
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  plan_name VARCHAR(100) NOT NULL, -- 'free', 'creator', 'pro', 'business'
  plan_price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  billing_cycle VARCHAR(20) DEFAULT 'monthly', -- 'monthly', 'yearly'
  status VARCHAR(50) DEFAULT 'active', -- 'active', 'cancelled', 'past_due', 'paused'
  current_period_start TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  current_period_end TIMESTAMP WITH TIME ZONE,
  cancel_at_period_end BOOLEAN DEFAULT false,
  payment_provider VARCHAR(50), -- 'dodopayments', 'stripe', etc.
  external_subscription_id VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for subscription management
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_subscriptions_external_id ON subscriptions(external_subscription_id);
