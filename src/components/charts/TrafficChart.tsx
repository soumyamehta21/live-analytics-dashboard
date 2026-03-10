import { useTranslation } from "react-i18next";
import type { TrafficPoint } from "../../redux/analyticsSlice";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type TrafficChartProps = {
  data: TrafficPoint[];
  title: string;
  isDark: boolean;
};

function formatTime(timestamp: number, locale: string) {
  return new Date(timestamp).toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function formatCompactNumber(value: number, locale: string) {
  return new Intl.NumberFormat(locale, {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export function TrafficChart({ data, title, isDark }: TrafficChartProps) {
  const { t, i18n } = useTranslation();
  const locale = i18n.resolvedLanguage ?? i18n.language;
  const latest = data[data.length - 1];
  const peakVisitors = data.reduce(
    (max, point) => Math.max(max, point.visitors),
    0,
  );
  const palette = isDark
    ? {
        grid: "#334155",
        tick: "#94a3b8",
        tooltipBorder: "#1e293b",
        tooltipBg: "#020617",
        tooltipItem: "#e2e8f0",
        tooltipLabel: "#94a3b8",
        activeStroke: "#0f172a",
        gridOpacity: 0.14,
      }
    : {
        grid: "#cbd5e1",
        tick: "#64748b",
        tooltipBorder: "#e2e8f0",
        tooltipBg: "#ffffff",
        tooltipItem: "#0f172a",
        tooltipLabel: "#64748b",
        activeStroke: "#ffffff",
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
            {t("trafficChartDescription")}
          </p>
        </div>
        <div className="flex gap-2 text-xs">
          <span className="rounded-full bg-indigo-50 px-3 py-1 font-medium text-indigo-700 ring-1 ring-indigo-100 dark:bg-indigo-500/10 dark:text-indigo-200 dark:ring-0">
            {t("chartNow")}{" "}
            {latest ? formatCompactNumber(latest.visitors, locale) : "0"}
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-700 ring-1 ring-slate-200 dark:bg-slate-700/60 dark:text-slate-200 dark:ring-0">
            {t("chartPeak")} {formatCompactNumber(peakVisitors, locale)}
          </span>
        </div>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
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
                formatCompactNumber(value, locale)
              }
              tick={{ fill: palette.tick, fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              width={52}
            />
            <Tooltip
              labelFormatter={(label) => formatTime(Number(label), locale)}
              formatter={(value) => [
                formatCompactNumber(Number(value), locale),
                t("visitors"),
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
            <Line
              type="monotone"
              dataKey="visitors"
              stroke="#6366f1"
              strokeWidth={3}
              dot={false}
              activeDot={{
                r: 5,
                fill: "#818cf8",
                stroke: palette.activeStroke,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
