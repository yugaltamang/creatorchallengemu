DROP INDEX IF EXISTS public.submissions_email_unique_idx;
DROP INDEX IF EXISTS public.submissions_instagram_handle_unique_idx;

CREATE UNIQUE INDEX IF NOT EXISTS submissions_email_brand_unique_idx
  ON public.submissions (lower(email), brand_choice);

CREATE UNIQUE INDEX IF NOT EXISTS submissions_handle_brand_unique_idx
  ON public.submissions (lower(instagram_handle), brand_choice);