import axios from "axios";
import { useState } from "react";
import { REQUEST_URL } from "../utils/Constants";
import { useNavigate } from "react-router-dom";

function PasswordReset() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isError,setIsError] = useState(false)
  const [errorMessage,setErrorMessage] = useState("")
  const navigate= useNavigate()
  async function handleSubmit() {
    try{
    if(newPassword!==confirmNewPassword)
    {
        setIsError(true)
        setTimeout(()=>{
          setIsError(false)
        },4000)
        setErrorMessage("Please put the same password and confirm again")
        return
    }
    const data = await axios.put(
      REQUEST_URL + "profile/password",
      {
        currentPassword: oldPassword,
        newPassword: newPassword,
      },
      {
        withCredentials: true,
      }
    );
    alert(data.data)
    setIsError(true)
    setTimeout(()=>{
      setIsError(false)
    },4000)
    setErrorMessage(data.data)
    navigate("/Feed")
    }catch(err){
        setIsError(true)
        setTimeout(()=>{
          setIsError(false)
        },4000)
        setErrorMessage(err.response.data)
    }
  }
  return (
    <>
    {isError && (
        <div className="toast-top top-9 fixed animate-bounce">
          <div className="alert alert-error">
            <span>{errorMessage}</span>
          </div>
        </div>
      )}
      <div className="card card-side bg-base-300 shadow-xl">
        <div className="card-body flex justify-evenly">
          <label className="input input-bordered flex items-center gap-2">
            Old Password:
            <input
              type="text"
              onChange={(e) => setOldPassword(e.target.value)}
              value={oldPassword}
              className="grow"
              placeholder=""
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            New Password:
            <input
              type="text"
              className="grow"
              placeholder=""
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Confirm Password:
            <input
              type="text"
              className="grow"
              placeholder=""
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              value={confirmNewPassword}
            />
          </label>
          <button
            onClick={(e) => {
              handleSubmit(e);
            }}
            className="btn btn-wide bg-sky-500 color text-black hover:bg-sky-700 hover:text-white "
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}

export default PasswordReset;
