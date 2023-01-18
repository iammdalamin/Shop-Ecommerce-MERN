import { createSlice } from "@reduxjs/toolkit";

const ProductSlice = createSlice({
    name: "products",
    initialState: [],
    reducers: {
        SetProducts: (state, action) => {
            if (action.payload) {
                state.push(action.payload)
            }
        }
    }
})



export const { SetProducts } = ProductSlice.actions

export default ProductSlice.reducer