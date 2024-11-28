import { useDispatch, useSelector } from "react-redux";
import { removeUser, unAuthorizedUser } from "../redux/UserSlice";
import { Link, useNavigate } from "react-router-dom";
import { REQUEST_URL } from "../utils/Constants";
import axios from "axios";
import { playMusic, stopMusic } from "../redux/MusicSlice";

function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isUserLoggedIn = useSelector((store)=>store.user.credentialAvailable) 
  
  const musicPlaying = useSelector((store) => store.music.isPlaying);
  console.log("musicPlaying = " + musicPlaying);
  async function handleLogout() {
    await axios.get(REQUEST_URL + "logout", { withCredentials: true });
    dispatch(removeUser());
    dispatch(unAuthorizedUser())
    navigate("login");
  }
  return (
    <div className="navbar bg-base-300 top-0 w-screen">
      <div className="flex-1">
        <Link to={isUserLoggedIn?"feed":window.location.pathname} className="btn btn-ghost text-xl">
          ETinder
        </Link>
      </div>
      <button
        onClick={() => {
          musicPlaying ? dispatch(stopMusic()) : dispatch(playMusic());
        }}
      ></button>
      <div className="flex-none gap-2 mr-5">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full ">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          {isUserLoggedIn &&<ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            
            
            <li>
              <Link to="Profile" className="justify-between">
                Profile
              </Link>
            </li>
            <li>
              <Link to="Connections">Connections</Link>
            </li>
            <li>
              <Link to="Requests">Requests</Link>
            </li>
            <li>
              <a
                onClick={() => {
                  handleLogout();
                }}
              >
                Logout
              </a>
            </li>
          </ul>}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
