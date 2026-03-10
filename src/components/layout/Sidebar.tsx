import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";

import {
  FaChartPie,
  FaClipboardList,
  FaCog,
  FaFolderOpen,
  FaHome,
} from "react-icons/fa";

function AnalyticsLogoMark() {
  return (
    <div className="relative flex h-[42px] w-[42px] items-center justify-center overflow-hidden rounded-[14px] border border-indigo-300/80 bg-[linear-gradient(145deg,#eef2ff_0%,#e0e7ff_48%,#c7d2fe_100%)] text-indigo-700 shadow-sm dark:border-indigo-400/40 dark:bg-[linear-gradient(145deg,rgba(99,102,241,0.26)_0%,rgba(79,70,229,0.18)_52%,rgba(15,23,42,0.96)_100%)] dark:text-indigo-100">
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.72),transparent_42%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(199,210,254,0.14),transparent_42%)]" />
      <svg
        viewBox="0 0 42 42"
        className="absolute inset-0 h-full w-full opacity-55 dark:opacity-45"
        aria-hidden="true"
      >
        <path
          d="M6 28.5H36"
          stroke="currentColor"
          strokeWidth="1"
          strokeOpacity="0.12"
        />
        <path
          d="M6 22.5H36"
          stroke="currentColor"
          strokeWidth="1"
          strokeOpacity="0.12"
        />
        <path
          d="M6 16.5H36"
          stroke="currentColor"
          strokeWidth="1"
          strokeOpacity="0.12"
        />
        <rect
          x="9"
          y="21"
          width="4"
          height="9"
          rx="1.5"
          fill="currentColor"
          fillOpacity="0.15"
        />
        <rect
          x="17"
          y="17"
          width="4"
          height="13"
          rx="1.5"
          fill="currentColor"
          fillOpacity="0.18"
        />
        <rect
          x="25"
          y="13"
          width="4"
          height="17"
          rx="1.5"
          fill="currentColor"
          fillOpacity="0.22"
        />
        <path
          d="M9 24.5L18 19.5L25.5 21L33 12.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity="0.7"
        />
        <circle cx="33" cy="12.5" r="2" fill="currentColor" fillOpacity="0.9" />
      </svg>
      <svg
        viewBox="0 0 24 24"
        className="relative z-10 h-[18px] w-[18px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M4 18h16" />
        <path d="M6.5 15.5 10 11l3 2.5 4.5-6" />
        <circle cx="17.5" cy="7.5" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    </div>
  );
}

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
        <AnalyticsLogoMark />
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
