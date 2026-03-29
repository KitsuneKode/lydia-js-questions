-- Dedicated table for SRS tracking (denormalized for performance)
CREATE TABLE user_srs_progress (
  user_id TEXT NOT NULL,
  question_id INTEGER NOT NULL,
  interval INTEGER NOT NULL DEFAULT 0,
  repetitions INTEGER NOT NULL DEFAULT 0,
  ease_factor REAL NOT NULL DEFAULT 2.5,
  next_review TIMESTAMPTZ,
  last_reviewed TIMESTAMPTZ,
  PRIMARY KEY (user_id, question_id)
);

-- Create index for SRS review queue
CREATE INDEX idx_user_srs_next_review ON user_srs_progress(user_id, next_review)
  WHERE next_review IS NOT NULL;

-- Enable Row Level Security (RLS)
ALTER TABLE user_srs_progress ENABLE ROW LEVEL SECURITY;

-- Create RLS policy: Users can only access their own SRS data
CREATE POLICY user_access_own_srs ON user_srs_progress FOR ALL
  USING (auth.jwt() ->> 'sub' = user_id)
  WITH CHECK (auth.jwt() ->> 'sub' = user_id);

COMMENT ON TABLE user_srs_progress IS 'Dedicated SRS tracking table for optimized review queue queries';