-- Pokreni OVO u Supabase → SQL Editor (ceo fajl odjednom).
-- Bez ovoga subdomain pozivnice ne mogu da se učitaju preko anon ključa.

ALTER TABLE public.projects
  ADD COLUMN IF NOT EXISTS published boolean;

UPDATE public.projects
SET published = true
WHERE subdomain IS NOT NULL
  AND btrim(subdomain) <> '';

UPDATE public.projects
SET published = false
WHERE published IS NULL;

ALTER TABLE public.projects
  ALTER COLUMN published SET DEFAULT false;

ALTER TABLE public.projects
  ALTER COLUMN published SET NOT NULL;

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

-- Refresh PostgREST schema cache (ako postoji)
NOTIFY pgrst, 'reload schema';
