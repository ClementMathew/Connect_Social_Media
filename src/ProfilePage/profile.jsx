import React from 'react'
import app from '../Firebase/firebase';
import { useLocation, useNavigate } from "react-router-dom";
import { signOut, getAuth } from "firebase/auth";
import NavComponent from '../HomeComponents/NavComponent'
import '../HomePage/home.css'
import './profile.css'
import { useState } from 'react';
import '../HomeComponents/NavComponent.css'
import CreateComponent from '../CreatePage/CreateComponent';

export default function Profile() {

    const [createToggle, setCreateToggle] = useState(false)

    const popUp = () => {
        setCreateToggle(!createToggle)
    }

    const location = useLocation()
    const dataToProfile = location.state.data

    const auth = getAuth(app);

    const navigate = useNavigate();

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
                    <NavComponent iconSource='home.png' navName="Home" navPage='/home' data={dataToProfile}></NavComponent>
                    <NavComponent iconSource='search.png' navName="Search" navPage="/search" data={dataToProfile}></NavComponent>
                    <NavComponent iconSource='messages.png' navName="Messages" navPage="/messages" data={dataToProfile}></NavComponent>
                    <NavComponent iconSource='notifications.png' navName="Notifications" navPage="/notifications" data={dataToProfile}></NavComponent>

                    <div id='nav' onClick={popUp}>
                        <img src='create.png' alt="navIcon" />
                        <p>Create</p>
                    </div>

                    <NavComponent selected='#F3F3F3' iconSource='profile_icon.png' navName="Profile" navPage="/profile" data={dataToProfile}></NavComponent>
                    <NavComponent iconSource='more.png' navName="More" navPage="/more" data={dataToProfile}></NavComponent>
                </div>
                <div id="sloganhome">Get Connected, Get Social</div>
            </div>

            <div className="verticalline"></div>

            <div id="profileRightSide">
                <div id="profileHead">
                    <div id="profileHeadPic">
                        <img src="profile.jpg" alt="profile page dp" />
                    </div>
                    <div id="profileHeadBio">
                        <div id="profileHeadBioTop">
                            <p >__clement.m__</p>
                            <button id="editProfile">Edit Profile</button>
                            <button id="logOut" onClick={handleClick}>Logout</button>
                        </div>
                        <div id="profileFollowers">
                            <div id="postsCount">
                                <p className='CountPrefix'>20</p>
                                <p className='CountSuffix'>posts</p>
                            </div>
                            <div id="followersCount">
                                <p className='CountPrefix followPointer'>1001</p>
                                <p className='CountSuffix followPointer'>followers</p>
                            </div>
                            <div id="followingCount">
                                <p className='CountPrefix followPointer'>902</p>
                                <p className='CountSuffix followPointer'>following</p>
                            </div>
                        </div>
                        <div id="profileBio">
                            <p id='BioName'>Clement Mathew</p>
                            <p id='Bio'>Studying B.Tech at Gec Wayanad</p>
                        </div>
                    </div>
                </div>

                <div id="profilePosts">
                    <div className="profileHorizontalLine"></div>
                    <div id='profilePostsHead'>Posts</div>
                    <div id="profilePostImages">
                        <img src="profile.jpg" alt="post pic" />
                        <img src="profile.jpg" alt="post pic" />
                        <img src="profile.jpg" alt="post pic" />
                        <img src="profile.jpg" alt="post pic" />
                        <img src="profile.jpg" alt="post pic" />
                        <img src="profile.jpg" alt="post pic" />
                        <img src="profile.jpg" alt="post pic" />
                        <img src="profile.jpg" alt="post pic" />
                        <img src="profile.jpg" alt="post pic" />
                        <img src="profile.jpg" alt="post pic" />
                        <img src="profile.jpg" alt="post pic" />
                        <img src="profile.jpg" alt="post pic" />
                        <img src="profile.jpg" alt="post pic" />
                        <img src="profile.jpg" alt="post pic" />
                        <img src="profile.jpg" alt="post pic" />
                        <img src="profile.jpg" alt="post pic" />
                        <img src="profile.jpg" alt="post pic" />
                        <img src="profile.jpg" alt="post pic" />
                        <img src="profile.jpg" alt="post pic" />
                        <img src="profile.jpg" alt="post pic" />
                        <img src="profile.jpg" alt="post pic" />
                        <img src="profile.jpg" alt="post pic" />
                        <img src="profile.jpg" alt="post pic" />
                        <img src="profile.jpg" alt="post pic" />
                        <img src="profile.jpg" alt="post pic" />
                        <img src="profile.jpg" alt="post pic" />
                        <img src="profile.jpg" alt="post pic" />
                        <img src="profile.jpg" alt="post pic" />
                        <img src="profile.jpg" alt="post pic" />
                        <img src="profile.jpg" alt="post pic" />
                        <img src="profile.jpg" alt="post pic" />
                        <img src="profile.jpg" alt="post pic" />
                        <img src="profile.jpg" alt="post pic" />
                        <img src="profile.jpg" alt="post pic" />
                        <img src="profile.jpg" alt="post pic" />
                        <img src="profile.jpg" alt="post pic" />
                        <img src="profile.jpg" alt="post pic" />
                        <img src="profile.jpg" alt="post pic" />
                        <img src="profile.jpg" alt="post pic" />
                        <img src="profile.jpg" alt="post pic" />
                        <img src="profile.jpg" alt="post pic" />
                        <img src="profile.jpg" alt="post pic" />
                        <img src="profile.jpg" alt="post pic" />
                        <div style={{ paddingBottom: '400px' }}></div>
                    </div>
                </div>
            </div>

            <CreateComponent show={createToggle ? 'flex' : 'none'} createToggle={createToggle} setCreateToggle={setCreateToggle}></CreateComponent>

        </div>
    )
}
