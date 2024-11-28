import axios from "axios";
import { REQUEST_URL } from "../utils/Constants";
import { useDispatch } from "react-redux";
import { removeFeedUser } from "../redux/FeedSlice";

function FeedCard(pros){
    const userData = pros.userData
    const dispatch = useDispatch()
    async function handleClick(action, userId) {
        const data = REQUEST_URL + `request/send/${action}/${userId}`;
        console.log(data);
        // await axios.post("http://localhost:5000/request/send/interested/67420e101180a24e604a2669",{},{withCredentials:true})
        await axios.post(
          REQUEST_URL + `request/send/${action}/${userId}`,
          {},
          { withCredentials: true }
        );
        dispatch(removeFeedUser());
      }
      console.log("photourl = ",userData?.age?.photoURL)
    return(<>
        {userData?._id ? (
          <div className="card glass w-2/5 h-3/5">
            <figure>
              <img
                // src={userFeed?.[0]?.[0]?.photoURL}
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
        )}
      </>)
}

export default FeedCard