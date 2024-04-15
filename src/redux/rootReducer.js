import { combineReducers } from "redux";

import settingsReducer from "./settingsReducer";

const rootReducer = combineReducers({
    // Define a top-level state field named `todos`, handled by `todosReducer`
    settings: settingsReducer,
});

export default rootReducer;
