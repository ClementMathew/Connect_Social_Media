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
import EditProfile from './editprofile';
import ProfilePicUpload from './profilepic';

export default function Profile() {

    const [createToggle, setCreateToggle] = useState(false)
    const [editProfileToggle, setEditProfileToggle] = useState(false)
    const [uploadPicToggle, setUploadPicToggle] = useState(false)

    const popUp = () => {
        setCreateToggle(!createToggle)
    }

    const editPopUp = () => {
        setEditProfileToggle(!editProfileToggle)
    }

    const profilePopUp = () => {
        setUploadPicToggle(!uploadPicToggle)
    }

    const location = useLocation()
    const dataToProfile = location.state.data

    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        // Add your authentication logic here

        try {
            const auth = getAuth(app);

            signOut(auth).then(() => {
                navigate('/');
            }).catch((error) => {
                console.log(error);
            });
        } catch (error) {
            console.log(error)
        }
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
                    <div id="profileHeadPic" onClick={profilePopUp}>
                        <div id='profilePicShape'>
                            <img src={dataToProfile.profilepicurl === '' ? 'profile.png' : dataToProfile.profilepicurl} alt="profile page dp" />
                        </div>
                    </div>
                    <div id="profileHeadBio">
                        <div id="profileHeadBioTop">
                            <p >{dataToProfile.username}</p>
                            <button id="editProfile" onClick={editPopUp}>Edit Profile</button>
                            <button id="logOut" onClick={handleClick}>Logout</button>
                        </div>
                        <div id="profileFollowers">
                            <div id="postsCount">
                                <p className='CountPrefix'>{
                                    Object.keys(dataToProfile.posts).length
                                }</p>
                                <p className='CountSuffix'>posts</p>
                            </div>
                            <div id="followersCount">
                                <p className='CountPrefix followPointer'>{dataToProfile.followers}</p>
                                <p className='CountSuffix followPointer'>followers</p>
                            </div>
                            <div id="followingCount">
                                <p className='CountPrefix followPointer'>{dataToProfile.following}</p>
                                <p className='CountSuffix followPointer'>following</p>
                            </div>
                        </div>
                        <div id="profileBio">
                            <p id='BioName'>{dataToProfile.name}</p>
                            <p id='Bio'>{dataToProfile.bio ? dataToProfile.bio : "Add more about yourself"}</p>
                        </div>
                    </div>
                </div>

                <div id="profilePosts">
                    <div className="profileHorizontalLine"></div>
                    <div id='profilePostsHead'>Posts</div>
                    <hr style={{
                        color: 'white',
                        border: '1px solid #e7e7e7',
                        margin: '0px'
                    }} />
                    <div id="profilePostImages">

                        {Object.keys(dataToProfile.posts).map((key, index) => (

                            <div key={key} id='profilePostImagesShape'>
                                < img id='profilePostImagesIn' src={dataToProfile.posts[index].url} alt="post pic" />
                            </div>
                        ))}

                        <div style={{ paddingBottom: '400px' }}></div>
                    </div>
                </div>
            </div>

            <CreateComponent data={dataToProfile} show={createToggle ? 'flex' : 'none'} createToggle={createToggle} setCreateToggle={setCreateToggle}></CreateComponent>

            <EditProfile show={editProfileToggle ? 'flex' : 'none'} editProfileToggle={editProfileToggle} setEditProfileToggle={setEditProfileToggle}></EditProfile>

            <ProfilePicUpload data={dataToProfile} show={uploadPicToggle ? 'flex' : 'none'} uploadPicToggle={uploadPicToggle} setUploadPicToggle={setUploadPicToggle}></ProfilePicUpload>

        </div>
    )
}
