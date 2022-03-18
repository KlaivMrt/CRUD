import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ProjectModel} from "../data/models"

interface IState{
    value: ProjectModel[];
}

const initialState: IState = {
    value: []
}

const completedProjects = createSlice({
    name: "completedProjects",
    initialState,
    reducers: {
        setCompletedProjects: (state, action: PayloadAction<ProjectModel[]>) => {
            state.value = action.payload;
        },

        addCompletedProject: (state, action: PayloadAction<ProjectModel>) => {
            state.value.push(action.payload);
        },

        removeCompletedProjects: (state, action: PayloadAction<number>) => {
            state.value.splice(action.payload, 1);
        }
    }
});

export const {setCompletedProjects, addCompletedProject, removeCompletedProjects} = completedProjects.actions;
export default completedProjects.reducer;