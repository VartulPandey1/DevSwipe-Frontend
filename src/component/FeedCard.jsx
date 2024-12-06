import axios from "axios";
import { REQUEST_URL } from "../utils/Constants";
import { useDispatch } from "react-redux";
import { removeFeedUser } from "../redux/FeedSlice";
import { useEffect, useState } from "react";

function FeedCard(pros) {
  const userData = pros.userData;
  const dispatch = useDispatch();
  const [transition, setTransition] = useState(false);
  const [rotated, setRotated] = useState(false);
  async function handleClick(action, userId) {
    await axios.post(
      REQUEST_URL + `request/send/${action}/${userId}`,
      {},
      { withCredentials: true }
    );
    dispatch(removeFeedUser());
  }

  function cardClicked() {
    setRotated(!rotated);
  }
  useEffect(() => {
    setTimeout(() => {
      setTransition(true);
    }, 100);
  }, []);

  return (
    <>
      {userData?._id ? (
        <div
          onClick={() => cardClicked()}
          className={`bg-base-300 rounded-3xl h-3/4 w-1/3 relative  transition-transform duration-500 ${
            rotated ? "rotate-180" : ""
          }`}
        >
          <figure className="h-full w-full ">
            <img
              className={`bg-gradient-to-r from-sky-500 to-indigo-500 object-cover object-center w-full h-full rounded-3xl transition-opacity duration-1000 ${
                rotated ? "opacity-50" : "opacity-100"
              }`}
              src={rotated ? null : userData?.photoURL}
              alt={rotated ? "" : "UserImage"}
            ></img>
          </figure>
          {!rotated ? (
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
          ) : (
            <div className="absolute left-0 top-0 rotate-180 rounded-b-3xl">
              <div className="hero bg-base-200 h-full">
                <div className="hero-content flex-col lg:flex-row">
                  <div>
                    <h1 className="text-5xl font-bold">{`${userData?.firstName} ${userData?.lastName}`}</h1>
                    <h1 className="py-6">
                      {userData?.age}
                    </h1>
                    <h1 className="py-6">
                      {userData?.gender}
                    </h1>
                    <p className="py-6">
                      {userData?.about}
                    </p>
                    <button className="btn btn-primary">Get Started</button>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div
            className={`absolute rounded-full border-2 top-1/3 ${
              transition
                ? "-translate-x-40 translate-y-10"
                : "translate-y-0 -translate-x-40"
            }  transition-all duration-1000 ease-out`}
          >
            <button
              onClick={() => {
                rotated?handleClick("interested", userData?._id):handleClick("ignored", userData?._id);
              }}
              className="text-3xl rounded-full border-2"
            >
              ←
            </button>
          </div>
          <div
            className={`absolute rounded-full border-2 top-1/3 right-0 ${
              transition
                ? "translate-x-40 translate-y-10"
                : "translate-y-0 translate-x-40"
            }  transition-all duration-1000 ease-out`}
          >
            <button
              onClick={() => {
                rotated?handleClick("ignored", userData?._id):handleClick("interested", userData?._id)
              }}
              className="text-3xl rounded-full border-2"
            >
              →
            </button>
          </div>
        </div>
      ) : (
        <div>No user Left to Show!!!</div>
      )}
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
