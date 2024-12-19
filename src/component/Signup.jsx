import axios from "axios";
import { useState } from "react";
import { REQUEST_URL } from "../utils/Constants";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [about, setAbout] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [skills, setSkills] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastData, setToastData] = useState("")
  async function handleSignUp() {
    try {
      await axios.post(
        REQUEST_URL + "signup",
        {
          firstName: firstName,
          lastName: lastName,
          emailId: emailId.toLowerCase(),
          password: password,
          gender: gender.toLowerCase(),
          about: about,
          photoURL: photoURL,
          skills: skills,
          age: age,
        },
        { withCredentials: true }
      );
      navigate("/feed");
    } catch (err) {
        console.log("data = ",err.response.data)
    if("email id already exist in DB" == err.response.data){
        setToastData("email id already exist in DB")
        setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 5000);
    }else{
        setToastData("Please Check and fill all the fields correctly")
        setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 5000);
    }
    console.log(err);
    }
  }
  return (
    <>
      {showToast && (
        <div
          className={"toast-center fixed right-0 animate-pulse ease-linear"}
        >
          <div className="alert alert-success">
            <span>{toastData}</span>
          </div>
        </div>
      )}
      <div className="flex flex-col w-screen h-full justify-center items-center ">
        <h1 className="my-2">𝓢𝓲𝓰𝓷𝓾𝓹!!!!</h1>
        <label className="input input-bordered flex items-center gap-2 my-2 min-w-96">
          First Name
          <input
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            type="text"
            className="grow "
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 my-2 min-w-96">
          Last Name
          <input
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            type="text"
            className="grow"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 my-2 min-w-96">
          Email
          <input
            value={emailId}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="Email"
            className="grow "
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 my-2 min-w-96">
          Password
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            className="grow"
          />
        </label>

        <select
        required
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="select select-bordered w-full max-w-xs my-2 min-w-96 "
        >
          <option selected disabled value="Gender">
            Gender
          </option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Others">Others</option>
        </select>
        <label className="form-control">
          <textarea
            value={about}
            onChange={(e) => {
              setAbout(e.target.value);
            }}
            className="textarea textarea-bordered h-24 my-2 min-w-96"
            placeholder="Bio"
          ></textarea>
          <div className="label"></div>
        </label>

        <label className="input input-bordered flex items-center gap-2 my-2 min-w-96">
          PictureURL
          <input
            value={photoURL}
            onChange={(e) => {
              setPhotoURL(e.target.value);
            }}
            type="text"
            className="grow"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 my-2 min-w-96">
          AGE
          <input
            value={age}
            onChange={(e) => {
              setAge(e.target.value);
            }}
            type="number"
            className="grow"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 my-2 min-w-96">
          Interest
          <input
            value={skills}
            onChange={(e) => {
              setSkills(e.target.value);
            }}
            type="text"
            className="grow"
          />
        </label>
        <button
          onClick={() => {
            handleSignUp();
          }}
          className="btn btn-wide my-2 min-w-96"
        >
          Signup
        </button>
        <Link to="/login">Already signup! Login</Link>
      </div>
    </>
  );
}
export default Signup;
