import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTrafficPoint, setAnalytics } from "../redux/analyticsSlice";
import type { RootState } from "../redux/store";

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function randomDelta(scale: number) {
  return (Math.random() - 0.5) * 2 * scale;
}

export function useLiveAnalytics({ enabled }: { enabled: boolean }) {
  const dispatch = useDispatch();
  const current = useSelector((state: RootState) => state.analytics);
  const latest = useRef(current);
  const intervalRef = useRef<number | null>(null);
  const [running, setRunning] = useState(enabled);

  useEffect(() => {
    latest.current = current;
  }, [current]);

  useEffect(() => {
    setRunning(enabled);
  }, [enabled]);

  useEffect(() => {
    if (!running) return;

    intervalRef.current = window.setInterval(() => {
      const prev = latest.current;
      const visitors = Math.round(clamp(prev.visitors + randomDelta(20), 0, 1500));
      const revenue = Math.max(0, prev.revenue + randomDelta(50));
      const orders = Math.max(0, Math.round(prev.orders + randomDelta(3)));
      const conversionRate = clamp(Math.random() * 5 + 1, 0.2, 10);
      const avgSessionSeconds = clamp(prev.avgSessionSeconds + randomDelta(15), 30, 420);

      dispatch(
        setAnalytics({
          visitors,
          revenue,
          orders,
          conversionRate,
          avgSessionSeconds,
          lastUpdatedAt: Date.now(),
        })
      );

      dispatch(
        addTrafficPoint({
          timestamp: Date.now(),
          visitors,
          revenue,
        })
      );
    }, 2000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [dispatch, running]);

  return {
    running,
    setRunning,
  };
}
