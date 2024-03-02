import './home.css'
import SuggestComponent from "../HomeComponents/SuggestComponent";
import StoryComponent from "../HomeComponents/StoryComponent";
import PostComponent from "../HomeComponents/PostComponent";
import NavComponent from "../HomeComponents/NavComponent";
import { useEffect, useRef, useState } from "react";
import '../HomeComponents/NavComponent.css'
import CreateComponent from '../CreatePage/CreateComponent';
import { useLocation } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from '../Firebase/firebase';
import { doc, collection, getFirestore, getDoc } from 'firebase/firestore';

const Home = () => {


    let location = useLocation()
    let dataToHome = {}

    if (location.state) {
        dataToHome = location.state
    }
    if (location.state.data) {
        dataToHome = location.state.data
    }

    const [createToggle, setCreateToggle] = useState(false)

    const popUp = () => {
        setCreateToggle(!createToggle)
    }

    const story = useRef(null);

    useEffect(() => {
        story.current.addEventListener('wheel', (event) => {
            story?.current.scrollBy({ left: event.deltaY * 5, top: 0, behavior: "smooth" });
        })

        try {
            const auth = getAuth(app)
            const db = getFirestore(app)

            const unsubscribe = onAuthStateChanged(auth, async (user) => {

                const docRef = doc(collection(db, "Users"), user.uid)
                const docSnap = await getDoc(docRef)
                const fieldData = docSnap.data()

                dataToHome.profilepicurl = fieldData.profilepicurl
                dataToHome.posts = fieldData.posts
                dataToHome.followers = fieldData.followers
                dataToHome.following = fieldData.following
                dataToHome.darkmode = fieldData.darkmode
                dataToHome.notifications = fieldData.notifications
                dataToHome.bio = fieldData.bio
                dataToHome.public = fieldData.public
            });

            // Clean up subscription to avoid memory leaks
            return () => unsubscribe();

        } catch (error) {
            console.log(error)
        }
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
                    <NavComponent selected='#F3F3F3' iconSource='home.png' navName="Home" navPage='/home' data={dataToHome}></NavComponent>
                    <NavComponent iconSource='search.png' navName="Search" navPage="/search" data={dataToHome}></NavComponent>
                    <NavComponent iconSource='messages.png' navName="Messages" navPage="/messages" data={dataToHome}></NavComponent>
                    <NavComponent iconSource='notifications.png' navName="Notifications" navPage="/notifications" data={dataToHome}></NavComponent>

                    <div id='nav' onClick={popUp}>
                        <img src='create.png' alt="navIcon" />
                        <p>Create</p>
                    </div>

                    <NavComponent iconSource='profile_icon.png' navName="Profile" navPage="/profile" data={dataToHome}></NavComponent>
                    <NavComponent iconSource='more.png' navName="More" navPage="/more" data={dataToHome}></NavComponent>
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
                        <img src={dataToHome.profilepicurl === '' ? 'profile.png' : dataToHome.profilepicurl} alt="profile pic" />
                    </div>
                    <div id="nametag">
                        <p id="username">
                            {dataToHome.username.length > 13 ? dataToHome.username.slice(0, 13).concat('..') : dataToHome.username}
                        </p>
                        <p id="mainname">
                            {dataToHome.name}
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