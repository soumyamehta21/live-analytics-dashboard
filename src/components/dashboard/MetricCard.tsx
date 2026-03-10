import type { ReactNode } from "react";

type MetricCardProps = {
  title: string;
  value: string | number;
  subtitle: string;
  icon: ReactNode;
  variant?: "primary" | "success" | "warning" | "neutral";
};

const ICON_STYLES: Record<NonNullable<MetricCardProps["variant"]>, string> = {
  primary:
    "bg-indigo-100 text-indigo-700 ring-1 ring-indigo-200/80 dark:bg-indigo-500/15 dark:text-indigo-200 dark:ring-indigo-500/20",
  success:
    "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200/80 dark:bg-emerald-500/15 dark:text-emerald-200 dark:ring-emerald-500/20",
  warning:
    "bg-amber-100 text-amber-700 ring-1 ring-amber-200/80 dark:bg-amber-500/15 dark:text-amber-200 dark:ring-amber-500/20",
  neutral:
    "bg-slate-100 text-slate-700 ring-1 ring-slate-200/80 dark:bg-slate-700/20 dark:text-slate-200 dark:ring-slate-600/40",
};

const GLOW_STYLES: Record<NonNullable<MetricCardProps["variant"]>, string> = {
  primary: "bg-indigo-300/30 dark:bg-indigo-500/12",
  success: "bg-emerald-300/30 dark:bg-emerald-500/12",
  warning: "bg-amber-200/40 dark:bg-amber-500/12",
  neutral: "bg-slate-300/35 dark:bg-slate-500/10",
};

export function MetricCard({
  title,
  value,
  subtitle,
  icon,
  variant = "primary",
}: MetricCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/80 bg-white/95 p-5 shadow-[0_20px_40px_-28px_rgba(15,23,42,0.35)] transition-colors duration-200 hover:border-slate-200 hover:bg-white dark:border-slate-800 dark:bg-slate-900 dark:shadow-none dark:hover:bg-slate-900">
      <div
        className={`absolute -right-8 -top-8 h-24 w-24 rounded-full blur-3xl ${GLOW_STYLES[variant]}`}
      />
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-300">
            {title}
          </p>
          <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
            {value}
          </p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {subtitle}
          </p>
        </div>
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl text-lg shadow-sm ${ICON_STYLES[variant]}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}
