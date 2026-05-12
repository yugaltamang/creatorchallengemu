ALTER TABLE public.submissions
ADD COLUMN IF NOT EXISTS shortlisted boolean NOT NULL DEFAULT false;

-- Allow updating the shortlisted flag from the admin page
DROP POLICY IF EXISTS "Anyone can update submissions" ON public.submissions;
CREATE POLICY "Anyone can update submissions"
ON public.submissions
FOR UPDATE
USING (true)
WITH CHECK (true);