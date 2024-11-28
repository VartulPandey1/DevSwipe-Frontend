import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"User",
    initialState:{
        items:null,
        credentialAvailable:false
    },
    reducers:{
        addUser :(state, action)=>{
            state.items = action.payload 
        },
        removeUser:(state)=>{
            state.items=null
        },
        authorizedUser:(state)=>{
            state.credentialAvailable = true
        },
        unAuthorizedUser:(state)=>{
            state.credentialAvailable = false
        }

    }
})

export const {addUser, removeUser,authorizedUser,unAuthorizedUser} = userSlice.actions
export default userSlice.reducer