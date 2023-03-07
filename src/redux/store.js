import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../features/cartSlice";
import { productsApi } from "../features/productsApi";
import User from "./Slice/UserSlice";

const store = configureStore({
    reducer: { cartSlice, User ,
    [productsApi.reducerPath]: productsApi.reducer},
    
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productsApi.middleware)
    
})

export default store;