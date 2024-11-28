import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { REQUEST_URL } from "../utils/Constants";
import { setFeedUsers } from "../redux/FeedSlice";
import { useEffect } from "react";
import FeedCard from "./FeedCard";

function Feed() {
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.feed.userData)?.[0];

  async function getUserFeedData() {
    try {
      const userFeedData = await axios.get(REQUEST_URL + "user/feed", {
        withCredentials: true,
      });
      dispatch(setFeedUsers(userFeedData.data));
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getUserFeedData();
  }, []);

  return (
    <>
      <FeedCard userData={userData} />
    </>
  );
}

export default Feed;
