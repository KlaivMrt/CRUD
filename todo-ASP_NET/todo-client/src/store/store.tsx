import {configureStore} from "@reduxjs/toolkit";
import activeProjectsReducer from "../context/activeProjects";
import archivedProjectsReducer from "../context/archivedProjects";
import activeTasksReducer from "../context/activeTasks";
import completedTasksReducer from "../context/completedTasks";
import userReducer from "../context/user";
import completedProjectsReducer from "../context/completedProjects"

export const store = configureStore({
    reducer: {
        activeProjectsReducer,
        archivedProjectsReducer,
        completedProjectsReducer,
        activeTasksReducer,
        completedTasksReducer,
        userReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;