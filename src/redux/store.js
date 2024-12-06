import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./UserSlice.js"
import feedSlice from "./FeedSlice.js"
import requestSlice from "./Request.js"
const store= configureStore({
    reducer:{
        user: userSlice,
        feed: feedSlice,
        request: requestSlice
    }
})

export default store
