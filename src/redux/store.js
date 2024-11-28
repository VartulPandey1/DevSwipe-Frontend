import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./UserSlice.js"
import feedSlice from "./FeedSlice.js"
import requestSlice from "./Request.js"
import musicSlice from "./MusicSlice.js"
const store= configureStore({
    reducer:{
        user: userSlice,
        feed: feedSlice,
        request: requestSlice,
        music : musicSlice
    }
})

export default store
