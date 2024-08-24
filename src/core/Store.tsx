import { configureStore } from "@reduxjs/toolkit";
import { useSelector ,useDispatch } from "react-redux";
import userReducer from "../components/auth/UserSlice";
import metricsReducer from "../components/apimetrics/MetricsSlice";

const store = configureStore({
    reducer:{
      user:userReducer,
      metrics :metricsReducer
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()