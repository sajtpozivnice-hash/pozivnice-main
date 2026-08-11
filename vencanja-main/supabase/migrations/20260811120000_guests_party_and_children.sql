-- Party RSVP: contact + companion guests, children, age
-- Extends existing guests table (no parallel system).

ALTER TABLE public.guests
  ADD COLUMN IF NOT EXISTS party_size integer NOT NULL DEFAULT 1,
  ADD COLUMN IF NOT EXISTS is_child boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS age integer NULL,
  ADD COLUMN IF NOT EXISTS parent_guest_id uuid NULL,
  ADD COLUMN IF NOT EXISTS name_pending boolean NOT NULL DEFAULT false;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'guests_parent_guest_id_fkey'
  ) THEN
    ALTER TABLE public.guests
      ADD CONSTRAINT guests_parent_guest_id_fkey
      FOREIGN KEY (parent_guest_id)
      REFERENCES public.guests(id)
      ON DELETE CASCADE;
  END IF;
END $$;

ALTER TABLE public.guests
  DROP CONSTRAINT IF EXISTS guests_party_size_check;
ALTER TABLE public.guests
  ADD CONSTRAINT guests_party_size_check
  CHECK (party_size >= 1 AND party_size <= 50);

ALTER TABLE public.guests
  DROP CONSTRAINT IF EXISTS guests_age_check;
ALTER TABLE public.guests
  ADD CONSTRAINT guests_age_check
  CHECK (age IS NULL OR (age >= 0 AND age <= 120));

CREATE INDEX IF NOT EXISTS guests_parent_guest_id_idx
  ON public.guests(parent_guest_id);

CREATE INDEX IF NOT EXISTS guests_project_parent_idx
  ON public.guests(project_id, parent_guest_id);

CREATE OR REPLACE FUNCTION public.can_submit_rsvp(p_project_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    public.is_project_owner(p_project_id)
    OR EXISTS (
      SELECT 1
      FROM public.projects p
      WHERE p.id = p_project_id
        AND p.published = true
    );
$$;

ALTER TABLE public.guests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "guests_public_rsvp_insert" ON public.guests;
CREATE POLICY "guests_public_rsvp_insert"
ON public.guests
FOR INSERT
TO anon, authenticated
WITH CHECK (public.can_submit_rsvp(project_id));

-- Owners keep full access via existing policies if present; ensure owner CRUD.
DROP POLICY IF EXISTS "guests_owner_select" ON public.guests;
CREATE POLICY "guests_owner_select"
ON public.guests
FOR SELECT
TO authenticated
USING (public.is_project_owner(project_id));

DROP POLICY IF EXISTS "guests_owner_insert" ON public.guests;
CREATE POLICY "guests_owner_insert"
ON public.guests
FOR INSERT
TO authenticated
WITH CHECK (public.is_project_owner(project_id));

DROP POLICY IF EXISTS "guests_owner_update" ON public.guests;
CREATE POLICY "guests_owner_update"
ON public.guests
FOR UPDATE
TO authenticated
USING (public.is_project_owner(project_id))
WITH CHECK (public.is_project_owner(project_id));

DROP POLICY IF EXISTS "guests_owner_delete" ON public.guests;
CREATE POLICY "guests_owner_delete"
ON public.guests
FOR DELETE
TO authenticated
USING (public.is_project_owner(project_id));

GRANT SELECT, INSERT, UPDATE, DELETE ON public.guests TO authenticated;
GRANT INSERT ON public.guests TO anon;
GRANT EXECUTE ON FUNCTION public.can_submit_rsvp(uuid) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.is_project_owner(uuid) TO anon, authenticated;
