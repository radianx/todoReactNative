import { configureStore } from "@reduxjs/toolkit";

import settingsReducer from "./settingsReducer";

const store = configureStore({
    reducer: {
        // Define a top-level state field named `todos`, handled by `todosReducer`
        settings: settingsReducer,
    },
});

export default store;
