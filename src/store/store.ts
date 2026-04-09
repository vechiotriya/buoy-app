import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../services/authApi";
import authReducer from "./slices/authSlice";
import { userApi } from "../features/home/slices/api/userApi";
export const store=configureStore({
    reducer:{
        [authApi.reducerPath]:authApi.reducer,
        [userApi.reducerPath]:userApi.reducer,
        auth:authReducer
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(authApi.middleware,userApi.middleware)
})

export type RootState=ReturnType<typeof store.getState>;
export type AppDispatch=typeof store.dispatch;
