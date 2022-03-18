import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UserModel} from "../data/models"

interface IState{
    value: UserModel;
}

const initialState: IState = {
    value: {
        id: -1,
        userName: "None",
        userPassword: "None",
        email: "None",
        jwt: "None"
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