import { createSlice } from "@reduxjs/toolkit";

interface ErrorSchema {
    errorOccurence: boolean
}

const initialState: ErrorSchema = {
    errorOccurence: false 
}

const errorOccurenceSlice = createSlice({
    initialState,
    name: "errorOccured",
    reducers: {
        occured: (state) => {
            state.errorOccurence = true
        },
        stopped: (state) => {
            state.errorOccurence = false
        }
    }
})

export const { occured, stopped } = errorOccurenceSlice.actions
export default errorOccurenceSlice.reducer;