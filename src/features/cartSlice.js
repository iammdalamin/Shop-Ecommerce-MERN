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
        addToCart: (state, action)=> {
            const itemIndex = state.cartItems.findIndex(item => item._id === action.payload._id);
          
            if (itemIndex >= 0) {
                state.cartItems[itemIndex].cartQty += 1
                cogoToast.info("increased product quantity", {
                    position:"bottom-left"
                })
                if (state.cartItems[itemIndex].quantity < state.cartItems[itemIndex].cartQty) {
                    state.cartItems[itemIndex].cartQty = state.cartItems[itemIndex].quantity
                    cogoToast.info("Products Not Available Any More", {
                        position:"bottom-left"
                    })
               }
            } else {
                const tempProduct = {...action.payload, cartQty:1}
                state.cartItems.push(tempProduct)
                
                cogoToast.success("Added a new product!", {
                    position:"bottom-left"
                })
            }
            setCart(state.cartItems)
        },
        removeFromCart: (state, action)=> {
            console.log(action.payload);
            const nextCartItems = state.cartItems.filter((cartItem) => cartItem._id !== action.payload._id);
            state.cartItems = nextCartItems;
            setCart(state.cartItems);
            cogoToast.error("Products removed from cart", {
                position:"bottom-left"
            })
        },
        decreaseCart: (state, action) => {
            const itemIndex = state.cartItems.findIndex(item => item._id === action.payload._id);

            if (state.cartItems[itemIndex].cartQty > 1) {
                state.cartItems[itemIndex].cartQty -= 1;
                cogoToast.info("Decreased product quantity", {
                    position:"bottom-left"
                })
            } else if (state.cartItems[itemIndex].cartQty === 1) {
                const nextCartItems = state.cartItems.filter((item) => item._id !== action.payload._id);
                state.cartItems = nextCartItems;
                setCart(state.cartItems)
                cogoToast.error("Products removed from cart", {
                    position:"bottom-left"
                })
            }
        },
        clearCart: (state, action) => {
            state.cartItems = []
            setCart(state.cartItems)
            cogoToast.error("Cart items cleared", {
                position:"bottom-left"
            })
        },
        getTotal: (state, action) => {
            let { total, quantity } = state.cartItems.reduce((cartTotal, cartItem) => {
                const { price, cartQty } = cartItem;
                const itemTotal = price * cartQty;
                cartTotal.total += itemTotal;
                cartTotal.quantity += cartQty;
                return cartTotal;
            }, {
                total: 0,
                quantity: 0
            }
            );
            total = parseFloat(total.toFixed(2));
            state.cartTotalQty = quantity;
            state.cartTotalAmount = total;
        }
    }
})

export const { addToCart,removeFromCart,decreaseCart,clearCart,getTotal } = cartSlice.actions
export default cartSlice.reducer;