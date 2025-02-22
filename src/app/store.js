import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "../features/searchSlice";
import themeReducer from "../features/themeSlice";
import usersReducer from "../features/usersSlice";

export const store = configureStore({
    reducer: {
        search: searchReducer,
        theme: themeReducer,
        users: usersReducer,
    }


})