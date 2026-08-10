"use client";

import { Palette } from "lucide-react";
import PanelContainer from "./PanelContainer";
import EditorInput from "../components/EditorInput";
import { useEditor } from "../EditorProvider";
import { cn } from "./helpers";
import { fontOptions } from "@/fontsOptions";
import { FontKey } from "@/helpers/fontMap";

const FontsAndColorsPanel = () => {
  const { config, updateTheme } = useEditor();
  const fonts = config.theme.fonts ?? {};
  const baseColors = config.theme.colors?.base ?? {};
  const pageBackground = config.theme.colors?.background;
  const pageBackgroundSecondary = config.theme.colors?.backgroundSecondary;

  const hasPrimaryFont = fonts.primary !== undefined;
  const hasSecondaryFont = fonts.secondary !== undefined;
  const colorEntries = Object.entries(baseColors).filter(
    ([, color]) => color !== undefined,
  );

  return (
    <PanelContainer id={"fontsColors"} title={"BOJE I FONTOVI"} icon={Palette}>
      {hasPrimaryFont ? (
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
                type="button"
                onClick={() =>
                  updateTheme({
                    fonts: {
                      ...fonts,
                      primary: font.id as FontKey,
                    },
                  })
                }
                className={cn(
                  "cursor-pointer flex flex-col items-center justify-center gap-2 p-2 rounded-2xl border transition-all",
                  fonts.primary === font.id
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
      ) : null}

      {hasSecondaryFont ? (
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
                type="button"
                onClick={() =>
                  updateTheme({
                    fonts: {
                      ...fonts,
                      secondary: font.id as FontKey,
                    },
                  })
                }
                className={cn(
                  "cursor-pointer flex flex-col items-center justify-center gap-2 p-2 rounded-2xl border transition-all",
                  fonts.secondary === font.id
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
      ) : null}

      {colorEntries.length > 0 || pageBackground || pageBackgroundSecondary ? (
        <div className="space-y-4">
          <label className="text-[14px] uppercase tracking-[0.2em] font-bold text-black">
            Boje
          </label>
          <div className="grid grid-cols-2 gap-6">
            {colorEntries.map(([key, color]) => {
              if (!color) return null;
              return (
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
                    {color.name}
                  </span>
                  <span className="text-[10px] font-mono opacity-40 uppercase">
                    {color.value}
                  </span>
                </div>
              );
            })}

            {pageBackground ? (
              <div className="flex flex-col items-center gap-2">
                <EditorInput
                  type="color"
                  label={pageBackground.name || "Pozadina"}
                  value={pageBackground.value || ""}
                  onChange={(value) =>
                    updateTheme({
                      colors: {
                        background: {
                          ...pageBackground,
                          value,
                        },
                      },
                    })
                  }
                  className="w-16 h-16 p-0 border-0 bg-transparent cursor-pointer"
                />
                <span className="text-[10px] font-mono opacity-40 uppercase">
                  {pageBackground.name || "Pozadina"}
                </span>
                <span className="text-[10px] font-mono opacity-40 uppercase">
                  {pageBackground.value}
                </span>
              </div>
            ) : null}

            {pageBackgroundSecondary ? (
              <div className="flex flex-col items-center gap-2">
                <EditorInput
                  type="color"
                  label={pageBackgroundSecondary.name || "Sek. pozadina"}
                  value={pageBackgroundSecondary.value || ""}
                  onChange={(value) =>
                    updateTheme({
                      colors: {
                        backgroundSecondary: {
                          ...pageBackgroundSecondary,
                          value,
                        },
                      },
                    })
                  }
                  className="w-16 h-16 p-0 border-0 bg-transparent cursor-pointer"
                />
                <span className="text-[10px] font-mono opacity-40 uppercase">
                  {pageBackgroundSecondary.name || "Sek. pozadina"}
                </span>
                <span className="text-[10px] font-mono opacity-40 uppercase">
                  {pageBackgroundSecondary.value}
                </span>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </PanelContainer>
  );
};

export default FontsAndColorsPanel;
