import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useEffect } from "react";
import axios from "axios";
import { REQUEST_URL } from "../utils/Constants";
import { useDispatch } from "react-redux";
import { addUser, authorizedUser } from "../redux/UserSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function getUser() {
    try {
      const data = await axios.get(REQUEST_URL + "profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(data.data));
      dispatch(authorizedUser())
    } catch (err) {
      console.log(err);
      navigate("login");
    }
  }

  useEffect(() => {
    getUser();
  },[]);

  return (
    <div className="h-full flex flex-col justify-between items-center">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};
export default Body;
