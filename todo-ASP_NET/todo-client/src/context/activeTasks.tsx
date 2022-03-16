import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TaskModel} from "../data/models"

interface IState{
    value: TaskModel[]
}

const initialState: IState = {
    value: []
}

const activeTasks = createSlice({
    name: "activeTasks",
    initialState,
    reducers: {
        addActiveTask: (state, action: PayloadAction<TaskModel>) => {
            state.value.push(action.payload);
        },

        removeActiveTask: (state, action: PayloadAction<number>) => {
            state.value.splice(action.payload, 1);
        }
    }
});

export const {addActiveTask, removeActiveTask} = activeTasks.actions;
export default activeTasks.reducer;