import axios from "axios";
import { useEffect, useState } from "react";
import { REQUEST_URL } from "../utils/Constants";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [photoURL, setphotoURL] = useState("");
  const [age, setAge] = useState("");
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showUnSuccessToast, setShowUnSuccessToast] = useState(false);
 
  const musicPlaying = useSelector((store)=>store.music.isPlaying)

  
  async function getUserDetail() {
    const userDetail = await axios.get(REQUEST_URL + "profile/view", {
      withCredentials: true,
    });
    setFirstName(userDetail.data.firstName);
    setLastName(userDetail.data.lastName);
    setphotoURL(userDetail.data.photoURL);
    setAge(userDetail.data.age);
  }
  const audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
  
  console.log("musicPlayingss = "+ musicPlaying)
  if(!musicPlaying)
  {
    if (audio) {
      try{
      audio.pause();
      audio.currentTime = 0;
      }catch(err){
        console.log(err)
      }
    }
  }else{
    audio.play()
    setTimeout(()=>{
      audio.pause()
    },5000)
    // .catch((error) => {
    //   console.error('Audio playback failed:', error);
    // });
  }
  async function handleSubmit() {
    const result = await axios.put(
      REQUEST_URL + "profile/edit",
      {
        firstName: firstName,
        lastName: lastName,
        photoURL: photoURL,
        age: age,
      },
      { withCredentials: true }
    );

    if (result.status == 200) {
      setShowSuccessToast(true);
      setTimeout(() => {
        setShowSuccessToast(false);
      }, 5000);
    } else {
        setShowUnSuccessToast(true);
      setTimeout(() => {
        setShowUnSuccessToast(false);
      }, 5000);
    }
  }
  
  useEffect(() => {
    getUserDetail();

  }, []);
  return (
    <>
      {showSuccessToast && (
        <div className="toast-top top-9 fixed animate-bounce">
          <div className="alert alert-success">
            <span>Data Submitted Successfully</span>
          </div>
        </div>
      )}
      {showUnSuccessToast && (
        <div className="toast-top top-9 fixed animate-bounce">
          <div className="alert alert-success">
            <span>Data Not Submitted Successfully</span>
          </div>
        </div>
      )}
      <div className="card card-side bg-base-300 shadow-xl">
        <figure className="artboard phone-3 rounded">
          <img
            className="object-cover rounded-3xl"
            src={photoURL}
            alt="UserPhoto"
          />
        </figure>
        <div className="card-body flex justify-evenly">
          <label className="input input-bordered flex items-center gap-2">
            FirstName
            <input
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              className="grow"
              placeholder=""
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Last Name
            <input
              type="text"
              className="grow"
              placeholder=""
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Photo URL
            <input
              type="text"
              className="grow"
              placeholder=""
              onChange={(e) => setphotoURL(e.target.value)}
              value={photoURL}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Age
            <input
              type="text"
              className="grow"
              placeholder=""
              onChange={(e) => setAge(e.target.value)}
              value={age}
            />
          </label>
          <button
            onClick={(e) => {
              handleSubmit(e);
            }}
            className="btn btn-wide"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
