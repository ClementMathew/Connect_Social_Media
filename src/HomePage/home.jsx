import './home.css'
import SuggestComponent from "../HomeComponents/SuggestComponent";
import StoryComponent from "../HomeComponents/StoryComponent";
import PostComponent from "../HomeComponents/PostComponent";
import NavComponent from "../HomeComponents/NavComponent";
import { useEffect, useRef, useState } from "react";
import '../HomeComponents/NavComponent.css'
import CreateComponent from '../CreatePage/CreateComponent';

const Home = () => {

    const [createToggle, setCreateToggle] = useState(false)

    const popUp = () => {
        setCreateToggle(!createToggle)
    }

    const story = useRef(null);

    useEffect(() => {
        story.current.addEventListener('wheel', (event) => {
            story?.current.scrollBy({ left: event.deltaY * 5, top: 0, behavior: "smooth" });
        })
    }, [])

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
                    <NavComponent selected='#F3F3F3' iconSource='home.png' navName="Home" navPage='/home'></NavComponent>
                    <NavComponent iconSource='search.png' navName="Search" navPage="/search"></NavComponent>
                    <NavComponent iconSource='messages.png' navName="Messages" navPage="/messages"></NavComponent>
                    <NavComponent iconSource='notifications.png' navName="Notifications" navPage="/notifications"></NavComponent>

                    <div id='nav' onClick={popUp}>
                        <img src='create.png' alt="navIcon" />
                        <p>Create</p>
                    </div>

                    <NavComponent iconSource='profile_icon.png' navName="Profile" navPage="/profile"></NavComponent>
                    <NavComponent iconSource='more.png' navName="More" navPage="/more"></NavComponent>
                </div>
                <div id="sloganhome">Get Connected, Get Social</div>
            </div>

            <div className="verticalline"></div>

            <div id="center">
                <div id="storyhome" ref={story}>
                    <StoryComponent storyPicSource='profile.jpg' storyName='__clement.m__'></StoryComponent>
                    <StoryComponent storyPicSource='profile.jpg' storyName='__clement.m__'></StoryComponent>
                    <StoryComponent storyPicSource='profile.jpg' storyName='__clement.m__'></StoryComponent>
                    <StoryComponent storyPicSource='profile.jpg' storyName='__clement.m__'></StoryComponent>
                    <StoryComponent storyPicSource='profile.jpg' storyName='__clement.m__'></StoryComponent>
                    <StoryComponent storyPicSource='profile.jpg' storyName='__clement.m__'></StoryComponent>
                    <StoryComponent storyPicSource='profile.jpg' storyName='__clement.m__'></StoryComponent>
                    <StoryComponent storyPicSource='profile.jpg' storyName='__clement.m__'></StoryComponent>
                    <StoryComponent storyPicSource='profile.jpg' storyName='__clement.m__'></StoryComponent>
                    <StoryComponent storyPicSource='profile.jpg' storyName='__clement.m__'></StoryComponent>
                    <StoryComponent storyPicSource='profile.jpg' storyName='__clement.m__'></StoryComponent>

                    <div style={{ paddingRight: '15px' }}></div>
                </div>

                <div className="horizontalline"></div>

                <div id="posthome">
                    <PostComponent postPicSource='profile.jpg' postName='__clement.m__' postSource='post.png' postLikes='736' postComments='126' postShare='56' postAbout='Excellent Performance ...'></PostComponent>
                    <PostComponent postPicSource='profile.jpg' postName='__clement.m__' postSource='post.png' postLikes='736' postComments='126' postShare='56' postAbout='Excellent Performance ...'></PostComponent>
                    <PostComponent postPicSource='profile.jpg' postName='__clement.m__' postSource='post.png' postLikes='736' postComments='126' postShare='56' postAbout='Excellent Performance ...'></PostComponent>
                    <PostComponent postPicSource='profile.jpg' postName='__clement.m__' postSource='post.png' postLikes='736' postComments='126' postShare='56' postAbout='Excellent Performance ...'></PostComponent>

                    <div style={{ paddingBottom: '120px' }}></div>
                </div>
            </div>

            <div className="verticalline"></div>

            <div id="rightside">
                <div id="userhome">
                    <div id='profilepic'>
                        <img src='profile.jpg' alt="profile pic" />
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
                    <SuggestComponent picSource='profile.jpg' userName='__clement.m__' mainName='Clement Mathew'></SuggestComponent>
                    <SuggestComponent picSource='profile.jpg' userName='__clement.m__' mainName='Clement Mathew'></SuggestComponent>
                    <SuggestComponent picSource='profile.jpg' userName='__clement.m__' mainName='Clement Mathew'></SuggestComponent>
                    <SuggestComponent picSource='profile.jpg' userName='__clement.m__' mainName='Clement Mathew'></SuggestComponent>
                    <SuggestComponent picSource='profile.jpg' userName='__clement.m__' mainName='Clement Mathew'></SuggestComponent>
                </div>
                <div id="copyright" style={{ paddingTop: '45px' }}>
                    @ 2024 Copyright from Connect
                </div>
            </div>

            <CreateComponent show={createToggle ? 'flex' : 'none'} createToggle={createToggle} setCreateToggle={setCreateToggle}></CreateComponent>

        </div>
    );
}

export default Home;