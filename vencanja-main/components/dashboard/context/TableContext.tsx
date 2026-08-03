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
  updateTable: (id: string, updates: Partial<CreateTableDto>) => Promise<void>;
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
      throw error;
    } finally {
      setLoading(false);
    }
  }, [activeProject?.id]);

  useEffect(() => {
    void refresh().catch(() => undefined);
  }, [refresh]);

  const createTable = async (table: CreateTableDto) => {
    if (!activeProject?.id) return;

    setLoading(true);
    try {
      const created = await createTableService(activeProject.id, table);
      setTables((prev) => [created, ...prev]);
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateTable = async (
    id: string,
    updates: Partial<CreateTableDto>,
  ) => {
    setLoading(true);
    try {
      const updated = await updateTableService(id, updates);
      setTables((prev) =>
        prev.map((table) => (table.id === id ? updated : table)),
      );
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteTable = async (id: string) => {
    setLoading(true);
    try {
      await deleteTableService(id);
      setTables((prev) => prev.filter((table) => table.id !== id));
    } catch (error) {
      console.error(error);
      throw error;
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
