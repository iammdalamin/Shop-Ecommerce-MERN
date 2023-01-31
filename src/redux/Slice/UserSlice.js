import { createSlice } from "@reduxjs/toolkit";


const UserSlice = createSlice({
    name: "user",
    initialState: [],
    reducers: {
        SetUser: (state, action) => {
            if (action.payload) {
                state.push(action.payload)
            }
        }
    }
})


export const { SetUser } = UserSlice.actions

export default UserSlice.reducer