import { createSlice } from "@reduxjs/toolkit";
import cogoToast from "cogo-toast";
import { getCart, setCart } from "../helpers/SessionHelper";

const initialState = {
    cartItems: getCart("cart")?getCart("cart"):[],
    cartTotalQty: 0,
    cartTotalAmount:0
}
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action) {
            const itemIndex = state.cartItems.findIndex(item => item._id === action.payload._id);
            if (itemIndex >= 0) {
                state.cartItems[itemIndex].cartQty += 1
                cogoToast.info("increased product quantity", {
                    position:"bottom-left"
                })
            } else {
                const tempProduct = {...action.payload, cartQty:1}
                state.cartItems.push(tempProduct)
                cogoToast.success("Added a new product!", {
                    position:"bottom-left"
                })
            }
            setCart(state.cartItems)
        }
    }
})

export const { addToCart } = cartSlice.actions
export default cartSlice.reducer;