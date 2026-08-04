import EditorInput from "./EditorInput";
import EditorImage from "./EditorImage";
import { FieldSchema } from "@/types/sections";
import { Plus, TrashIcon } from "lucide-react";

type Props<T extends Record<string, unknown>> = {
  data: T;
  schema: { fields: FieldSchema<T>[] };
  onChange: (updated: T) => void;
};

function getRepeaterItemKeys(
  items: Record<string, unknown>[],
  itemSchema: FieldSchema<Record<string, unknown>>[],
): string[] {
  if (items.length > 0) {
    const keys = new Set<string>();
    items.forEach((item) => {
      Object.keys(item).forEach((key) => {
        if (key !== "id") keys.add(key);
      });
    });
    return itemSchema
      .map((field) => String(field.key))
      .filter((key) => keys.has(key));
  }

  return itemSchema.map((field) => String(field.key));
}

const DynamicSectionRenderer = <T extends Record<string, unknown>>({
  data,
  schema,
  onChange,
}: Props<T>) => {
  return (
    <div className="space-y-6">
      {schema.fields
        // Only show fields that exist on this template's section data
        .filter((field) => field.key in data)
        .map((field) => {
          if (field.type === "repeater") {
            const items = (Array.isArray(data[field.key])
              ? data[field.key]
              : []) as Record<string, unknown>[];
            const allowedItemKeys = getRepeaterItemKeys(
              items,
              field.itemSchema as FieldSchema<Record<string, unknown>>[],
            );

            return (
              <div key={String(field.key)} className="space-y-4">
                <h3 className="font-bold">{field.label}</h3>

                {items.map((item, index) => (
                  <div
                    key={String(item.id ?? index)}
                    className="relative  p-4 border rounded-xl space-y-3"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        const updatedItems = items.filter((_, i) => i !== index);

                        onChange({
                          ...data,
                          [field.key]: updatedItems,
                        });
                      }}
                      className="absolute cursor-pointer top-1 right-3 p-2 text-red-500 bg-white rounded-lg shadow-sm hover:scale-105 active:scale-95 transition-all"
                    >
                      <TrashIcon size={18} />
                    </button>
                    {field.itemSchema
                      .filter((subField) =>
                        allowedItemKeys.includes(String(subField.key)),
                      )
                      .map((subField) => {
                        const value = item[String(subField.key)];

                        if (subField.type === "image") {
                          return (
                            <EditorImage
                              key={String(subField.key)}
                              label={subField.label}
                              value={typeof value === "string" ? value : ""}
                              onChange={(newValue) => {
                                const updatedItems = items.map((current, i) =>
                                  i === index
                                    ? {
                                        ...current,
                                        [String(subField.key)]: newValue,
                                      }
                                    : current,
                                );

                                onChange({
                                  ...data,
                                  [field.key]: updatedItems,
                                });
                              }}
                            />
                          );
                        }

                        if (subField.type === "repeater") {
                          return null;
                        }

                        return (
                          <EditorInput
                            key={String(subField.key)}
                            label={subField.label}
                            type={
                              subField.type === "textarea" ? "textarea" : "text"
                            }
                            rows={4}
                            value={typeof value === "string" ? value : ""}
                            onChange={(newValue) => {
                              const updatedItems = items.map((current, i) =>
                                i === index
                                  ? {
                                      ...current,
                                      [String(subField.key)]: newValue,
                                    }
                                  : current,
                              );

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
                    const newItem: Record<string, unknown> = {
                      id: crypto.randomUUID(),
                    };

                    allowedItemKeys.forEach((key) => {
                      newItem[key] = "";
                    });

                    // Preserve numeric id pattern if existing cards use numbers
                    if (
                      items.length > 0 &&
                      typeof items[0].id === "number"
                    ) {
                      const maxId = items.reduce((max, current) => {
                        return typeof current.id === "number"
                          ? Math.max(max, current.id)
                          : max;
                      }, 0);
                      newItem.id = maxId + 1;
                    }

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
          const value = data[field.key];
          if (field.type === "image") {
            return (
              <EditorImage
                key={String(field.key)}
                label={field.label}
                value={typeof value === "string" ? value : ""}
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
              value={typeof value === "string" ? value : ""}
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
