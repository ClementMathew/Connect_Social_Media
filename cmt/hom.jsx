import './home.css'
import '../HomeComponents/PostComponent.css'
import SuggestComponent from "../HomeComponents/SuggestComponent";
import StoryComponent from "../HomeComponents/StoryComponent";
import NavComponent from "../HomeComponents/NavComponent";
import { useEffect, useRef, useState } from "react";
import '../HomeComponents/NavComponent.css'
import CreateComponent from '../CreatePage/CreateComponent';
import { useLocation } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from '../Firebase/firebase';
import { doc, collection, getFirestore, getDoc, getDocs } from 'firebase/firestore';

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
    const [postDatas, setPostDatas] = useState({})

    const popUp = () => {
        setCreateToggle(!createToggle)
    }

    const story = useRef(null);

    let allPosts = {}

    useEffect(() => {
        story.current.addEventListener('wheel', (event) => {
            story?.current.scrollBy({ left: event.deltaY * 5, top: 0, behavior: "smooth" });
        })

        try {
            const auth = getAuth(app)
            const db = getFirestore(app)

            const fetchPosts = async () => {
                const docPosts = await getDocs(collection(db, "Posts"))
                docPosts.forEach((doc) => {

                    let ID = doc.id
                    allPosts[ID] = doc.data()
                })

                const entries = Object.entries(allPosts);

                // Reverse the array of entries
                const reversedEntries = entries.reverse();

                // Convert the reversed array back to an object
                const reversedPosts = Object.fromEntries(reversedEntries);

                setPostDatas(reversedPosts)
            }

            fetchPosts()

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

                    {
                        Object.keys(postDatas).map((key) => (

                            <div id="post" key={key}>

                                <div id="posthead">
                                    <div id="postProfilePic">
                                        <img src={postDatas[key].profilepicurl} alt="profilepicture" />
                                    </div>
                                    <div id="postname">{postDatas[key].username}</div>
                                </div>
                                <div className="horizontalline"></div>
                                <div id="postimage">
                                    <img src={postDatas[key].url} alt="postimage" />
                                </div>
                                <div id="postfoot">
                                    <div id="likes">
                                        <img src="not_like.png" alt="like" />
                                        <p>{postDatas[key].likes} Likes</p>
                                    </div>
                                    <div id="comments">
                                        <img src="comment.png" alt="comment" />
                                        <p>{postDatas[key].commentcount} Comments</p>
                                    </div>
                                    <div id="share">
                                        <img src="share.png" alt="share" />
                                        <p>{postDatas[key].share} Shares</p>
                                    </div>
                                    <div id="postabout">
                                        <img src="dot.png" alt="dot" />
                                        <p>{postDatas[key].about}</p>
                                    </div>
                                </div>
                                <div className="horizontalline"></div>
                            </div>
                        ))
                    }

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

            <CreateComponent data={dataToHome} show={createToggle ? 'flex' : 'none'} createToggle={createToggle} setCreateToggle={setCreateToggle}></CreateComponent>

        </div >
    );
}

