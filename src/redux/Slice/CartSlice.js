import { createSlice } from "@reduxjs/toolkit";


const CartSlice = createSlice({
    name: "cart",
    initialState: [],
    reducers: {
        AddCart: (state, action) => {
            if (action.payload) {
                state.push(action.payload)
            }
        }
    }
})


export const { AddCart } = CartSlice.actions

export default CartSlice.reducer