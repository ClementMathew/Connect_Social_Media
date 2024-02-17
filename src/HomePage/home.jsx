import { getAuth, signOut } from "firebase/auth";
import app from '../Firebase/firebase';
import { useNavigate } from "react-router-dom";
import './home.css'
import SuggestComponent from "./Components/SuggestComponent";

const Home = () => {

    const navigate = useNavigate();
    const auth = getAuth(app);

    const handleClick = (e) => {
        e.preventDefault();
        // Add your authentication logic here
        signOut(auth).then(() => {
            navigate('/');
        }).catch((error) => {
            console.log(error);
        });
        // You can send a request to your authentication server here
    };

    return (
        <div id="containerhome">
            <div id="sidebar">
                <div id="homeconnect">

                </div>
                <img src="logo.png" alt="logo" id="logohome" />
            </div>
            <div id="center">
                hi
            </div>
            <div id="rightside">
                <SuggestComponent></SuggestComponent>
            </div>
        </div>
    );
}

export default Home;