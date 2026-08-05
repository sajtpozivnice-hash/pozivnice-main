-- Wedding budget planner tables (project-scoped)
-- Run against hosted Supabase

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

CREATE INDEX IF NOT EXISTS budget_categories_project_id_idx
  ON public.budget_categories(project_id);

CREATE INDEX IF NOT EXISTS budget_items_project_id_idx
  ON public.budget_items(project_id);

CREATE INDEX IF NOT EXISTS budget_items_category_id_idx
  ON public.budget_items(category_id);

CREATE INDEX IF NOT EXISTS budget_payments_budget_item_id_idx
  ON public.budget_payments(budget_item_id);

CREATE INDEX IF NOT EXISTS budget_attachments_budget_item_id_idx
  ON public.budget_attachments(budget_item_id);

CREATE OR REPLACE FUNCTION public.set_budget_items_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS budget_items_set_updated_at ON public.budget_items;
CREATE TRIGGER budget_items_set_updated_at
BEFORE UPDATE ON public.budget_items
FOR EACH ROW
EXECUTE FUNCTION public.set_budget_items_updated_at();

-- Helper: projects owned by the authenticated client
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
ON public.budget_categories
FOR ALL
USING (public.is_project_owner(project_id))
WITH CHECK (public.is_project_owner(project_id));

DROP POLICY IF EXISTS "budget_items_owner_all" ON public.budget_items;
CREATE POLICY "budget_items_owner_all"
ON public.budget_items
FOR ALL
USING (public.is_project_owner(project_id))
WITH CHECK (public.is_project_owner(project_id));

DROP POLICY IF EXISTS "budget_payments_owner_all" ON public.budget_payments;
CREATE POLICY "budget_payments_owner_all"
ON public.budget_payments
FOR ALL
USING (
  EXISTS (
    SELECT 1
    FROM public.budget_items bi
    WHERE bi.id = budget_item_id
      AND public.is_project_owner(bi.project_id)
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.budget_items bi
    WHERE bi.id = budget_item_id
      AND public.is_project_owner(bi.project_id)
  )
);

DROP POLICY IF EXISTS "budget_attachments_owner_all" ON public.budget_attachments;
CREATE POLICY "budget_attachments_owner_all"
ON public.budget_attachments
FOR ALL
USING (
  EXISTS (
    SELECT 1
    FROM public.budget_items bi
    WHERE bi.id = budget_item_id
      AND public.is_project_owner(bi.project_id)
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.budget_items bi
    WHERE bi.id = budget_item_id
      AND public.is_project_owner(bi.project_id)
  )
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.budget_categories TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.budget_items TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.budget_payments TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.budget_attachments TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_project_owner(uuid) TO authenticated;
