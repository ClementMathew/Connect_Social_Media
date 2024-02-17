import { getAuth, signOut } from "firebase/auth";
import app from '../Firebase/firebase';
import { useNavigate } from "react-router-dom";
import './home.css'
import SuggestComponent from "./Components/SuggestComponent";
import StoryComponent from "./Components/StoryComponent";
import PostComponent from "./Components/PostComponent";
import NavComponent from "./Components/NavComponent";

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
                <div id="connectwithlogo">
                    <img src="connectwithlogo.png" alt="connectlogo" />
                </div>
                <div id="stripes">
                    <div id="blackstripe"></div>
                    <div id="orangestripe"></div>
                </div>
                <div id="navhome">
                    <NavComponent iconSource='home.png' navName="Home"></NavComponent>
                    <NavComponent iconSource='search.png' navName="Search"></NavComponent>
                    <NavComponent iconSource='messages.png' navName="Messages"></NavComponent>
                    <NavComponent iconSource='notifications.png' navName="Notifications"></NavComponent>
                    <NavComponent iconSource='create.png' navName="Create"></NavComponent>
                    <NavComponent iconSource='profile_icon.png' navName="Profile"></NavComponent>
                    <NavComponent iconSource='more.png' navName="More"></NavComponent>
                </div>
                <div id="sloganhome">Get Connected, Get Social</div>
            </div>

            <div className="verticalline"></div>

            <div id="center">
                <div id="storyhome">
                    <StoryComponent storyPicSource='profile.jpg' storyName='__clement.m__'></StoryComponent>
                    <StoryComponent storyPicSource='profile.jpg' storyName='__clement.m__'></StoryComponent>
                    <StoryComponent storyPicSource='profile.jpg' storyName='__clement.m__'></StoryComponent>
                    <StoryComponent storyPicSource='profile.jpg' storyName='__clement.m__'></StoryComponent>
                    <StoryComponent storyPicSource='profile.jpg' storyName='__clement.m__'></StoryComponent>
                    <StoryComponent storyPicSource='profile.jpg' storyName='__clement.m__'></StoryComponent>
                    <StoryComponent storyPicSource='profile.jpg' storyName='__clement.m__'></StoryComponent>
                </div>

                <div className="horizontalline"></div>

                <div id="posthome">
                    <PostComponent postPicSource='profile.jpg' postName='__clement.m__' postSource='post.png' postLikes='736' postComments='126' postShare='56' postAbout='Excellent Performance ...'></PostComponent>
                </div>
            </div>

            <div className="verticalline"></div>

            <div id="rightside">
                <div id="userhome">
                    <div id='profilepic'>
                        <img src='profile.jpg' alt="profile picture" />
                    </div>
                    <div id="nametag">
                        <p id="username">
                            __clement.m__
                        </p>
                        <p id="mainname">
                            Clement Mathew
                        </p>
                    </div>
                    <div id="switchbutton">
                        <button>Switch</button>
                    </div>
                </div>
                <div id="suggestionheading">
                    <p>Suggested for you</p>
                    <button>See All</button>
                </div>
                <div id="suggestionshome">
                    <SuggestComponent picSource='profile.jpg' userName='__clement.m__' mainName='Clement Mathew'></SuggestComponent>
                    <SuggestComponent picSource='profile.jpg' userName='__clement.m__' mainName='Clement Mathew'></SuggestComponent>
                    <SuggestComponent picSource='profile.jpg' userName='__clement.m__' mainName='Clement Mathew'></SuggestComponent>
                    <SuggestComponent picSource='profile.jpg' userName='__clement.m__' mainName='Clement Mathew'></SuggestComponent>
                </div>
                <div id="copyright">
                    @ 2024 Copyright from Connect
                </div>
            </div>
        </div>
    );
}

export default Home;