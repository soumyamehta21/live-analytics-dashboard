import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";

import {
  FaChartPie,
  FaClipboardList,
  FaCog,
  FaFolderOpen,
  FaHome,
} from "react-icons/fa";

type MenuItem = {
  key: string;
  labelKey: string;
  icon: ReactNode;
};

const PRIMARY_MENU: MenuItem[] = [
  { key: "dashboard", labelKey: "dashboard", icon: <FaHome /> },
  { key: "live-feed", labelKey: "liveFeed", icon: <FaFolderOpen /> },
  { key: "revenue", labelKey: "revenue", icon: <FaChartPie /> },
  {
    key: "recent-activity",
    labelKey: "recentActivity",
    icon: <FaClipboardList />,
  },
];

const BOTTOM_MENU: MenuItem[] = [
  { key: "settings", labelKey: "settings", icon: <FaCog /> },
];

type SidebarProps = {
  selectedKey?: string;
  onSelect?: (key: string) => void;
};

export function Sidebar({ selectedKey = "dashboard", onSelect }: SidebarProps) {
  const { t } = useTranslation();

  return (
    <aside className="group relative flex h-full w-16 flex-col overflow-hidden border-r border-slate-200 bg-white transition-[width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:w-56 dark:border-slate-800 dark:bg-slate-900">
      <div className="grid h-16 grid-cols-[2.625rem_1fr] items-center gap-x-[8px] border-b border-slate-200 px-3 dark:border-slate-800">
        <div className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-indigo-300 bg-indigo-100 text-indigo-700 shadow-sm dark:border-indigo-400/40 dark:bg-indigo-400/15 dark:text-indigo-200">
          <span className="text-[0.82rem] font-semibold">LA</span>
        </div>
        <div className="overflow-hidden whitespace-nowrap text-base font-semibold tracking-[0.01em] text-slate-900 opacity-0 transition-[opacity,transform] duration-200 ease-out -translate-x-1 group-hover:translate-x-0 group-hover:opacity-100 dark:text-white">
          {t("brandName")}
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-2 py-3">
        {PRIMARY_MENU.map((item) => {
          const active = item.key === selectedKey;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onSelect?.(item.key)}
              className={`group grid w-full grid-cols-[2rem_1fr] items-center gap-x-[12px] rounded-lg px-2 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 ${
                active
                  ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-300"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
              }`}
            >
              <span className="flex h-8 w-8 items-center justify-center text-lg opacity-80">
                {item.icon}
              </span>
              <span className="overflow-hidden whitespace-nowrap text-left opacity-0 transition-[opacity,transform] duration-200 ease-out -translate-x-1 group-hover:translate-x-0 group-hover:opacity-100">
                {t(item.labelKey)}
              </span>
            </button>
          );
        })}
      </nav>

      <div className="border-t border-slate-200 px-2 py-3 dark:border-slate-800">
        {BOTTOM_MENU.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => onSelect?.(item.key)}
            className="group grid w-full grid-cols-[2rem_1fr] items-center gap-x-[12px] rounded-lg px-2 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <span className="flex h-8 w-8 items-center justify-center text-lg opacity-80">
              {item.icon}
            </span>
            <span className="overflow-hidden whitespace-nowrap text-left opacity-0 transition-[opacity,transform] duration-200 ease-out -translate-x-1 group-hover:translate-x-0 group-hover:opacity-100">
              {t(item.labelKey)}
            </span>
          </button>
        ))}
      </div>
    </aside>
  );
}
