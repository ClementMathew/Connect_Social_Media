import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./AuthenticationPage/welcome";
import SignUp from "./AuthenticationPage/register";
import Home from "./HomePage/home";
import ForgotPassword from "./ForgotPassword/forgotpass";
import Search from "./SearchPage/search";
import More from "./MorePage/more";
import Profile from "./ProfilePage/profile";
import Notifications from "./NotificationsPage/notifications";
import Messages from "./MessagesPage/messages";
import ContinueWithGoogle from "./AuthenticationPage/continuewg";
import SearchedProfile from "./SearchPage/searchedprofile";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/cwg" element={<ContinueWithGoogle />} />
        <Route path="/forgotpass" element={<ForgotPassword />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/more" element={<More />} />
        <Route path="/searchedprofile" element={<SearchedProfile />} />
      </Routes>
    </BrowserRouter>);
}

export default App;
