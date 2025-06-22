import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface PayloadSchema {
    fullname: string;
    password?: string;
    email: string;
}

interface InformationSchema <T>{
    userInfo: T
}

const initialState: InformationSchema<PayloadSchema> = {
    userInfo: {
        fullname: "",
        password: "",
        email: ""
    }
}

const informationSchema = createSlice({
    initialState,
    name: "usersInformation",
    reducers: {
        newInformation: (state, action: PayloadAction<PayloadSchema>) => {
            state.userInfo = action.payload
        }
    }
})

export const { newInformation } = informationSchema.actions;
export default informationSchema.reducer;
