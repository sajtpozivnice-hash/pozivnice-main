-- Guest-uploaded event photos (not invitation/config assets).
-- Drops the short-lived project_images owner-library table if present.

DROP TABLE IF EXISTS public.project_images;

CREATE OR REPLACE FUNCTION public.is_project_owner(p_project_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.projects p
    JOIN public.clients c ON c.id = p.client_id
    WHERE p.id = p_project_id
      AND c.auth_user_id = auth.uid()
  );
$$;

CREATE OR REPLACE FUNCTION public.can_upload_guest_photo(p_project_id uuid)
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

CREATE TABLE IF NOT EXISTS public.guest_photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  public_id text NOT NULL,
  secure_url text NOT NULL,
  file_name text,
  guest_name text,
  width integer,
  height integer,
  bytes integer,
  format text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS guest_photos_project_id_idx
  ON public.guest_photos(project_id);

CREATE INDEX IF NOT EXISTS guest_photos_created_at_idx
  ON public.guest_photos(project_id, created_at DESC);

ALTER TABLE public.guest_photos ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "guest_photos_owner_select" ON public.guest_photos;
CREATE POLICY "guest_photos_owner_select"
ON public.guest_photos
FOR SELECT
USING (public.is_project_owner(project_id));

DROP POLICY IF EXISTS "guest_photos_owner_delete" ON public.guest_photos;
CREATE POLICY "guest_photos_owner_delete"
ON public.guest_photos
FOR DELETE
USING (public.is_project_owner(project_id));

DROP POLICY IF EXISTS "guest_photos_public_insert" ON public.guest_photos;
CREATE POLICY "guest_photos_public_insert"
ON public.guest_photos
FOR INSERT
TO anon, authenticated
WITH CHECK (public.can_upload_guest_photo(project_id));

GRANT SELECT, DELETE ON public.guest_photos TO authenticated;
GRANT INSERT ON public.guest_photos TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.is_project_owner(uuid) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.can_upload_guest_photo(uuid) TO anon, authenticated;

-- Public invitation loader (avoids depending on projects SELECT policies)
CREATE OR REPLACE FUNCTION public.get_published_project_by_subdomain(p_subdomain text)
RETURNS TABLE (
  id uuid,
  title text,
  subdomain text,
  published boolean,
  config_json jsonb
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT p.id, p.title, p.subdomain, p.published, p.config_json
  FROM public.projects p
  WHERE lower(p.subdomain) = lower(trim(p_subdomain))
    AND p.published = true
  LIMIT 1;
$$;

GRANT EXECUTE ON FUNCTION public.get_published_project_by_subdomain(text)
  TO anon, authenticated;
