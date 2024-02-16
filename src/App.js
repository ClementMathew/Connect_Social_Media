import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./LoginPage/welcome";
import SignUp from "./LoginPage/register";
import Home from "./HomePage/home";
import ForgotPassword from "./ForgotPassword/forgotpass";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/forgotpass" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>);
}

export default App;
