-- Create avatars table to store user-generated avatars
CREATE TABLE IF NOT EXISTS avatars (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  avatar_type VARCHAR(50) NOT NULL, -- 'photo_upload', 'text_description'
  source_data JSONB, -- Store original photo URL or text description
  avatar_url TEXT NOT NULL, -- Generated avatar image URL
  style VARCHAR(100) DEFAULT 'realistic', -- 'realistic', 'cartoon', 'professional', etc.
  gender VARCHAR(20),
  age_range VARCHAR(20),
  is_public BOOLEAN DEFAULT false,
  generation_status VARCHAR(50) DEFAULT 'processing', -- 'processing', 'completed', 'failed'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for efficient queries
CREATE INDEX IF NOT EXISTS idx_avatars_user_id ON avatars(user_id);
CREATE INDEX IF NOT EXISTS idx_avatars_public ON avatars(is_public) WHERE is_public = true;
CREATE INDEX IF NOT EXISTS idx_avatars_status ON avatars(generation_status);
