import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./LoginPage/welcome";
import SignUp from "./LoginPage/register";
import Home from "./HomePage/home";
import ForgotPassword from "./ForgotPassword/forgotpass";
import Search from "./SearchPage/search";
import More from "./MorePage/more";
import Profile from "./ProfilePage/profile";
import CreateComponent from "./CreatePage/CreateComponent";
import Notifications from "./NotificationsPage/notifications";
import Messages from "./MessagesPage/messages";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgotpass" element={<ForgotPassword />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/more" element={<More />} />
      </Routes>
    </BrowserRouter>);
}

export default App;
