import { FC } from "react";
import { useEditor } from "../EditorProvider";
import { cn } from "../panels/helpers";

type EditorInputProps = {
  label: string;
  type?: "text" | "textarea" | "date" | "color" | "number";
  value: string;
  onChange: (value: string) => void;
  className?: string;
  rows?: number;
  labelClassName?: string;
};

const EditorInput: FC<EditorInputProps> = ({
  label,
  type = "text",
  value,
  onChange,
  className,
  rows,
  labelClassName,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    onChange(e.target.value);
  };
  return (
    <div className="space-y-2">
      <div>
        <label
          className={cn(
            "text-[14px] uppercase  tracking-[0.2em] font-bold",
            labelClassName,
          )}
        >
          {label}
        </label>
      </div>
      {type === "textarea" ? (
        <textarea
          rows={rows}
          value={value || ""}
          onChange={handleChange}
          className={cn(
            "w-full px-4 py-3 bg-black/5 rounded-xl font-medium whitespace-pre-wrap",
            className,
          )}
        />
      ) : (
        <input
          type={type}
          value={value || ""}
          onChange={handleChange}
          className={cn(
            "w-full px-4 py-3 bg-black/5 rounded-xl font-medium",
            className,
          )}
        />
      )}
    </div>
  );
};

export default EditorInput;
