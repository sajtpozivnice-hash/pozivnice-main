import EditorInput from "./EditorInput";
import EditorImage from "./EditorImage";
import { FieldSchema } from "@/types/sections";
import { Plus, TrashIcon } from "lucide-react";

type Props<T extends Record<string, any>> = {
  data: T;
  schema: { fields: FieldSchema<T>[] };
  onChange: (updated: T) => void;
};

const DynamicSectionRenderer = <T extends Record<string, any>>({
  data,
  schema,
  onChange,
}: Props<T>) => {
  return (
    <div className="space-y-6">
      {schema.fields
        .filter((field) => field.key in data)
        .map((field) => {
          if (field.type === "repeater") {
            const items = (data as any)[field.key] || [];

            return (
              <div key={String(field.key)} className="space-y-4">
                <h3 className="font-bold">{field.label}</h3>

                {items.map((item: any, index: number) => (
                  <div
                    key={item.id ?? index}
                    className="relative  p-4 border rounded-xl space-y-3"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        const updatedItems = items.filter(
                          (i: any) => i.id !== item.id,
                        );

                        onChange({
                          ...data,
                          [field.key]: updatedItems,
                        });
                      }}
                      className="absolute cursor-pointer top-1 right-3 p-2 text-red-500 bg-white rounded-lg shadow-sm hover:scale-105 active:scale-95 transition-all"
                    >
                      <TrashIcon size={18} />
                    </button>
                    {field.itemSchema.map((subField) => {
                      const value = item[subField.key];

                      if (subField.type === "image") {
                        return (
                          <EditorImage
                            key={String(subField.key)}
                            label={subField.label}
                            value={value}
                            onChange={(newValue) => {
                              const updatedItems = items.filter(
                                (i: any) => i.id !== item.id,
                              );

                              updatedItems[index] = {
                                ...item,
                                [subField.key]: newValue,
                              };

                              onChange({
                                ...data,
                                [field.key]: updatedItems,
                              });
                            }}
                          />
                        );
                      }

                      return (
                        <EditorInput
                          key={String(subField.key)}
                          label={subField.label}
                          type={
                            subField.type === "textarea" ? "textarea" : "text"
                          }
                          rows={4}
                          value={value || ""}
                          onChange={(newValue) => {
                            const updatedItems = [...items];
                            updatedItems[index] = {
                              ...item,
                              [subField.key]: newValue,
                            };

                            onChange({
                              ...data,
                              [field.key]: updatedItems,
                            });
                          }}
                        />
                      );
                    })}
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => {
                    const newItem = {
                      id: crypto.randomUUID(),
                      ...field.itemSchema.reduce((acc, f) => {
                        acc[f.key] = "";
                        return acc;
                      }, {} as any),
                    };

                    onChange({
                      ...data,
                      [field.key]: [...items, newItem],
                    });
                  }}
                  className="w-full py-5 border-2 border-dashed border-black/5 rounded-2xl flex items-center justify-center gap-3 text-xs font-bold text-black/30 hover:bg-black/5 hover:border-black/10 transition-all cursor-pointer"
                >
                  <Plus size={16} />
                  Dodaj Novu Karticu
                </button>
              </div>
            );
          }
          const value = (data as any)[field.key];
          if (field.type === "image") {
            return (
              <EditorImage
                key={String(field.key)}
                label={field.label}
                value={value}
                onChange={(newValue) =>
                  onChange({
                    ...data,
                    [field.key]: newValue,
                  })
                }
              />
            );
          }

          return (
            <EditorInput
              key={String(field.key)}
              label={field.label}
              rows={8}
              type={field.type === "textarea" ? "textarea" : "text"}
              value={value || ""}
              onChange={(newValue) =>
                onChange({
                  ...data,
                  [field.key]: newValue,
                })
              }
            />
          );
        })}
    </div>
  );
};

export default DynamicSectionRenderer;
