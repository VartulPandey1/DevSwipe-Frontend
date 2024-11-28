import { createSlice } from "@reduxjs/toolkit";


const requestSlice = createSlice({
    name:"request",
    initialState:{
        userData :[]
    },
    reducers:{
        setRequestUsers:(state, action)=>{
            state.userData = action.payload;
        },
        removeRequestUser:(state)=>{
            state.userData = state.userData.slice(1);
        }
    }
})

export const {setRequestUsers,removeRequestUser} = requestSlice.actions
export default requestSlice.reducer