import { configureStore } from "@reduxjs/toolkit"
import errorOccurenceSlice from "./Authentication/Error"
import errorMessageSlice from "./Authentication/ErrorMessage"
import informationSchema from "./Mainapp/Information"
import ellipseDropdownSlice from "./Mainapp/Dropdowns/EllipseDropdown"
import addSidebarSlice from "./Mainapp/Sidebars/AddSidebar"
import  newGroupSlice from "./Mainapp/Sidebars/Newgroup"

const store = configureStore({
    reducer: {
        // Slices goes here
        errorOccured: errorOccurenceSlice,
        errorMsg: errorMessageSlice,
        usersInformation: informationSchema,
        ellipse: ellipseDropdownSlice,
        sidebarAdd: addSidebarSlice,
        newGroupAdd: newGroupSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store