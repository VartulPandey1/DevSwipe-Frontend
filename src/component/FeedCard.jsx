import axios from "axios";
import { REQUEST_URL } from "../utils/Constants";
import { useDispatch } from "react-redux";
import { removeFeedUser } from "../redux/FeedSlice";
import { useEffect, useState } from "react";

function FeedCard(pros) {
  const userData = pros.userData;
  const dispatch = useDispatch();
  const [transition, setTransition] = useState(false);
  async function handleClick(action, userId) {
    const data = REQUEST_URL + `request/send/${action}/${userId}`;
    console.log(data);
    await axios.post(
      REQUEST_URL + `request/send/${action}/${userId}`,
      {},
      { withCredentials: true }
    );
    dispatch(removeFeedUser());
  }

  useEffect(() => {
    setTimeout(()=>{
      setTransition(true);
    },100)
  }, []);

  return (
    <>
      {userData?._id ? ( <div className="bg-base-300 rounded-3xl h-3/4 w-1/3 relative">
        <figure className="h-full w-full ">
          <img
            className="object-cover object-center w-full h-full rounded-3xl"
            src={userData?.photoURL}
            alt="UserImage"
          ></img>
        </figure>
        <div className="absolute backdrop-blur-sm w-full h-1/6 bg-black/50  bottom-0 rounded-b-3xl">
          <div
            className={`{flex justify-center align-around ${
              transition
                ? "translate-x-10 transition-all duration-1000 ease-out"
                : "translate-x-full transition-all duration-1000 ease-out"
            } }`}
          >
            <h1 className="font-mono text-3xl">
              {userData?.firstName + " " + userData?.lastName}
            </h1>
          </div>
          <div
            className={`{flex justify-center align-around ${
              transition
                ? "translate-x-10 transition-all duration-1000 ease-out"
                : "translate-x-0 transition-all duration-1000 ease-out"
            } }`}
          >
            <h1 className="font-mono text-3xl">{userData?.age}</h1>
          </div>
        </div>
        <div className={`absolute rounded-full border-2 top-1/3 ${
              transition
                ? "-translate-x-40 translate-y-10"
                : "translate-y-0 -translate-x-40"
            }  transition-all duration-1000 ease-out`}>
          <button
            onClick={() => {
              handleClick("ignored", userData?._id);
            }}
            className="text-3xl rounded-full border-2"
          >
            ←
          </button>
        </div>
        <div className={`absolute rounded-full border-2 top-1/3 right-0 ${
              transition
                ? "translate-x-40 translate-y-10"
                : "translate-y-0 translate-x-40"
            }  transition-all duration-1000 ease-out`}>
          <button
                  onClick={() => {
                    handleClick("interested", userData?._id);
                  }}
                  className="text-3xl rounded-full border-2"
                >
                  →
                </button>
        </div>
      </div>): (<div>No user Left to Show!!!</div>)}
      {/* {userData?._id ? (
          <div className="card glass w-2/5 h-3/5">
            <figure>
              <img
                className="w-11/12 aspect-ratio: 20 / 9"
                src={userData?.photoURL}
                alt="UserImage"
              />
            </figure>
            <div className="card-body">
              <h1 className="card-title">
                {userData?.firstName + " " + userData?.lastName}
              </h1>
              <h2 className="card-title">{userData?.age}</h2>
              <h2 className="card-title">{userData?.gender}</h2>
              <h2 className="card-title">
                {userData?.skills.map((data) => {
                  return data;
                })}
              </h2>
              <p>{userData?.about}</p>
              <div className="card-actions justify-between">
                <button
                  onClick={() => {
                    handleClick("ignored", userData?._id);
                  }}
                  className="btn btn-outline btn-error"
                >
                  Ignore
                </button>
                <button
                  onClick={() => {
                    handleClick("interested", userData?._id);
                  }}
                  className="btn btn-outline btn-success"
                >
                  Interested
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div>No user Left to Show!!!</div>
        )} */}
    </>
  );
}

export default FeedCard;
