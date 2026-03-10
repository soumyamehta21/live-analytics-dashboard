import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import type { RootState } from "../../redux/store";

type LiveControlsProps = {
  running: boolean;
  onToggle: () => void;
};

export function LiveControls({ running, onToggle }: LiveControlsProps) {
  const { t, i18n } = useTranslation();
  const lastUpdatedAt = useSelector(
    (state: RootState) => state.analytics.lastUpdatedAt,
  );
  const locale = i18n.resolvedLanguage ?? i18n.language;

  const formatted = useMemo(() => {
    const date = new Date(lastUpdatedAt);
    return date.toLocaleTimeString(locale, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }, [lastUpdatedAt, locale]);

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-white/80 bg-gradient-to-r from-white via-white to-indigo-50/40 p-4 shadow-[0_20px_40px_-28px_rgba(15,23,42,0.35)] sm:flex-row sm:items-center sm:justify-between dark:border-slate-800 dark:bg-none dark:bg-slate-900 dark:shadow-none">
      <div>
        <span
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${
            running
              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
              : "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300"
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full ${
              running ? "bg-emerald-500" : "bg-amber-500"
            }`}
          />
          {running ? t("liveStatus") : t("pausedStatus")}
        </span>
        <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
          {t("lastUpdate")}:
          <span className="ml-1 font-semibold text-slate-900 dark:text-slate-100">
            {formatted}
          </span>
        </p>
      </div>
      <button
        type="button"
        onClick={onToggle}
        className={`inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900 ${
          running
            ? "bg-rose-500 text-white shadow-rose-500/20 hover:bg-rose-600"
            : "bg-emerald-500 text-white shadow-emerald-500/20 hover:bg-emerald-600"
        }`}
      >
        {running ? t("pauseUpdates") : t("resumeUpdates")}
      </button>
    </div>
  );
}
