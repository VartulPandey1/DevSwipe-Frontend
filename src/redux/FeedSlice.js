import { createSlice } from "@reduxjs/toolkit";


const feedSlice = createSlice({
    name:"feed",
    initialState:{
        userData :[]
    },
    reducers:{
        setFeedUsers:(state, action)=>{
            state.userData = action.payload;
        },
        removeFeedUser:(state)=>{
            state.userData = state.userData.slice(1);
        }
    }
})

export const {setFeedUsers,removeFeedUser} = feedSlice.actions
export default feedSlice.reducer