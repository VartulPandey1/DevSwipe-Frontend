import { useEffect } from "react";
import { REQUEST_URL } from "../utils/Constants";
import axios from "axios";
import { removeRequestUser, setRequestUsers } from "../redux/Request";
import { useDispatch, useSelector } from "react-redux";

const Requests = () => {
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.request.userData);
  async function handleClick(action, userId) {
    const data = await axios.post(
      REQUEST_URL + `request/review/${action}/${userId}`,
      {},
      { withCredentials: true }
    );
    console.log("data = " + data);
    dispatch(removeRequestUser());
  }

  const getRequestsData = async () => {
    try {
      const data = await axios.get(REQUEST_URL + "user/requests", {
        withCredentials: true,
      });
      console.log(data);
      dispatch(setRequestUsers(data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getRequestsData();
  }, []);

  return (
    <>
      {userData ? (
        <div className="overflow-x-auto w-full h-full">
          <table className="table">
            <thead>
              <tr>
                <th className="text-center w-16">Index</th>
                <th className="text-center w-64">Name</th>
                <th className="text-center">Gender</th>
                <th className="text-center">Interest</th>
                <th className="text-center">About</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((data, key) => {
                return (
                  <tr key={key}>
                    <th className="text-center">
                      <span>{key + 1}</span>
                    </th>
                    <td className="text-center">
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12 text-center">
                            <img
                              src={data?.connectionRequestFrom?.photoURL}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">
                            {data?.connectionRequestFrom?.firstName}{" "}
                            {data?.connectionRequestFrom?.lastName}
                          </div>
                          <div className="text-sm opacity-50">
                            {data?.connectionRequestFrom?.age}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="text-center">
                      {data?.connectionRequestFrom?.gender}
                      <br />
                    </td>
                    <td className="text-center">
                      {data?.connectionRequestFrom?.skills}
                    </td>
                    <td className="text-center">
                      <button
                        onClick={() =>
                          handleClick(
                            "accepted",
                            data?.connectionRequestFrom?._id
                          )
                        }
                        className="btn btn-error mx-5"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() =>
                          handleClick(
                            "rejected",
                            data?.connectionRequestFrom?._id
                          )
                        }
                        className="btn btn-success mx-5"
                      >
                        Accecpt
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <h3>No Request available!!</h3>
      )}
    </>
  );
};

export default Requests;
