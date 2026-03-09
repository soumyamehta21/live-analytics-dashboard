import { createSlice } from "@reduxjs/toolkit"

const analyticsSlice = createSlice({
  name: "analytics",
  initialState: {
    visitors: 0,
    revenue: 0,
    users: 0,
    traffic: []
  },
  reducers: {
    updateAnalytics: (state, action) => {
      return { ...state, ...action.payload }
    }
  }
})

export const { updateAnalytics } = analyticsSlice.actions
export default analyticsSlice.reducer