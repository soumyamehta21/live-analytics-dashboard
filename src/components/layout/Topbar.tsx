import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { FaMoon, FaSun } from "react-icons/fa";
import { DatePicker } from "../ui/DatePicker";
import { LanguageDropdown } from "../ui/LanguageDropdown";
import { NotificationDropdown } from "../ui/NotificationDropdown";

type TopbarProps = {
  title: string;
  unreadNotifications?: number;
  userName?: string;
  onToggleTheme: () => void;
  isDark: boolean;
};

export function Topbar({
  title,
  unreadNotifications = 3,
  userName = "Soumya Mehta",
  onToggleTheme,
  isDark,
}: TopbarProps) {
  const { t } = useTranslation();
  const initials = useMemo(() => {
    const parts = userName.trim().split(" ");
    return parts.length > 1
      ? `${parts[0][0]}${parts[1][0]}`.toUpperCase()
      : userName.slice(0, 2).toUpperCase();
  }, [userName]);

  const btnClass =
    "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/80 bg-white/90 text-slate-600 shadow-sm shadow-slate-200/70 transition-colors duration-200 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:shadow-none dark:hover:border-slate-600 dark:hover:bg-slate-700 dark:hover:text-white";

  return (
    <header className="flex h-16 w-full items-center justify-between gap-4 border-b border-slate-200/80 bg-white/75 px-4 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
          {title}
        </h2>
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden sm:block">
          <DatePicker />
        </div>

        <button
          type="button"
          onClick={onToggleTheme}
          className={btnClass}
          title={t("toggleTheme")}
          aria-label={t("toggleTheme")}
        >
          {isDark ? <FaSun /> : <FaMoon />}
        </button>

        <div className="relative">
          <LanguageDropdown />
        </div>

        <NotificationDropdown
          initialUnreadCount={unreadNotifications}
          buttonClassName={btnClass}
        />

        <div className="flex h-9 items-center gap-2 rounded-xl border border-white/80 bg-white/90 px-2.5 shadow-sm shadow-slate-200/70 dark:border-slate-700 dark:bg-slate-800 dark:shadow-none">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-[11px] font-semibold text-white shadow-sm shadow-indigo-500/30 dark:shadow-none">
            {initials}
          </div>
          <span className="hidden text-[13px] font-semibold text-slate-900 dark:text-white sm:block">
            {userName}
          </span>
        </div>
      </div>
    </header>
  );
}
