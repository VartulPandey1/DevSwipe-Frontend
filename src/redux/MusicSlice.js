import { createSlice } from "@reduxjs/toolkit";


const musicSlice = createSlice({
    name:"music",
    initialState:{
        isPlaying :false
    },
    reducers:{
        playMusic:(state)=>{
            state.isPlaying = true;
        },
        stopMusic:(state)=>{
            state.isPlaying = false;
        }
    }
})

export const {playMusic,stopMusic} = musicSlice.actions
export default musicSlice.reducer