import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../features/cartSlice";
import { categoryApi } from "../features/categoryApi";
import { productsApi } from "../features/productsApi";
import User from "./Slice/UserSlice";

const store = configureStore({
    reducer: { cartSlice, User ,
    [productsApi.reducerPath]: productsApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer},
    
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productsApi.middleware, categoryApi.middleware)
    
})

export default store;