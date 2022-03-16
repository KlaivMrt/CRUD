import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";
import {UserModel} from "../data/models"

interface IState{
    value: UserModel;
}

const initialState: IState = {
    value: {
        Id: -1,
        UserName: "None",
        UserPassword: "None",
        Email: "None",
        Jwt: "None"
    }
}

const user = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserModel>) => {
            state.value = action.payload;
        },

        removeUser: (state) => {
            state.value = initialState.value;
        }
    }
});

export const {setUser, removeUser} = user.actions;
export default user.reducer;