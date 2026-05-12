
CREATE TABLE public.submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  university TEXT NOT NULL,
  instagram_handle TEXT NOT NULL,
  brand_choice TEXT NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert submissions"
  ON public.submissions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can view submissions"
  ON public.submissions FOR SELECT
  USING (true);
