import {configureStore} from "@reduxjs/toolkit";
import activeProjectsReducer from "../context/activeProjects";
import archivedProjectsReducer from "../context/archivedProjects";
import activeTaskReducer from "../context/activeTasks";
import completedTaskReducer from "../context/completedTasks";
import userReducer from "../context/user"

export const store = configureStore({
    reducer: {
        activeProjectsReducer,
        archivedProjectsReducer,
        activeTaskReducer,
        completedTaskReducer,
        userReducer
    }
});
