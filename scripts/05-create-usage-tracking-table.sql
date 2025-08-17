-- Create usage tracking table for monitoring API usage and billing
CREATE TABLE IF NOT EXISTS usage_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  action_type VARCHAR(100) NOT NULL, -- 'avatar_generation', 'video_generation', 'api_call'
  resource_id UUID, -- ID of avatar or video generated
  credits_used INTEGER DEFAULT 1,
  metadata JSONB, -- Additional tracking data
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for usage analytics
CREATE INDEX IF NOT EXISTS idx_usage_user_id ON usage_tracking(user_id);
CREATE INDEX IF NOT EXISTS idx_usage_action_type ON usage_tracking(action_type);
CREATE INDEX IF NOT EXISTS idx_usage_created_at ON usage_tracking(created_at);
