CREATE TABLE IF NOT EXISTS public.final_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  university text NOT NULL,
  instagram_handle text NOT NULL,
  brand_choice text NOT NULL,
  reel_1 text NOT NULL,
  reel_2 text,
  reel_3 text,
  shortlisted boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.final_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert final submissions"
ON public.final_submissions FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Anyone can view final submissions"
ON public.final_submissions FOR SELECT TO public USING (true);

CREATE POLICY "Anyone can update final submissions"
ON public.final_submissions FOR UPDATE TO public USING (true) WITH CHECK (true);

CREATE UNIQUE INDEX IF NOT EXISTS final_submissions_email_brand_unique_idx
  ON public.final_submissions (lower(email), brand_choice);

CREATE UNIQUE INDEX IF NOT EXISTS final_submissions_handle_brand_unique_idx
  ON public.final_submissions (lower(instagram_handle), brand_choice);