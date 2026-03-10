import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
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

function formatDateRange(range: DateRange | undefined): string {
  if (!range?.from) return "Pick a date range";
  if (range.from && !range.to) return format(range.from, "MMM d, yyyy");
  if (range.from && range.to)
    return `${format(range.from, "MMM d, yyyy")} - ${format(range.to, "MMM d, yyyy")}`;
  return "Pick a date range";
}

export function DatePicker() {
  const [open, setOpen] = useState(false);
  const [range, setRange] = useState<DateRange | undefined>(
    getCurrentMonthRange,
  );
  const [month, setMonth] = useState<Date>(
    () => getCurrentMonthRange().from ?? new Date(),
  );

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
        >
          <FaCalendar className="text-slate-500 dark:text-slate-400" />
          <span className="font-semibold">{formatDateRange(range)}</span>
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-[min(96vw,54rem)] overflow-hidden rounded-[2rem] border border-white/10 bg-[#111214] p-0 shadow-[0_28px_90px_rgba(0,0,0,0.6)]"
      >
        <div className="px-6 py-6 sm:px-7 sm:py-7">
          <DayPicker
            mode="range"
            selected={range}
            onSelect={handleSelect}
            month={month}
            onMonthChange={setMonth}
            numberOfMonths={2}
            navLayout="around"
            showOutsideDays
            className="dashboard-date-picker"
            classNames={{
              root: "rdp-root",
              months: "rdp-months flex flex-col gap-8 md:flex-row md:gap-8",
              month: "rdp-month w-full min-w-0 space-y-4",
              month_caption:
                "rdp-month_caption mb-4 flex h-10 items-center justify-center",
              caption_label:
                "rdp-caption_label text-[1.05rem] font-semibold tracking-[0.01em] text-neutral-100",
              nav: "rdp-nav",
              button_previous:
                "rdp-button_previous z-10 rounded-full border-0 bg-transparent p-0 text-neutral-100 transition-colors hover:bg-white/5 hover:text-white aria-disabled:opacity-30",
              button_next:
                "rdp-button_next z-10 rounded-full border-0 bg-transparent p-0 text-neutral-100 transition-colors hover:bg-white/5 hover:text-white aria-disabled:opacity-30",
              chevron: "rdp-chevron h-5 w-5",
              month_grid: "rdp-month_grid",
              weekdays: "rdp-weekdays",
              weekday:
                "rdp-weekday h-10 px-0 text-[0.85rem] font-medium text-neutral-500",
              weeks: "rdp-weeks",
              week: "rdp-week",
              day: "rdp-day p-0 text-center align-middle text-sm",
              day_button:
                "rdp-day_button border-0 text-[0.95rem] font-medium text-neutral-100 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111214]",
              selected: "rdp-selected",
              today: "rdp-today",
              range_start: "rdp-range_start",
              range_middle: "rdp-range_middle",
              range_end: "rdp-range_end",
              outside: "rdp-outside text-neutral-500",
              disabled: "rdp-disabled text-neutral-700",
              hidden: "rdp-hidden",
            }}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
