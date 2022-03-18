import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ProjectModel} from "../data/models"

interface IState{
    value: ProjectModel[];
}

const initialState: IState = {
    value: []
}

const archivedProjects = createSlice({
    name: "archivedProjects",
    initialState,
    reducers: {
        setArchivedProjects: (state, action: PayloadAction<ProjectModel[]>) =>{
            state.value = action.payload;
        },

        addArchivedProject: (state, action: PayloadAction<ProjectModel>) =>{
            state.value.push(action.payload);
        },

        removeArchivedProject: (state, action: PayloadAction<number>) =>{
            state.value.splice(action.payload, 1);
        }
    }
});

export const {setArchivedProjects, addArchivedProject, removeArchivedProject} = archivedProjects.actions;
export default archivedProjects.reducer;