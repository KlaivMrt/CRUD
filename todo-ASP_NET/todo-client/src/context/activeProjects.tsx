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
        setActiveProjects: (state, action: PayloadAction<ProjectModel[]>) =>{
            state.value = action.payload;
        },

        addActiveProject: (state, action: PayloadAction<ProjectModel>) =>{
            state.value.push(action.payload);
        },

        removeActiveProject: (state, action: PayloadAction<number>) =>{
            state.value.splice(action.payload, 1);
        }
    }
});

export const {setActiveProjects, addActiveProject, removeActiveProject} = activeProjects.actions;
export default activeProjects.reducer;