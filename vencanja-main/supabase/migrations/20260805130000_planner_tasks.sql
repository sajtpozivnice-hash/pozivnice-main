-- Wedding task planner (project-scoped)
-- Run against hosted Supabase

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

CREATE INDEX IF NOT EXISTS planner_categories_project_id_idx
  ON public.planner_categories(project_id);

CREATE INDEX IF NOT EXISTS planner_tasks_project_id_idx
  ON public.planner_tasks(project_id);

CREATE INDEX IF NOT EXISTS planner_tasks_due_date_idx
  ON public.planner_tasks(due_date);

CREATE INDEX IF NOT EXISTS planner_tasks_completed_idx
  ON public.planner_tasks(completed);

CREATE OR REPLACE FUNCTION public.set_planner_tasks_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS planner_tasks_set_updated_at ON public.planner_tasks;
CREATE TRIGGER planner_tasks_set_updated_at
BEFORE UPDATE ON public.planner_tasks
FOR EACH ROW
EXECUTE FUNCTION public.set_planner_tasks_updated_at();

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

ALTER TABLE public.planner_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.planner_tasks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "planner_categories_owner_all" ON public.planner_categories;
CREATE POLICY "planner_categories_owner_all"
ON public.planner_categories
FOR ALL
USING (public.is_project_owner(project_id))
WITH CHECK (public.is_project_owner(project_id));

DROP POLICY IF EXISTS "planner_tasks_owner_all" ON public.planner_tasks;
CREATE POLICY "planner_tasks_owner_all"
ON public.planner_tasks
FOR ALL
USING (public.is_project_owner(project_id))
WITH CHECK (public.is_project_owner(project_id));

GRANT SELECT, INSERT, UPDATE, DELETE ON public.planner_categories TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.planner_tasks TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_project_owner(uuid) TO authenticated;
