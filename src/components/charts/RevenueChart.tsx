import { useTranslation } from "react-i18next";
import type { TrafficPoint } from "../../redux/analyticsSlice";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type RevenueChartProps = {
  data: TrafficPoint[];
  title: string;
  isDark: boolean;
};

const Y_AXIS_CURRENCY_LOCALE = "en-US";

function formatTime(timestamp: number, locale: string) {
  return new Date(timestamp).toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function formatCurrency(value: number, locale: string) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: value >= 1000 ? 0 : 2,
  }).format(value);
}

export function RevenueChart({ data, title, isDark }: RevenueChartProps) {
  const { t, i18n } = useTranslation();
  const locale = i18n.resolvedLanguage ?? i18n.language;
  const latest = data[data.length - 1]?.revenue ?? 0;
  const previous = data[0]?.revenue ?? 0;
  const change = latest - previous;
  const palette = isDark
    ? {
        grid: "#334155",
        tick: "#94a3b8",
        tooltipBorder: "#1e293b",
        tooltipBg: "#020617",
        tooltipItem: "#e2e8f0",
        tooltipLabel: "#94a3b8",
        gridOpacity: 0.14,
      }
    : {
        grid: "#cbd5e1",
        tick: "#64748b",
        tooltipBorder: "#e2e8f0",
        tooltipBg: "#ffffff",
        tooltipItem: "#0f172a",
        tooltipLabel: "#64748b",
        gridOpacity: 0.65,
      };

  return (
    <section className="rounded-2xl border border-white/80 bg-white/95 p-4 shadow-[0_20px_40px_-28px_rgba(15,23,42,0.35)] dark:border-slate-800 dark:bg-slate-900 dark:shadow-none">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            {title}
          </h2>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {t("revenueChartDescription")}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            {formatCurrency(latest, locale)}
          </p>
          <p
            className={`text-xs font-medium ${
              change >= 0
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-rose-600 dark:text-rose-400"
            }`}
          >
            {change >= 0 ? "+" : ""}
            {formatCurrency(change, locale)} {t("vsFirstSample")}
          </p>
        </div>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 8, right: 8, left: -12, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={palette.grid}
              opacity={palette.gridOpacity}
            />
            <XAxis
              dataKey="timestamp"
              tickFormatter={(value: number) => formatTime(value, locale)}
              minTickGap={24}
              tick={{ fill: palette.tick, fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tickFormatter={(value: number) =>
                formatCurrency(value, Y_AXIS_CURRENCY_LOCALE)
              }
              tick={{ fill: palette.tick, fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              width={76}
            />
            <Tooltip
              cursor={false}
              labelFormatter={(label) => formatTime(Number(label), locale)}
              formatter={(value) => [
                formatCurrency(Number(value), locale),
                t("revenueLabel"),
              ]}
              contentStyle={{
                borderRadius: 12,
                border: `1px solid ${palette.tooltipBorder}`,
                backgroundColor: palette.tooltipBg,
                boxShadow: isDark
                  ? "0 16px 40px rgba(2, 6, 23, 0.35)"
                  : "0 16px 30px rgba(148, 163, 184, 0.18)",
              }}
              itemStyle={{ color: palette.tooltipItem }}
              labelStyle={{ color: palette.tooltipLabel }}
            />
            <Bar
              dataKey="revenue"
              radius={[8, 8, 0, 0]}
              fill="#10b981"
              maxBarSize={26}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
