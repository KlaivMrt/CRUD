import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TaskModel} from "../data/models"

interface IState{
    value: TaskModel[]
}

const initialState: IState = {
    value: []
}

const completedTasks = createSlice({
    name: "completedTasks",
    initialState,
    reducers: {
        addCompletedTask: (state, action: PayloadAction<TaskModel>) => {
            state.value.push(action.payload);
        },

        removeCompletedTask: (state, action: PayloadAction<number>) => {
            state.value.splice(action.payload, 1);
        }
    }
});

export const {addCompletedTask, removeCompletedTask} = completedTasks.actions;
export default completedTasks.reducer;