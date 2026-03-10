import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type TrafficPoint = {
  timestamp: number;
  visitors: number;
  revenue: number;
};

export type AnalyticsState = {
  visitors: number;
  revenue: number;
  orders: number;
  conversionRate: number;
  avgSessionSeconds: number;
  lastUpdatedAt: number;
  traffic: TrafficPoint[];
};

function createInitialTraffic(): TrafficPoint[] {
  const now = Date.now();

  return Array.from({ length: 18 }, (_, index) => {
    const progress = index / 17;
    const visitors = Math.round(420 + progress * 110 + Math.sin(index / 2) * 28);
    const revenue = Number((11850 + progress * 760 + Math.cos(index / 3) * 42).toFixed(2));

    return {
      timestamp: now - (17 - index) * 2000,
      visitors,
      revenue,
    };
  });
}

const initialTraffic = createInitialTraffic();
const latestPoint = initialTraffic[initialTraffic.length - 1];

const initialState: AnalyticsState = {
  visitors: latestPoint?.visitors ?? 510,
  revenue: latestPoint?.revenue ?? 12580.48,
  orders: 286,
  conversionRate: 3.84,
  avgSessionSeconds: 214,
  lastUpdatedAt: latestPoint?.timestamp ?? Date.now(),
  traffic: initialTraffic,
};

const analyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {
    setAnalytics: (state, action: PayloadAction<Partial<AnalyticsState>>) => {
      return { ...state, ...action.payload };
    },
    addTrafficPoint: (state, action: PayloadAction<TrafficPoint>) => {
      state.traffic = [...state.traffic, action.payload].slice(-30);
    },
  },
});

export const { setAnalytics, addTrafficPoint } = analyticsSlice.actions;
export default analyticsSlice.reducer;
