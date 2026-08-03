import { FC } from "react";
import { cn } from "./helpers";
import { ArrowDown, ArrowUp, Eye, EyeOff } from "lucide-react";
import { useEditor } from "../EditorProvider";

type VisibilityPanelProps = {
  id: string;
  title: string;
  visible: boolean;
  order: number;
};

const VisibilityPanel: FC<VisibilityPanelProps> = ({
  id,
  title,
  visible,
  order,
}) => {
  const { config, updateSection, moveSection } = useEditor();
  const toggleSectionVisibility = () => {
    updateSection(id, { visible: !visible });
  };
  return (
    <div
      key={id}
      className="flex flex-col p-4 bg-black/5 rounded-2xl transition-all hover:bg-black/[0.08] border border-black/5"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "w-2 h-2 rounded-full",
              visible ? "bg-green-500" : "bg-red-400",
            )}
          />
          <span
            className={cn(
              "text-sm font-bold tracking-tight",
              !visible && "opacity-40",
            )}
          >
            {title}
          </span>
        </div>
        <button
          onClick={() => toggleSectionVisibility()}
          className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all",
            visible
              ? "bg-white text-black shadow-sm hover:bg-red-50"
              : "bg-black text-white hover:bg-black/80",
          )}
        >
          {visible ? (
            <>
              <EyeOff size={12} />
              <span>Sakrij</span>
            </>
          ) : (
            <>
              <Eye size={12} />
              <span>Prikaži</span>
            </>
          )}
        </button>
      </div>

      <div className="flex gap-2">
        <button
          disabled={order === 0}
          onClick={() => moveSection(id, "up")}
          className="flex-1 flex items-center justify-center gap-2 py-2 bg-white rounded-xl text-[10px] font-bold uppercase tracking-wider text-black/60 hover:text-black disabled:opacity-20 transition-all border border-black/5"
        >
          <ArrowUp size={12} />
          <span>Pomeri Gore</span>
        </button>
        <button
          disabled={order === config.sections.length - 1}
          onClick={() => moveSection(id, "down")}
          className="flex-1 flex items-center justify-center gap-2 py-2 bg-white rounded-xl text-[10px] font-bold uppercase tracking-wider text-black/60 hover:text-black disabled:opacity-20 transition-all border border-black/5"
        >
          <ArrowDown size={12} />
          <span>Pomeri Dole</span>
        </button>
      </div>
    </div>
  );
};

export default VisibilityPanel;
