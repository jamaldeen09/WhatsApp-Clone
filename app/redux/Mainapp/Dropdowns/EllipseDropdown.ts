import { configureStore, createSlice } from "@reduxjs/toolkit";

interface DropdownSchema {
    ellpiseDropdown: boolean
}

const initialState: DropdownSchema = {
    ellpiseDropdown: false
}

const ellipseDropdownSlice = createSlice({
    initialState,
    name: "ellipse",
    reducers: {
        triggerEllipse: (state) => {
            state.ellpiseDropdown = true
        },
        untriggerEllipse: (state) => {
            state.ellpiseDropdown = false
        }
    }
})

export const  { triggerEllipse,untriggerEllipse } = ellipseDropdownSlice.actions;
export default ellipseDropdownSlice.reducer;