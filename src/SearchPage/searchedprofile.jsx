import React, { useEffect, useState } from 'react'
import '../ProfilePage/profile.css'
import NavComponent from '../Components/NavComponent'
import '../HomePage/home.css'
import '../ProfilePage/profile.css'
import '../Components/NavComponent.css'
import CreateComponent from '../CreatePage/CreateComponent';
import Followers from '../ProfilePage/followers';
import Following from '../ProfilePage/following';
import { useLocation } from "react-router-dom";
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore'
import app from '../Firebase/firebase'

export default function SearchedProfile() {

    const [createToggle, setCreateToggle] = useState(false)
    const [followersList, setFollowersList] = useState(false)
    const [followingList, setFollowingList] = useState(false)
    const [connect, setConnect] = useState('Connect')
    const [connectColor, setConnectColor] = useState("editProfile")

    const popUp = () => {
        setCreateToggle(!createToggle)
    }

    const followersPopUp = () => {
        setFollowersList(!followersList)
    }

    const followingPopUp = () => {
        setFollowingList(!followingList)
    }

    const location = useLocation()
    const searchPerson = location.state.data
    const dataToSearchProfile = location.state.maindata

    useEffect(() => {

        const fetchRecentHistory = async () => {

            try {

                const db = getFirestore(app)
                const docRef = doc(db, "Users", dataToSearchProfile.uid)

                const recentDataAll = {}

                const recentData = {
                    username: searchPerson.username,
                    name: searchPerson.name,
                    profilepicurl: searchPerson.profilepicurl
                }

                recentDataAll[0] = recentData

                updateDoc(docRef, {
                    recenthistory: recentDataAll
                })
            } catch (error) {
                console.log(error)
            }
        }

        fetchRecentHistory()

        const fetchFollowing = async () => {
            try {
                const db = getFirestore(app)
                const docRef = doc(db, "Users", searchPerson.uid)
                const docSnap = await getDoc(docRef)
                const fieldData = docSnap.data()
                dataToSearchProfile.following = fieldData.following
                dataToSearchProfile.followers = fieldData.followers

                Object.keys(dataToSearchProfile.followers).forEach(key => {
                    key == dataToSearchProfile.uid ? setConnect("Connected") : setConnect("Connect")
                })

                Object.keys(dataToSearchProfile.followers).forEach(key => {
                    key == dataToSearchProfile.uid ? setConnectColor("logOut") : setConnectColor("editProfile")
                })

            } catch (error) {
                console.log(error)
            }
        }

        return () => fetchFollowing();
    }, [])

    const handleClick = async (e) => {
        e.preventDefault();

        setConnect("Connected")
        setConnectColor("logOut")

        try {
            const db = getFirestore(app)
            const docRef = doc(db, "Users", dataToSearchProfile.uid)
            const docRef2 = doc(db, "Users", searchPerson.uid)

            const docSnap = await getDoc(docRef)
            const docSnap2 = await getDoc(docRef2)
            const fieldData = docSnap.data()
            const fieldData2 = docSnap2.data()

            const following = fieldData.following
            const followers = fieldData2.followers

            following[searchPerson.uid] = {
                username: searchPerson.username,
                name: searchPerson.name,
                profilepicurl: searchPerson.profilepicurl
            }

            followers[dataToSearchProfile.uid] = {
                username: dataToSearchProfile.username,
                name: dataToSearchProfile.name,
                profilepicurl: dataToSearchProfile.profilepicurl
            }
            updateDoc(docRef, {
                following: following
            })
            updateDoc(docRef2, {
                followers: followers
            })

        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div id="containerhome">
            <div id="sidebar">
                <div id="connectwithlogo">
                    <img id="connectwithlogo-img" src="connectwithlogo.png" alt="connectlogo" />
                </div>
                <div id="stripes">
                    <div id="blackstripe"></div>
                    <div id="orangestripe"></div>
                </div>

                <div id="navhome">
                    <NavComponent iconSource='home.png' navName="Home" navPage='/home' data={dataToSearchProfile}></NavComponent>
                    <NavComponent selected='#F3F3F3' iconSource='search.png' navName="Search" navPage="/search" data={dataToSearchProfile}></NavComponent>
                    <NavComponent iconSource='messages.png' navName="Messages" navPage="/messages" data={dataToSearchProfile}></NavComponent>
                    <NavComponent iconSource='notifications.png' navName="Notifications" navPage="/notifications" data={dataToSearchProfile}></NavComponent>

                    <div id='nav' onClick={popUp}>
                        <img src='create.png' alt="navIcon" />
                        <p>Create</p>
                    </div>

                    <NavComponent iconSource='profile_icon.png' navName="Profile" navPage="/profile" data={dataToSearchProfile}></NavComponent>
                    <NavComponent iconSource='more.png' navName="More" navPage="/more" data={dataToSearchProfile}></NavComponent>
                </div>
                <div id="sloganhome">Get Connected, Get Social</div>
            </div>

            <div className="verticalline"></div>

            <div id="profileRightSide">
                <div id="profileHead">
                    <div id="profileHeadPic" >
                        <div id='profilePicShape'>
                            <img src={searchPerson.profilepicurl === '' ? 'profile.png' : searchPerson.profilepicurl} alt="profile page dp" />
                        </div>
                    </div>
                    <div id="profileHeadBio">
                        <div id="profileHeadBioTop">
                            <p >{searchPerson.username}</p>
                            <button id={connectColor} onClick={handleClick}>{connect}</button>
                            <button id="logOut">Message</button>
                        </div>
                        <div id="profileFollowers">
                            <div id="postsCount">
                                <p className='CountPrefix'>{
                                    Object.keys(searchPerson.posts).length
                                }</p>
                                <p className='CountSuffix'>posts</p>
                            </div>
                            <div id="followersCount" onClick={followersPopUp}>
                                <p className='CountPrefix followPointer'>{Object.keys(searchPerson.followers).length}</p>
                                <p className='CountSuffix followPointer'>followers</p>
                            </div>
                            <div id="followingCount" onClick={followingPopUp}>
                                <p className='CountPrefix followPointer'>{Object.keys(searchPerson.following).length}</p>
                                <p className='CountSuffix followPointer'>following</p>
                            </div>
                        </div>
                        <div id="profileBio">
                            <p id='BioName'>{searchPerson.name}</p>
                            <p id='Bio'>{searchPerson.bio ? searchPerson.bio : ""}</p>
                        </div>
                    </div>
                </div>

                <div id="profilePosts">
                    <div className="profileHorizontalLine"></div>
                    <div id='profilePostsHead'>Posts</div>
                    <div className="horizontalOrange"></div>

                    <div id="profilePostImages">

                        {Object.keys(searchPerson.posts).map((key, index) => (

                            <div key={key} id='profilePostImagesShape'>
                                < img id='profilePostImagesIn' src={searchPerson.posts[index].url} alt="post pic" />
                            </div>
                        ))}

                        <div style={{ paddingBottom: '400px' }}></div>
                    </div>
                </div>
            </div>

            <CreateComponent data={dataToSearchProfile} show={createToggle ? 'flex' : 'none'} createToggle={createToggle} setCreateToggle={setCreateToggle}></CreateComponent>

            <Followers data={dataToSearchProfile.followers} show={followersList ? 'flex' : 'none'} followersList={followersList} setFollowersList={setFollowersList}></Followers>

            <Following data={dataToSearchProfile.following} show={followingList ? 'flex' : 'none'} followingList={followingList} setFollowingList={setFollowingList}></Following>

        </div>
    )
}
