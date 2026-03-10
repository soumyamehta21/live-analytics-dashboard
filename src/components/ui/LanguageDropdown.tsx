import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaGlobe } from "react-icons/fa";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover.tsx";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
];

export function LanguageDropdown() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  const current = useMemo(() => {
    const found = LANGUAGES.find((lang) => lang.code === i18n.language);
    return found ?? LANGUAGES[0];
  }, [i18n.language]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/80 bg-white/90 text-slate-600 shadow-sm shadow-slate-200/70 transition-colors duration-200 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:shadow-none dark:hover:border-slate-600 dark:hover:bg-slate-700 dark:hover:text-white"
          aria-label="Select language"
        >
          <FaGlobe />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-44 overflow-hidden rounded-xl border border-white/80 bg-white/95 p-1 shadow-xl shadow-slate-200/70 dark:border-slate-700 dark:bg-slate-800 dark:shadow-none"
      >
        {LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            type="button"
            onClick={() => {
              i18n.changeLanguage(lang.code);
              setOpen(false);
            }}
            className="flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm text-slate-700 transition-colors hover:bg-indigo-50 hover:text-indigo-700 dark:text-slate-200 dark:hover:bg-slate-700 dark:hover:text-white"
          >
            <span className="truncate">{lang.label}</span>
            {lang.code === current.code ? (
              <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-300">
                ✓
              </span>
            ) : null}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
}
