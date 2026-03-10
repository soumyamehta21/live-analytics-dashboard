import { useState } from "react";
import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

type LayoutProps = {
  title: string;
  children: ReactNode;
  isDark: boolean;
  onToggleTheme: () => void;
};

export function Layout({
  title,
  children,
  isDark,
  onToggleTheme,
}: LayoutProps) {
  const [active, setActive] = useState("dashboard");

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Sidebar selectedKey={active} onSelect={setActive} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar title={title} isDark={isDark} onToggleTheme={onToggleTheme} />
        <main className="relative flex-1 overflow-y-auto bg-gradient-to-b from-slate-100 via-slate-50 to-white px-6 py-6 dark:bg-gradient-to-b dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
          {children}
        </main>
      </div>
    </div>
  );
}
