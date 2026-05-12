CREATE INDEX IF NOT EXISTS submissions_created_at_desc_idx
ON public.submissions (created_at DESC);

CREATE INDEX IF NOT EXISTS submissions_shortlisted_created_at_desc_idx
ON public.submissions (shortlisted, created_at DESC);

CREATE INDEX IF NOT EXISTS final_submissions_created_at_desc_idx
ON public.final_submissions (created_at DESC);

CREATE INDEX IF NOT EXISTS final_submissions_is_winner_created_at_desc_idx
ON public.final_submissions (is_winner, created_at DESC);