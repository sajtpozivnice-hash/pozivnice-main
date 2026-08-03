import { uploadImageToCloudinary } from "@/helpers/uploadImageToCloudinary";
import { ImageIcon, Loader2 } from "lucide-react";
import { FC, useState } from "react";

type EditorImageProps = {
  label: string;
  value?: string;
  onChange: (url: string) => void;
};

const EditorImage: FC<EditorImageProps> = ({ label, value, onChange }) => {
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(file, "filee");
    if (!file) return;

    setLoading(true);

    try {
      const url = await uploadImageToCloudinary(file);
      onChange(url);
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <label className="text-[14px] uppercase tracking-[0.2em] font-bold">
          {label}
        </label>
      </div>

      <div className={`relative group ${loading ? "pointer-events-none" : ""}`}>
        <div
          className={`aspect-[16/8] rounded-3xl overflow-hidden bg-black/5 border border-black/5 shadow-inner transition-all ${
            loading
              ? "opacity-60"
              : "lg:hover:shadow-xl lg:hover:shadow-black/5"
          }`}
        >
          <img
            src={value}
            className={`w-full h-full object-cover transition-transform duration-700 object-center ${
              !loading ? "lg:group-hover:scale-110" : ""
            }`}
            referrerPolicy="no-referrer"
          />
          <div
            className={`hidden lg:flex absolute inset-0 bg-black/40 transition-opacity items-center justify-center gap-3 backdrop-blur-sm rounded-3xl ${
              !loading ? "opacity-0 lg:group-hover:opacity-100" : "opacity-0"
            }`}
          >
            <label className="cursor-pointer bg-white text-black px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl">
              <span>Promeni Sliku</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleUpload}
              />
            </label>
          </div>
        </div>

        <div className="lg:hidden absolute bottom-3 right-3">
          <label className="flex items-center gap-2 bg-white/90 backdrop-blur-md text-black px-4 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest shadow-xl active:scale-95 transition-all border border-black/5">
            <ImageIcon size={18} />
            <span>Promeni Sliku</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleUpload}
            />
          </label>
        </div>
      </div>

      <div className="space-y-3">
        {loading && (
          <div className="relative">
            <div className="absolute left-3 lg:left-auto lg:right-3 bottom-3 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black text-white rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-black/20">
              <Loader2 size={18} className="animate-spin" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditorImage;
