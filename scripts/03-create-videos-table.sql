-- Create videos table for AI-generated videos using avatars
CREATE TABLE IF NOT EXISTS videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  avatar_id UUID NOT NULL REFERENCES avatars(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  script TEXT NOT NULL,
  video_url TEXT,
  thumbnail_url TEXT,
  duration_seconds INTEGER,
  video_quality VARCHAR(20) DEFAULT 'HD', -- 'SD', 'HD', '4K'
  voice_settings JSONB, -- Voice type, speed, pitch, etc.
  generation_status VARCHAR(50) DEFAULT 'queued', -- 'queued', 'processing', 'completed', 'failed'
  is_public BOOLEAN DEFAULT false,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for efficient queries
CREATE INDEX IF NOT EXISTS idx_videos_user_id ON videos(user_id);
CREATE INDEX IF NOT EXISTS idx_videos_avatar_id ON videos(avatar_id);
CREATE INDEX IF NOT EXISTS idx_videos_public ON videos(is_public) WHERE is_public = true;
CREATE INDEX IF NOT EXISTS idx_videos_status ON videos(generation_status);
