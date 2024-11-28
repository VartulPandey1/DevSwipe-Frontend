import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./component/Body";
import LoginPage from "./component/LoginPage";
import { Provider } from "react-redux";
import store from "./redux/store";
import ProfilePage from "./component/ProfilePage";
import Feed from "./component/Feed";
import Connections from "./component/Connections";
import Requests from "./component/Requests";
import Signup from "./component/Signup";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="Signup" element={<Signup />} />
          <Route path="login" element={<LoginPage />}></Route>
          <Route path="/" element={<Body />}>
            <Route path="Profile" element={<ProfilePage />}></Route>
            <Route path="Feed" element={<Feed />} />
            <Route path="Connections" element={<Connections />} />
            <Route path="Requests" element={<Requests />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
