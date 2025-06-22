import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ErrorMessageSchema {
    errorMessage: string
}

const initialState: ErrorMessageSchema = {
    errorMessage: ""
}

const errorMessageSlice = createSlice({
    initialState,
    name: "errorMsg",
    reducers: {
        newErrorMsg: (state, action: PayloadAction<string>) => {
            state.errorMessage = action.payload
        },
        refreshError: (state) => {
            state.errorMessage = ""
        }
    }
})

export const { newErrorMsg ,refreshError } = errorMessageSlice.actions;
export default errorMessageSlice.reducer;