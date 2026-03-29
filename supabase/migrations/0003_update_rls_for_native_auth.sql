-- Migration: update RLS policies to use auth.uid() canonical form
-- Required for Supabase native Clerk third-party auth integration.
-- With native auth, auth.uid() maps to the Clerk user ID (sub claim)
-- and avoids a JSON parse on every policy check vs auth.jwt() ->> 'sub'.

-- user_progress
DROP POLICY IF EXISTS user_access_own_progress ON user_progress;

CREATE POLICY user_access_own_progress ON user_progress FOR ALL
  USING ((auth.uid())::text = user_id)
  WITH CHECK ((auth.uid())::text = user_id);

-- user_srs_progress
DROP POLICY IF EXISTS user_access_own_srs ON user_srs_progress;

CREATE POLICY user_access_own_srs ON user_srs_progress FOR ALL
  USING ((auth.uid())::text = user_id)
  WITH CHECK ((auth.uid())::text = user_id);
