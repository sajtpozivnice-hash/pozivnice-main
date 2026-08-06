-- Fix legacy FKs so project/client deletes do not get blocked by seating tables/guests.
-- Safe to re-run.

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

    -- Optional: if guests.table_id references tables
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
