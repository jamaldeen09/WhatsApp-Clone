import { createSlice } from "@reduxjs/toolkit";

interface AddSidebarSchema {
    addSidebar: boolean
}

const initialState: AddSidebarSchema = {
    addSidebar: false
}

const addSidebarSlice = createSlice({
    initialState,
    name: "sidebarAdd",
    reducers: {
        triggerAddSideBar: (state) => {
            state.addSidebar = true
        },
        untriggerAddSideBar: (state) => {
            state.addSidebar = false
        }
    }
})

export const { triggerAddSideBar,untriggerAddSideBar } = addSidebarSlice.actions;
export default addSidebarSlice.reducer;