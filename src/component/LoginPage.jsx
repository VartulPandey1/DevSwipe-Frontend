import axios from "axios";
import { loginPageQuotes } from "../utils/Constants";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/UserSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import { REQUEST_URL } from "../utils/Constants";
function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorLogin,setErrorLogin] = useState(false)
  const { toastData } = useParams();

  if (toastData) {
    console.log(toastData);
  }

  async function signUpButtonClicked(event) {
    try {
      event.preventDefault();
      
      const data = await axios.post(
        REQUEST_URL + "login",
        {
          emailId: email.toLowerCase(),
          password: password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(data.data));
      navigate("/Feed");
    } catch (err) {
      setErrorLogin(true)
      console.log(err);
    }
  }
  return (
    <div className="hero bg-base-100  h-full w-full w-screen">
      <div className="hero-content bg-base-300 flex-col lg:flex-row-reverse rounded-lg w-1/2">
        <div className="text-center lg:text-left w-1/2">
          <h1 className="text-5xl font-bold">Log in now!</h1>
          <p className="py-6">
            {loginPageQuotes[Math.floor(Math.random()*loginPageQuotes.length)]}
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl w-1/2">
          <form className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered input-primary w-full max-w-xs"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="input input-bordered input-primary w-full max-w-xs"
              />
              <label className="label">
                <Link to="/Signup">New User? Signup</Link>
              </label>
            </div>
            <div className="form-control mt-6">
            {errorLogin ?<label className="text-red-600 py-2">Email Id or Password is incorrect</label>:<label className="text-base-100 py-2">.</label>}
              <button
                onClick={(event) => signUpButtonClicked(event)}
                className="btn btn-primary"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
