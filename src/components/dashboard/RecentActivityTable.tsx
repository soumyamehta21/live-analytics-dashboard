import { useMemo, useState } from "react";
import type { TrafficPoint } from "../../redux/analyticsSlice";

type RecentActivityTableProps = {
  data: TrafficPoint[];
};

type ActivityRow = {
  id: string;
  user: string;
  action: string;
  date: string;
  amount: string;
  timestamp: number;
  amountValue: number;
};

type SortKey = "user" | "action" | "date" | "amount";
type SortDirection = "asc" | "desc";

const ROWS_PER_PAGE = 6;

function formatCurrency(value: number) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
}

function deriveAmount(point: TrafficPoint, index: number) {
  const baseline = point.revenue / Math.max(point.visitors, 1);
  return baseline * 3 + 24 + index * 4.5;
}

export function RecentActivityTable({ data }: RecentActivityTableProps) {
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const rows: ActivityRow[] = useMemo(
    () =>
      [...data].reverse().map((point, index) => {
        const amountValue = deriveAmount(point, index);

        return {
          id: `${point.timestamp}`,
          user: ["Ava", "Noah", "Mia", "Ethan", "Liam", "Emma"][index % 6],
          action: [
            "Purchase",
            "Subscription",
            "Refund",
            "Upgrade",
            "Trial",
            "Purchase",
          ][index % 6],
          date: new Date(point.timestamp).toLocaleString(undefined, {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
          amount: formatCurrency(amountValue),
          timestamp: point.timestamp,
          amountValue,
        };
      }),
    [data],
  );

  const sortedRows = useMemo(() => {
    const nextRows = [...rows];

    nextRows.sort((left, right) => {
      let comparison = 0;

      switch (sortKey) {
        case "user":
          comparison = left.user.localeCompare(right.user);
          break;
        case "action":
          comparison = left.action.localeCompare(right.action);
          break;
        case "date":
          comparison = left.timestamp - right.timestamp;
          break;
        case "amount":
          comparison = left.amountValue - right.amountValue;
          break;
      }

      return sortDirection === "asc" ? comparison : -comparison;
    });

    return nextRows;
  }, [rows, sortDirection, sortKey]);

  const totalPages = Math.max(1, Math.ceil(sortedRows.length / ROWS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);

  const paginatedRows = useMemo(() => {
    const start = (currentPage - 1) * ROWS_PER_PAGE;
    return sortedRows.slice(start, start + ROWS_PER_PAGE);
  }, [currentPage, sortedRows]);

  const pageNumbers = useMemo(
    () => Array.from({ length: totalPages }, (_, index) => index + 1),
    [totalPages],
  );

  const visibleStart =
    sortedRows.length === 0 ? 0 : (currentPage - 1) * ROWS_PER_PAGE + 1;
  const visibleEnd = Math.min(currentPage * ROWS_PER_PAGE, sortedRows.length);

  const handleSort = (key: SortKey) => {
    setPage(1);

    if (sortKey === key) {
      setSortDirection((currentDirection) =>
        currentDirection === "asc" ? "desc" : "asc",
      );
      return;
    }

    setSortKey(key);
    setSortDirection(key === "date" || key === "amount" ? "desc" : "asc");
  };

  const renderSortIndicator = (key: SortKey) => {
    const isActive = sortKey === key;

    if (isActive) {
      return (
        <span className="inline-flex h-4 min-w-4 items-center justify-center text-[11px] text-indigo-600 dark:text-indigo-300">
          {sortDirection === "asc" ? "↑" : "↓"}
        </span>
      );
    }

    return (
      <span className="inline-flex min-w-4 items-center justify-center gap-px text-[10px] leading-none text-slate-400 opacity-0 transition-opacity group-hover:opacity-100 dark:text-slate-500">
        <span>↑</span>
        <span>↓</span>
      </span>
    );
  };

  return (
    <div className="rounded-2xl border border-white/80 bg-white/95 p-4 shadow-[0_20px_40px_-28px_rgba(15,23,42,0.35)] dark:border-slate-800 dark:bg-slate-900 dark:shadow-none">
      <div className="mb-4">
        <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
          Recent activity
        </h2>
        <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
          Latest transactions and conversions.
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200/80 bg-white/70 dark:border-slate-800 dark:bg-slate-950/40">
        <table className="w-full min-w-[600px] table-auto border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/90 dark:border-slate-800 dark:bg-slate-800/50">
              <th
                aria-sort={
                  sortKey === "user"
                    ? sortDirection === "asc"
                      ? "ascending"
                      : "descending"
                    : "none"
                }
                className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400"
              >
                <button
                  type="button"
                  onClick={() => handleSort("user")}
                  className="group inline-flex items-center gap-1.5 transition-colors hover:text-indigo-600 dark:hover:text-indigo-300"
                >
                  <span>User</span>
                  {renderSortIndicator("user")}
                </button>
              </th>
              <th
                aria-sort={
                  sortKey === "action"
                    ? sortDirection === "asc"
                      ? "ascending"
                      : "descending"
                    : "none"
                }
                className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400"
              >
                <button
                  type="button"
                  onClick={() => handleSort("action")}
                  className="group inline-flex items-center gap-1.5 transition-colors hover:text-indigo-600 dark:hover:text-indigo-300"
                >
                  <span>Action</span>
                  {renderSortIndicator("action")}
                </button>
              </th>
              <th
                aria-sort={
                  sortKey === "date"
                    ? sortDirection === "asc"
                      ? "ascending"
                      : "descending"
                    : "none"
                }
                className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400"
              >
                <button
                  type="button"
                  onClick={() => handleSort("date")}
                  className="group inline-flex items-center gap-1.5 transition-colors hover:text-indigo-600 dark:hover:text-indigo-300"
                >
                  <span>Date</span>
                  {renderSortIndicator("date")}
                </button>
              </th>
              <th
                aria-sort={
                  sortKey === "amount"
                    ? sortDirection === "asc"
                      ? "ascending"
                      : "descending"
                    : "none"
                }
                className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400"
              >
                <button
                  type="button"
                  onClick={() => handleSort("amount")}
                  className="group inline-flex items-center gap-1.5 transition-colors hover:text-indigo-600 dark:hover:text-indigo-300"
                >
                  <span>Amount</span>
                  {renderSortIndicator("amount")}
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedRows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-slate-100 transition-colors last:border-0 hover:bg-indigo-50/40 dark:border-slate-800 dark:hover:bg-slate-800/60"
              >
                <td className="px-4 py-3 text-sm text-slate-900 dark:text-slate-100">
                  {row.user}
                </td>
                <td className="px-4 py-3 text-sm text-slate-700 dark:text-slate-300">
                  {row.action}
                </td>
                <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">
                  {row.date}
                </td>
                <td className="px-4 py-3 text-left text-sm text-slate-900 dark:text-slate-100">
                  {row.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Showing {visibleStart}-{visibleEnd} of {sortedRows.length} entries
        </p>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() =>
              setPage((current) =>
                Math.max(1, Math.min(current, totalPages) - 1),
              )
            }
            disabled={currentPage === 1}
            className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:bg-slate-700 dark:hover:text-white"
          >
            Previous
          </button>

          {pageNumbers.map((pageNumber) => {
            const isActive = pageNumber === currentPage;

            return (
              <button
                key={pageNumber}
                type="button"
                onClick={() => setPage(pageNumber)}
                className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border text-sm font-semibold transition-colors ${
                  isActive
                    ? "border-indigo-500 bg-indigo-500 text-white shadow-sm shadow-indigo-500/25 dark:border-indigo-400 dark:bg-indigo-400 dark:text-slate-950 dark:shadow-none"
                    : "border-slate-200 bg-white text-slate-600 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:bg-slate-700 dark:hover:text-white"
                }`}
              >
                {pageNumber}
              </button>
            );
          })}

          <button
            type="button"
            onClick={() =>
              setPage((current) =>
                Math.min(totalPages, Math.min(current, totalPages) + 1),
              )
            }
            disabled={currentPage === totalPages}
            className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:bg-slate-700 dark:hover:text-white"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
