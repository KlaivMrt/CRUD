import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ProjectModel} from "../data/models"

interface IState{
    value: ProjectModel[];
}

const initialState: IState = {
    value: []
}

const activeProjects = createSlice({
    name: "activeProjects",
    initialState,
    reducers: {
        addActiveProject: (state, action: PayloadAction<ProjectModel>) =>{
            state.value.push(action.payload);
        },

        removeActiveProject: (state, action: PayloadAction<number>) =>{
            state.value.splice(action.payload, 1);
        }
    }
});

export const {addActiveProject, removeActiveProject} = activeProjects.actions;
export default activeProjects.reducer;