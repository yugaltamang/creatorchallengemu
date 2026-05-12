-- Normalize existing data and prevent duplicate entries by email or instagram handle
UPDATE public.submissions SET email = lower(trim(email));
UPDATE public.submissions SET instagram_handle = lower(regexp_replace(trim(instagram_handle), '^@', ''));

-- Deduplicate any existing rows (keep the earliest) before adding unique indexes
DELETE FROM public.submissions a
USING public.submissions b
WHERE a.ctid > b.ctid AND lower(a.email) = lower(b.email);

DELETE FROM public.submissions a
USING public.submissions b
WHERE a.ctid > b.ctid AND lower(a.instagram_handle) = lower(b.instagram_handle);

CREATE UNIQUE INDEX IF NOT EXISTS submissions_email_unique_idx
  ON public.submissions (lower(email));

CREATE UNIQUE INDEX IF NOT EXISTS submissions_instagram_handle_unique_idx
  ON public.submissions (lower(instagram_handle));