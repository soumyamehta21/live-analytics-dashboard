import { DayPicker } from "react-day-picker";
import { useTranslation } from "react-i18next";
import { enUS, es, fr } from "date-fns/locale";
import type { DateRange } from "react-day-picker";
import { useState } from "react";
import { FaCalendar } from "react-icons/fa";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover.tsx";
import "react-day-picker/style.css";

function getCurrentMonthRange(): DateRange {
  const today = new Date();
  const from = new Date(today.getFullYear(), today.getMonth(), 1);
  const to = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  return { from, to };
}

function formatDate(date: Date, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function formatDateRange(
  range: DateRange | undefined,
  locale: string,
  placeholder: string,
): string {
  if (!range?.from) return placeholder;
  if (range.from && !range.to) return formatDate(range.from, locale);
  if (range.from && range.to)
    return `${formatDate(range.from, locale)} - ${formatDate(range.to, locale)}`;
  return placeholder;
}

function getDatePickerLocale(language: string) {
  switch (language.split("-")[0]) {
    case "es":
      return es;
    case "fr":
      return fr;
    default:
      return enUS;
  }
}

export function DatePicker() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [range, setRange] = useState<DateRange | undefined>(
    getCurrentMonthRange,
  );
  const [month, setMonth] = useState<Date>(
    () => getCurrentMonthRange().from ?? new Date(),
  );
  const locale = i18n.resolvedLanguage ?? i18n.language;

  const handleSelect = (nextRange: DateRange | undefined) => {
    setRange(nextRange);
    if (nextRange?.from) {
      setMonth(nextRange.from);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="flex h-9 items-center gap-2 rounded-xl border border-white/80 bg-white/90 px-3 text-sm text-slate-700 shadow-sm shadow-slate-200/70 transition-all duration-200 hover:border-indigo-200 hover:bg-indigo-50/70 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:shadow-none dark:hover:border-slate-600 dark:hover:bg-slate-700"
          aria-label={t("selectDateRange")}
        >
          <FaCalendar className="text-slate-500 dark:text-slate-400" />
          <span className="font-semibold">
            {formatDateRange(range, locale, t("dateRangePlaceholder"))}
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-[min(96vw,42rem)] overflow-hidden rounded-2xl border border-slate-200/90 bg-white/95 p-0 shadow-[0_24px_60px_rgba(15,23,42,0.16)] dark:border-slate-800 dark:bg-slate-900 dark:shadow-[0_24px_60px_rgba(2,6,23,0.5)]"
      >
        <div className="px-4 py-4 sm:px-5 sm:py-5">
          <DayPicker
            mode="range"
            selected={range}
            onSelect={handleSelect}
            month={month}
            onMonthChange={setMonth}
            numberOfMonths={2}
            navLayout="around"
            showOutsideDays
            locale={getDatePickerLocale(locale)}
            className="dashboard-date-picker"
            classNames={{
              root: "rdp-root",
              months: "rdp-months flex flex-col gap-3 md:flex-row md:gap-4",
              month: "rdp-month w-full min-w-0 space-y-3",
              month_caption:
                "rdp-month_caption mb-3 flex h-9 items-center justify-center",
              caption_label:
                "rdp-caption_label text-[0.98rem] font-semibold tracking-[0.01em] text-slate-900 dark:text-slate-100",
              nav: "rdp-nav",
              button_previous:
                "rdp-button_previous z-10 flex items-center justify-center rounded-xl border border-slate-200 bg-white p-0 text-slate-600 transition-colors hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 aria-disabled:opacity-40 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-100",
              button_next:
                "rdp-button_next z-10 flex items-center justify-center rounded-xl border border-slate-200 bg-white p-0 text-slate-600 transition-colors hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 aria-disabled:opacity-40 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-100",
              chevron: "rdp-chevron h-4 w-4",
              month_grid: "rdp-month_grid",
              weekdays: "rdp-weekdays",
              weekday:
                "rdp-weekday h-8 px-0 text-[0.78rem] font-medium text-slate-500 dark:text-slate-400",
              weeks: "rdp-weeks",
              week: "rdp-week",
              day: "rdp-day p-0 text-center align-middle text-sm",
              day_button:
                "rdp-day_button border-0 text-[0.9rem] font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-white",
              selected: "rdp-selected",
              today: "rdp-today",
              range_start: "rdp-range_start",
              range_middle: "rdp-range_middle",
              range_end: "rdp-range_end",
              outside: "rdp-outside",
              disabled: "rdp-disabled",
              hidden: "rdp-hidden",
            }}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
