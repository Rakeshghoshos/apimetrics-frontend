import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from "@reduxjs/toolkit";
import metrics from './MetricsApi';

type metricsState= {
  metrics:any,
  error:any,
  status: string | null
}

type attributes={
  emailId?:string,
  password?:string,
    token?:string
}

const initialState: metricsState = {
  metrics: [],
  error: null,
  status: null,
};

type getUserResponse = Awaited<ReturnType<typeof metrics.metricsApi>>;

export const fetchMetricsAsync = createAsyncThunk<
getUserResponse,
  attributes,
  { rejectValue: string }
>('metrics/fetchMetrics', async ({}, { rejectWithValue }) => {
  try {
      const response = await metrics.metricsApi(1);
      return response.data;
  } catch (error: any) {
      return rejectWithValue(error.message);
  }
});

export const metricSlice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
        .addCase(fetchMetricsAsync.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchMetricsAsync.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.metrics = action.payload;
        })
        .addCase(fetchMetricsAsync.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        })      
},
})

export const { } = metricSlice.actions

export default metricSlice.reducer