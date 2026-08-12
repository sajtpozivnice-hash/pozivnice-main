-- =============================================================================
-- APPLY ALL (safe / idempotent) — pokreni CEO fajl u Supabase → SQL Editor
-- Datum: 2026-08-12
--
-- Šta pokriva (isti redosled kao supabase/migrations/):
--   1) budget
--   2) planner_tasks
--   3) guest_photos (+ is_project_owner / can_upload_guest_photo / subdomain RPC)
--   4) projects.published + get_published_project_by_subdomain
--   5) cascade FK za tables/guests
--   6) guests party RSVP (party_size, is_child, age, parent_guest_id, name_pending)
-- =============================================================================

-- ---------------------------------------------------------------------------
-- 1) BUDGET
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.budget_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  name text NOT NULL,
  icon text NOT NULL DEFAULT 'Wallet',
  color text NOT NULL DEFAULT '#64748b',
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.budget_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  category_id uuid NOT NULL REFERENCES public.budget_categories(id) ON DELETE RESTRICT,
  title text NOT NULL,
  vendor_name text,
  planned_amount numeric(12, 2) NOT NULL DEFAULT 0 CHECK (planned_amount >= 0),
  currency text NOT NULL DEFAULT 'EUR',
  due_date date,
  payment_date date,
  phone text,
  email text,
  website text,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.budget_payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  budget_item_id uuid NOT NULL REFERENCES public.budget_items(id) ON DELETE CASCADE,
  amount numeric(12, 2) NOT NULL CHECK (amount > 0),
  payment_date date NOT NULL DEFAULT CURRENT_DATE,
  method text NOT NULL DEFAULT 'transfer',
  note text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.budget_attachments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  budget_item_id uuid NOT NULL REFERENCES public.budget_items(id) ON DELETE CASCADE,
  file_url text NOT NULL,
  file_name text NOT NULL,
  type text NOT NULL DEFAULT 'other',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS budget_categories_project_id_idx ON public.budget_categories(project_id);
CREATE INDEX IF NOT EXISTS budget_items_project_id_idx ON public.budget_items(project_id);
CREATE INDEX IF NOT EXISTS budget_items_category_id_idx ON public.budget_items(category_id);
CREATE INDEX IF NOT EXISTS budget_payments_budget_item_id_idx ON public.budget_payments(budget_item_id);
CREATE INDEX IF NOT EXISTS budget_attachments_budget_item_id_idx ON public.budget_attachments(budget_item_id);

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

ALTER TABLE public.budget_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.budget_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.budget_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.budget_attachments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "budget_categories_owner_all" ON public.budget_categories;
CREATE POLICY "budget_categories_owner_all"
ON public.budget_categories FOR ALL TO authenticated
USING (public.is_project_owner(project_id))
WITH CHECK (public.is_project_owner(project_id));

DROP POLICY IF EXISTS "budget_items_owner_all" ON public.budget_items;
CREATE POLICY "budget_items_owner_all"
ON public.budget_items FOR ALL TO authenticated
USING (public.is_project_owner(project_id))
WITH CHECK (public.is_project_owner(project_id));

DROP POLICY IF EXISTS "budget_payments_owner_all" ON public.budget_payments;
CREATE POLICY "budget_payments_owner_all"
ON public.budget_payments FOR ALL TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.budget_items bi
    WHERE bi.id = budget_item_id AND public.is_project_owner(bi.project_id)
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.budget_items bi
    WHERE bi.id = budget_item_id AND public.is_project_owner(bi.project_id)
  )
);

DROP POLICY IF EXISTS "budget_attachments_owner_all" ON public.budget_attachments;
CREATE POLICY "budget_attachments_owner_all"
ON public.budget_attachments FOR ALL TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.budget_items bi
    WHERE bi.id = budget_item_id AND public.is_project_owner(bi.project_id)
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.budget_items bi
    WHERE bi.id = budget_item_id AND public.is_project_owner(bi.project_id)
  )
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.budget_categories TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.budget_items TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.budget_payments TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.budget_attachments TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_project_owner(uuid) TO authenticated;

-- ---------------------------------------------------------------------------
-- 2) PLANNER
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.planner_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  name text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (project_id, name)
);

CREATE TABLE IF NOT EXISTS public.planner_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  category text NOT NULL DEFAULT 'Ostalo',
  title text NOT NULL,
  description text,
  priority text NOT NULL DEFAULT 'medium'
    CHECK (priority IN ('low', 'medium', 'high')),
  due_date date,
  completed boolean NOT NULL DEFAULT false,
  completed_at timestamptz,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS planner_categories_project_id_idx ON public.planner_categories(project_id);
CREATE INDEX IF NOT EXISTS planner_tasks_project_id_idx ON public.planner_tasks(project_id);
CREATE INDEX IF NOT EXISTS planner_tasks_due_date_idx ON public.planner_tasks(due_date);
CREATE INDEX IF NOT EXISTS planner_tasks_completed_idx ON public.planner_tasks(completed);

ALTER TABLE public.planner_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.planner_tasks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "planner_categories_owner_all" ON public.planner_categories;
CREATE POLICY "planner_categories_owner_all"
ON public.planner_categories FOR ALL TO authenticated
USING (public.is_project_owner(project_id))
WITH CHECK (public.is_project_owner(project_id));

DROP POLICY IF EXISTS "planner_tasks_owner_all" ON public.planner_tasks;
CREATE POLICY "planner_tasks_owner_all"
ON public.planner_tasks FOR ALL TO authenticated
USING (public.is_project_owner(project_id))
WITH CHECK (public.is_project_owner(project_id));

GRANT SELECT, INSERT, UPDATE, DELETE ON public.planner_categories TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.planner_tasks TO authenticated;

-- ---------------------------------------------------------------------------
-- 3) GUEST PHOTOS (trenutno NAJVAŽNIJI gap na bazi)
-- ---------------------------------------------------------------------------
DROP TABLE IF EXISTS public.project_images;

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

CREATE INDEX IF NOT EXISTS guest_photos_project_id_idx ON public.guest_photos(project_id);
CREATE INDEX IF NOT EXISTS guest_photos_created_at_idx ON public.guest_photos(project_id, created_at DESC);

ALTER TABLE public.guest_photos ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "guest_photos_owner_select" ON public.guest_photos;
CREATE POLICY "guest_photos_owner_select"
ON public.guest_photos FOR SELECT
USING (public.is_project_owner(project_id));

DROP POLICY IF EXISTS "guest_photos_owner_delete" ON public.guest_photos;
CREATE POLICY "guest_photos_owner_delete"
ON public.guest_photos FOR DELETE
USING (public.is_project_owner(project_id));

DROP POLICY IF EXISTS "guest_photos_public_insert" ON public.guest_photos;
CREATE POLICY "guest_photos_public_insert"
ON public.guest_photos FOR INSERT
TO anon, authenticated
WITH CHECK (public.can_upload_guest_photo(project_id));

GRANT SELECT, DELETE ON public.guest_photos TO authenticated;
GRANT INSERT ON public.guest_photos TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.is_project_owner(uuid) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.can_upload_guest_photo(uuid) TO anon, authenticated;

-- ---------------------------------------------------------------------------
-- 4) PUBLISHED + SUBDOMAIN RPC
-- ---------------------------------------------------------------------------
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS published boolean;

UPDATE public.projects
SET published = true
WHERE subdomain IS NOT NULL AND btrim(subdomain) <> '' AND published IS NULL;

UPDATE public.projects
SET published = false
WHERE published IS NULL;

ALTER TABLE public.projects ALTER COLUMN published SET DEFAULT false;
ALTER TABLE public.projects ALTER COLUMN published SET NOT NULL;

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

-- ---------------------------------------------------------------------------
-- 5) CASCADE FK (tables / guests)
-- ---------------------------------------------------------------------------
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'tables'
  ) THEN
    ALTER TABLE public.tables DROP CONSTRAINT IF EXISTS tables_project_id_fkey;
    ALTER TABLE public.tables
      ADD CONSTRAINT tables_project_id_fkey
      FOREIGN KEY (project_id) REFERENCES public.projects(id) ON DELETE CASCADE;
  END IF;

  IF EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'guests'
  ) THEN
    ALTER TABLE public.guests DROP CONSTRAINT IF EXISTS guests_project_id_fkey;
    ALTER TABLE public.guests
      ADD CONSTRAINT guests_project_id_fkey
      FOREIGN KEY (project_id) REFERENCES public.projects(id) ON DELETE CASCADE;

    IF EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = 'guests' AND column_name = 'table_id'
    ) THEN
      ALTER TABLE public.guests DROP CONSTRAINT IF EXISTS guests_table_id_fkey;
      ALTER TABLE public.guests
        ADD CONSTRAINT guests_table_id_fkey
        FOREIGN KEY (table_id) REFERENCES public.tables(id) ON DELETE SET NULL;
    END IF;
  END IF;
END $$;

-- ---------------------------------------------------------------------------
-- 6) PARTY RSVP (guests extensions)
-- ---------------------------------------------------------------------------
ALTER TABLE public.guests
  ADD COLUMN IF NOT EXISTS party_size integer NOT NULL DEFAULT 1,
  ADD COLUMN IF NOT EXISTS is_child boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS age integer NULL,
  ADD COLUMN IF NOT EXISTS parent_guest_id uuid NULL,
  ADD COLUMN IF NOT EXISTS name_pending boolean NOT NULL DEFAULT false;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'guests_parent_guest_id_fkey'
  ) THEN
    ALTER TABLE public.guests
      ADD CONSTRAINT guests_parent_guest_id_fkey
      FOREIGN KEY (parent_guest_id)
      REFERENCES public.guests(id)
      ON DELETE CASCADE;
  END IF;
END $$;

ALTER TABLE public.guests DROP CONSTRAINT IF EXISTS guests_party_size_check;
ALTER TABLE public.guests
  ADD CONSTRAINT guests_party_size_check
  CHECK (party_size >= 1 AND party_size <= 50);

ALTER TABLE public.guests DROP CONSTRAINT IF EXISTS guests_age_check;
ALTER TABLE public.guests
  ADD CONSTRAINT guests_age_check
  CHECK (age IS NULL OR (age >= 0 AND age <= 120));

CREATE INDEX IF NOT EXISTS guests_parent_guest_id_idx ON public.guests(parent_guest_id);
CREATE INDEX IF NOT EXISTS guests_project_parent_idx ON public.guests(project_id, parent_guest_id);

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
ON public.guests FOR INSERT TO anon, authenticated
WITH CHECK (public.can_submit_rsvp(project_id));

DROP POLICY IF EXISTS "guests_owner_select" ON public.guests;
CREATE POLICY "guests_owner_select"
ON public.guests FOR SELECT TO authenticated
USING (public.is_project_owner(project_id));

DROP POLICY IF EXISTS "guests_owner_insert" ON public.guests;
CREATE POLICY "guests_owner_insert"
ON public.guests FOR INSERT TO authenticated
WITH CHECK (public.is_project_owner(project_id));

DROP POLICY IF EXISTS "guests_owner_update" ON public.guests;
CREATE POLICY "guests_owner_update"
ON public.guests FOR UPDATE TO authenticated
USING (public.is_project_owner(project_id))
WITH CHECK (public.is_project_owner(project_id));

DROP POLICY IF EXISTS "guests_owner_delete" ON public.guests;
CREATE POLICY "guests_owner_delete"
ON public.guests FOR DELETE TO authenticated
USING (public.is_project_owner(project_id));

GRANT SELECT, INSERT, UPDATE, DELETE ON public.guests TO authenticated;
GRANT INSERT ON public.guests TO anon;
GRANT EXECUTE ON FUNCTION public.can_submit_rsvp(uuid) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.is_project_owner(uuid) TO anon, authenticated;

NOTIFY pgrst, 'reload schema';

-- ---------------------------------------------------------------------------
-- VERIFY (rezultat u Messages / Results)
-- ---------------------------------------------------------------------------
SELECT
  to_regclass('public.budget_categories') AS budget_categories,
  to_regclass('public.planner_tasks') AS planner_tasks,
  to_regclass('public.guest_photos') AS guest_photos,
  (SELECT COUNT(*) FROM information_schema.columns
     WHERE table_schema='public' AND table_name='guests'
       AND column_name IN ('party_size','is_child','age','parent_guest_id','name_pending')
  ) AS guests_party_cols,
  EXISTS (
    SELECT 1 FROM pg_proc p
    JOIN pg_namespace n ON n.oid = p.pronamespace
    WHERE n.nspname='public' AND p.proname='can_submit_rsvp'
  ) AS has_can_submit_rsvp,
  EXISTS (
    SELECT 1 FROM pg_proc p
    JOIN pg_namespace n ON n.oid = p.pronamespace
    WHERE n.nspname='public' AND p.proname='get_published_project_by_subdomain'
  ) AS has_subdomain_rpc;
