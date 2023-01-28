import { configureStore } from "@reduxjs/toolkit";
import Cart from "./Slice/CartSlice";
import Products from "./Slice/ProductSlice";
import User from "./Slice/UserSlice";

const store = configureStore({
    reducer:{Products, Cart,User},
})

export default store;