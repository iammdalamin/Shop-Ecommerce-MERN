import { configureStore } from "@reduxjs/toolkit";
import Products from "./Slice/ProductSlice";
import Cart from "./Slice/CartSlice";

const store = configureStore({
    reducer:{Products, Cart},
})

export default store;