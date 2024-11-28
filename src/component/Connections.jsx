import axios from "axios";
import { useEffect, useState } from "react";
import { REQUEST_URL } from "../utils/Constants";

const Connections = () => {
  const [userData, setUserData] = useState([]);
  const getConnectionsData = async () => {
    try {
      const data = await axios.get(REQUEST_URL + "user/connections", {
        withCredentials: true,
      });
      setUserData(data?.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getConnectionsData();
  }, []);

  return (
    <>
      {userData ? (
        <div className="overflow-x-auto w-full h-full">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
              <th className="text-center w-16" >Index</th>
                <th className="text-center w-64">Name</th>
                <th className="text-center">Gender</th>
                <th className="text-center">Interest</th>
                <th className="text-center">About</th>
                
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {userData.map((data, key) => {
                return (
                  <tr key={key}>
                    <th className="text-center">
                      <span>{key+1}</span>
                    </th>
                    <td className="text-center">
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12 text-center">
                            <img
                              src={data?.connectionRequestTo?.photoURL}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">
                            {data?.connectionRequestTo?.firstName}{" "}
                            {data?.connectionRequestTo?.lastName}
                          </div>
                          <div className="text-sm opacity-50">
                            {data?.connectionRequestTo?.age}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="text-center"> 
                      {data?.connectionRequestTo?.gender}
                      <br />
                    </td>
                    <td className="text-center">{data?.connectionRequestTo?.skills}</td>
                    <td className="text-center">{data?.connectionRequestTo?.about}</td>
                    
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <h3>No connection available!!</h3>
      )}
    </>
  );
};

export default Connections;
