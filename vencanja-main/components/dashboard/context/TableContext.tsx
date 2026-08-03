import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { CreateTableDto, Table } from "../types";
import { useDashboard } from "./DashboardContext";
import {
  createTableService,
  getTablesByProjectService,
  deleteTableService,
  updateTableService,
} from "../services/tables.service";

type TableContextType = {
  tables: Table[];
  loading: boolean;

  refresh: () => Promise<void>;
  createTable: (table: CreateTableDto) => Promise<void>;
  updateTable: (id: string, updates: Partial<Table>) => Promise<void>;
  deleteTable: (id: string) => Promise<void>;
};

const TableContext = createContext<TableContextType | undefined>(undefined);

export const TableProvider = ({ children }: { children: ReactNode }) => {
  const { activeProject } = useDashboard();

  const [tables, setTables] = useState<Table[]>([]);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (!activeProject?.id) {
      setTables([]);
      return;
    }

    setLoading(true);

    try {
      const data = await getTablesByProjectService(activeProject.id);
      setTables(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [activeProject?.id]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const createTable = async (table: CreateTableDto) => {
    if (!activeProject?.id) return;
    try {
      setLoading(true);

      const created = await createTableService(activeProject.id, table);

      setTables((prev) => [created, ...prev]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateTable = async (id: string, updates: Partial<CreateTableDto>) => {
    try {
      setLoading(true);
      const updated = await updateTableService(id, updates);

      setTables((prev) =>
        prev.map((guest) => (guest.id === id ? updated : guest)),
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTable = async (id: string) => {
    try {
      setLoading(true);
      await deleteTableService(id);

      setTables((prev) => prev.filter((guest) => guest.id !== id));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <TableContext.Provider
      value={{
        tables,
        loading,
        refresh,
        createTable,
        updateTable,
        deleteTable,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

export const useTables = () => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("useTables must be used inside TableProvider");
  }
  return context;
};
