import { FaChartLine, FaCoins, FaShoppingCart, FaUsers } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Layout } from "../components/layout/Layout";
import { MetricCard } from "../components/dashboard/MetricCard";
import { LiveControls } from "../components/dashboard/LiveControls";
import { RecentActivityTable } from "../components/dashboard/RecentActivityTable";
import { RevenueChart } from "../components/charts/RevenueChart";
import { TrafficChart } from "../components/charts/TrafficChart";
import { useLiveAnalytics } from "../hooks/useLiveAnalytics";
import type { RootState } from "../redux/store";

type DashboardPageProps = {
  isDark: boolean;
  onToggleTheme: () => void;
};

export function DashboardPage({ isDark, onToggleTheme }: DashboardPageProps) {
  const { t } = useTranslation();
  const analytics = useSelector((state: RootState) => state.analytics);
  const { running, setRunning } = useLiveAnalytics({ enabled: true });

  return (
    <Layout
      title={t("dashboard")}
      isDark={isDark}
      onToggleTheme={onToggleTheme}
    >
      <div className="mx-auto flex w-full flex-col gap-6">
        <LiveControls
          running={running}
          onToggle={() => setRunning((prev) => !prev)}
        />

        <section className="grid gap-4 lg:grid-cols-4">
          <MetricCard
            title={t("activeVisitors")}
            value={analytics.visitors.toFixed(0)}
            subtitle={t("liveUsers")}
            icon={<FaUsers />}
            variant="primary"
          />
          <MetricCard
            title={t("revenue")}
            value={`$${analytics.revenue.toFixed(2)}`}
            subtitle={t("grossRevenue")}
            icon={<FaCoins />}
            variant="success"
          />
          <MetricCard
            title={t("orders")}
            value={analytics.orders}
            subtitle={t("completedConversions")}
            icon={<FaShoppingCart />}
            variant="warning"
          />
          <MetricCard
            title={t("conversionRate")}
            value={`${analytics.conversionRate.toFixed(2)}%`}
            subtitle={t("visitsToOrders")}
            icon={<FaChartLine />}
            variant="neutral"
          />
        </section>

        <div className="grid gap-4 lg:grid-cols-2">
          <TrafficChart
            data={analytics.traffic}
            title={t("activeVisitors")}
            isDark={isDark}
          />
          <RevenueChart
            data={analytics.traffic}
            title={t("revenue")}
            isDark={isDark}
          />
        </div>

        <RecentActivityTable data={analytics.traffic} />
      </div>
    </Layout>
  );
}
