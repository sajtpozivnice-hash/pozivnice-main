import { BookType, Palette } from "lucide-react";
import PanelContainer from "./PanelContainer";
import EditorInput from "../components/EditorInput";
import { useEditor } from "../EditorProvider";
import { cn } from "./helpers";
import { fontOptions } from "@/fontsOptions";

const FontsAndColorsPanel = () => {
  const { config, updateTheme } = useEditor();
  const baseColors = config.theme.colors?.base || {};
  console.log(config.theme, "config");
  return (
    <PanelContainer id={"fontsColors"} title={"BOJE I FONTOVI"} icon={Palette}>
      <div className="space-y-4">
        <label className="text-[14px] uppercase tracking-[0.2em] font-bold text-black">
          Glavni Font (Naslovi)
        </label>
        <p className="text-[12px] text-black -mt-2">
          Koristi se za imena i velike naslove
        </p>
        <div className="grid grid-cols-2 gap-3">
          {fontOptions.map((font) => (
            <button
              key={font.id}
              onClick={() =>
                updateTheme({
                  fonts: {
                    ...config.theme.fonts,
                    primary: font.id as any,
                  },
                })
              }
              className={cn(
                "cursor-pointer flex flex-col items-center justify-center gap-2 p-2 rounded-2xl border transition-all",
                config.theme.fonts?.primary === font.id
                  ? "bg-black text-white border-black shadow-xl shadow-black/20"
                  : "bg-white text-black/60 border-black/5 hover:border-black/20",
              )}
            >
              <span className={cn("text-2xl", `font-${font.id}`)}>
                {font.preview}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider">
                {font.label}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <label className="text-[14px] uppercase tracking-[0.2em] font-bold text-black">
          Sekundarni Font
        </label>
        <p className="text-[12px] text-black -mt-2">
          Koristi se za opise i detalje
        </p>
        <div className="grid grid-cols-2 gap-3">
          {fontOptions.map((font) => (
            <button
              key={font.id}
              onClick={() =>
                updateTheme({
                  fonts: {
                    ...config.theme.fonts,
                    secondary: font.id as any,
                  },
                })
              }
              className={cn(
                "cursor-pointer flex flex-col items-center justify-center gap-2 p-2 rounded-2xl border transition-all",
                config.theme.fonts?.secondary === font.id
                  ? "bg-black text-white border-black shadow-xl shadow-black/20"
                  : "bg-white text-black/60 border-black/5 hover:border-black/20",
              )}
            >
              <span className={cn("text-2xl", `font-${font.id}`)}>
                {font.preview}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider">
                {font.label}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        {Object.entries(baseColors).map(([key, color]: any) => (
          <div key={key} className="flex flex-col items-center gap-2">
            <EditorInput
              type="color"
              label={color.name}
              value={color.value || ""}
              onChange={(value) =>
                updateTheme({
                  colors: {
                    base: {
                      ...baseColors,
                      [key]: {
                        ...color,
                        value,
                      },
                    },
                  },
                })
              }
              className="w-16 h-16 p-0 border-0 bg-transparent cursor-pointer"
            />

            <span className="text-[10px] font-mono opacity-40 uppercase">
              {color.value}
            </span>
          </div>
        ))}
      </div>
    </PanelContainer>
  );
};

export default FontsAndColorsPanel;
