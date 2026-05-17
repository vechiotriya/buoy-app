import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../services/authApi";
import authReducer from "./slices/authSlice";
import { userApi } from "../services/userApi";
import { transactionApi } from "../services/transactionApi";
import { categoryApi } from "../services/categoryApi";
export const store=configureStore({
    reducer:{
        [authApi.reducerPath]:authApi.reducer,
        [userApi.reducerPath]:userApi.reducer,
        [transactionApi.reducerPath]:transactionApi.reducer,
        [categoryApi.reducerPath]:categoryApi.reducer,
        auth:authReducer
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(authApi.middleware,userApi.middleware,transactionApi.middleware,categoryApi.middleware),
})

export type RootState=ReturnType<typeof store.getState>;
export type AppDispatch=typeof store.dispatch;
