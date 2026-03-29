-- Enable UUID extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create user_progress table for quiz attempts and bookmarks
CREATE TABLE user_progress (
  user_id TEXT NOT NULL,
  question_id INTEGER NOT NULL,
  attempts JSONB NOT NULL DEFAULT '[]'::jsonb,
  bookmarked BOOLEAN NOT NULL DEFAULT false,
  srs_data JSONB,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, question_id)
);

-- Create index for faster queries by user
CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);

-- Create index for faster queries by question
CREATE INDEX idx_user_progress_question_id ON user_progress(question_id);

-- Create index for SRS review queue
CREATE INDEX idx_user_progress_srs_review ON user_progress(user_id, (srs_data->>'nextReview'))
  WHERE srs_data IS NOT NULL;

-- Enable Row Level Security (RLS)
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- Create RLS policy: Users can only access their own data
CREATE POLICY user_access_own_progress ON user_progress FOR ALL
  USING (auth.jwt() ->> 'sub' = user_id)
  WITH CHECK (auth.jwt() ->> 'sub' = user_id);

COMMENT ON TABLE user_progress IS 'Stores user quiz attempts, bookmarks, and SRS data for JavaScript questions';