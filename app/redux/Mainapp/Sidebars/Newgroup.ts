import { createSlice } from "@reduxjs/toolkit";

interface newGroupSchema {
    newGroup: boolean
}

const initialState: newGroupSchema = {
    newGroup: false
}

const newGroupSlice = createSlice({
    initialState,
    name: "newGroupAdd",
    reducers: {
        triggerNewGroup: (state) => {
            state.newGroup = true
        },
        untriggerNewGroup: (state) => {
            state.newGroup = false
        }
    }
})

export const { triggerNewGroup,untriggerNewGroup } = newGroupSlice.actions;
export default newGroupSlice.reducer;