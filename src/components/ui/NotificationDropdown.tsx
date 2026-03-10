import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaBell } from "react-icons/fa";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";

type NotificationDropdownProps = {
  initialUnreadCount?: number;
  buttonClassName: string;
};

type NotificationItem = {
  id: string;
  title: string;
  message: string;
  time: string;
  tone: "indigo" | "emerald" | "amber";
};

const STORAGE_KEY = "live-dashboard-unread-notifications";

const NOTIFICATIONS: NotificationItem[] = [
  {
    id: "new-order",
    title: "New enterprise order",
    message: "A high-value checkout was completed from the pricing page.",
    time: "Just now",
    tone: "emerald",
  },
  {
    id: "traffic-spike",
    title: "Traffic spike detected",
    message: "Active visitors jumped above the recent session baseline.",
    time: "2 min ago",
    tone: "indigo",
  },
  {
    id: "trial-upgrade",
    title: "Trial converted to paid",
    message: "A returning user upgraded after revisiting the product page.",
    time: "6 min ago",
    tone: "amber",
  },
];

const TONE_STYLES: Record<NotificationItem["tone"], string> = {
  indigo: "bg-indigo-500",
  emerald: "bg-emerald-500",
  amber: "bg-amber-500",
};

function resolveInitialUnreadCount(defaultCount: number) {
  if (typeof window === "undefined") return defaultCount;

  const stored = window.localStorage.getItem(STORAGE_KEY);
  const parsed = stored ? Number.parseInt(stored, 10) : Number.NaN;

  if (Number.isFinite(parsed) && parsed >= 0) {
    return parsed;
  }

  return defaultCount;
}

export function NotificationDropdown({
  initialUnreadCount = NOTIFICATIONS.length,
  buttonClassName,
}: NotificationDropdownProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(() =>
    resolveInitialUnreadCount(Math.min(initialUnreadCount, NOTIFICATIONS.length)),
  );

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, String(unreadCount));
  }, [unreadCount]);

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (nextOpen) {
      setUnreadCount(0);
    }
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <button type="button" className={`relative ${buttonClassName}`} title="Notifications">
          <FaBell />
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-semibold text-white">
              {Math.min(unreadCount, 9)}
            </span>
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className="w-[min(92vw,24rem)] rounded-2xl border border-white/80 bg-white/95 p-0 shadow-xl shadow-slate-200/70 dark:border-slate-700 dark:bg-slate-900 dark:shadow-none"
      >
        <div className="border-b border-slate-200/80 px-4 py-3 dark:border-slate-800">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                {t("notifications")}
              </p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                {unreadCount > 0
                  ? `${unreadCount} unread update${unreadCount > 1 ? "s" : ""}`
                  : "You’re all caught up"}
              </p>
            </div>
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              {NOTIFICATIONS.length} total
            </span>
          </div>
        </div>

        <div className="max-h-80 overflow-y-auto p-2">
          {NOTIFICATIONS.map((item, index) => {
            const isUnread = index < unreadCount;

            return (
              <div
                key={item.id}
                className="flex gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/70"
              >
                <span
                  className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${TONE_STYLES[item.tone]}`}
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {item.title}
                    </p>
                    {isUnread && (
                      <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-300">
                        New
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
                    {item.message}
                  </p>
                  <p className="mt-2 text-[11px] font-medium text-slate-400 dark:text-slate-500">
                    {item.time}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}