import { Plus, Trash2 } from "lucide-react";
import EditorInput from "./EditorInput";
import EditorImage from "./EditorImage";
import { FC } from "react";
import { CardItem } from "@/types/sections";

type EditorCardProps = {
  item: CardItem;
  onChange: (updated: CardItem) => void;
  onRemove?: (id: number) => void;
};

const EditorCard: FC<EditorCardProps> = ({ item, onChange, onRemove }) => {
  const handleFieldChange = (key: keyof CardItem, value: any) => {
    onChange({ ...item, [key]: value });
  };

  return (
    <div className="space-y-6 p-6 bg-black/5 rounded-2xl relative border border-transparent hover:border-black/5 transition-all">
      {onRemove && (
        <button
          onClick={() => onRemove(item.id)}
          className="absolute top-1 right-4 p-2 text-red-500 bg-white rounded-lg shadow-sm"
        >
          <Trash2 size={20} />
        </button>
      )}

      {/* Naslov i vreme */}
      <EditorInput
        label="Naslov"
        value={item.title || ""}
        onChange={(v) => handleFieldChange("title", v)}
      />
      {item.time !== undefined && (
        <EditorInput
          label="Vreme"
          value={item.time || ""}
          onChange={(v) => handleFieldChange("time", v)}
        />
      )}

      {/* Lokacija */}
      {item.location !== undefined && (
        <EditorInput
          label="Lokacija"
          value={item.location || ""}
          type="textarea"
          rows={2}
          onChange={(v) => handleFieldChange("location", v)}
        />
      )}

      {/* Tekst / opis */}
      {item.text !== undefined && (
        <EditorInput
          label="Opis"
          value={item.text || ""}
          type="textarea"
          rows={4}
          onChange={(v) => handleFieldChange("text", v)}
        />
      )}

      {/* Slika */}
      {item.image !== undefined && (
        <EditorImage
          label="Slika"
          value={item.image || ""}
          onChange={(v) => handleFieldChange("image", v)}
        />
      )}
    </div>
  );
};

export default EditorCard;
