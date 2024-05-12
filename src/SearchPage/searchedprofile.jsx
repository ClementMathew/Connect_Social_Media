import React, { useEffect, useState } from 'react'
import '../ProfilePage/profile.css'
import NavComponent from '../Components/NavComponent'
import '../HomePage/home.css'
import '../ProfilePage/profile.css'
import '../Components/NavComponent.css'
import CreateComponent from '../CreatePage/CreateComponent';
import Followers from '../ProfilePage/followers';
import Following from '../ProfilePage/following';
import { useLocation, Link } from "react-router-dom";
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore'
import app from '../Firebase/firebase'

export default function SearchedProfile() {

    const [createToggle, setCreateToggle] = useState(false)
    const [followersList, setFollowersList] = useState(false)
    const [followingList, setFollowingList] = useState(false)
    const [connect, setConnect] = useState('Connect')
    const [connectColor, setConnectColor] = useState("editProfile")
    const [connectToggle, setConnectToggle] = useState(false)
    const [followersLen, setFollowersLen] = useState(0)
    const [followingLen, setFollowingLen] = useState(0)
    const [followersData, setFollowersData] = useState({})
    const [followingData, setFollowingData] = useState({})

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

                setFollowersLen(Object.keys(fieldData.followers).length)
                setFollowingLen(Object.keys(fieldData.following).length)

                setFollowersData(fieldData.followers)
                setFollowingData(fieldData.following)

                Object.keys(fieldData.followers).forEach(key => {
                    key === dataToSearchProfile.uid ? setConnect("Connected") : setConnect("Connect")
                })

                Object.keys(fieldData.followers).forEach(key => {
                    key === dataToSearchProfile.uid ? setConnectColor("logOut") : setConnectColor("editProfile")
                })

            } catch (error) {
                console.log(error)
            }
        }

        return () => fetchFollowing();
    }, [])

    const handleClick = async (e) => {
        e.preventDefault();

        const db = getFirestore(app)
        const docRef = doc(db, "Users", dataToSearchProfile.uid)
        const docRef2 = doc(db, "Users", searchPerson.uid)

        const docSnap = await getDoc(docRef)
        const docSnap2 = await getDoc(docRef2)
        const fieldData = docSnap.data()
        const fieldData2 = docSnap2.data()

        const following = fieldData.following
        const followers = fieldData2.followers

        setConnectToggle(!connectToggle)

        if (connectToggle) {

            setConnect("Connected")
            setConnectColor("logOut")

            try {

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
        }
        else {
            setConnect("Connect")
            setConnectColor("editProfile")

            try {

                delete following[searchPerson.uid]
                delete followers[dataToSearchProfile.uid]

                updateDoc(docRef, {
                    following: following
                })
                updateDoc(docRef2, {
                    followers: followers
                })

            } catch (error) {
                console.log(error)
            }
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
                        <img id='nav-img' src='create.png' alt="navIcon" />
                        <p id='nav-p'>Create</p>
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
                            <img id='profilePicShape-img' src={searchPerson.profilepicurl === '' ? 'profile.png' : searchPerson.profilepicurl} alt="profile page dp" />
                        </div>
                    </div>

                    <div id="profileHeadBio">

                        <div id="profileHeadBioTop">
                            <p id='profileHeadBioTop-p'>{searchPerson.username}</p>
                            <button id={connectColor} onClick={handleClick}>{connect}</button>
                            <Link to='/messages' state={{ data: dataToSearchProfile, msgdata: searchPerson }}>
                                <button id="logOut" >Message</button>
                            </Link>
                        </div>

                        <div id="profileFollowers">

                            <div id="postsCount">
                                <p className='CountPrefix'>{
                                    Object.keys(searchPerson.posts).length
                                }</p>
                                <p className='CountSuffix'>posts</p>
                            </div>

                            <div id="followersCount" onClick={followersPopUp}>
                                <p className='CountPrefix followPointer'>{followersLen}</p>
                                <p className='CountSuffix followPointer'>followers</p>
                            </div>

                            <div id="followingCount" onClick={followingPopUp}>
                                <p className='CountPrefix followPointer'>{followingLen}</p>
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

                        {(dataToSearchProfile.public || connect === 'Connected') ? Object.keys(searchPerson.posts).map((key) => (

                            <div key={key} id='profilePostImagesShape'>
                                < img id='profilePostImagesIn' src={searchPerson.posts[key].url} alt="post pic" />
                            </div>
                        )) : <div style={{ paddingTop: '200px', paddingLeft: '600px', width: '1000px', fontSize: '30px' }}>'This is a Private Account'</div>}

                        <div style={{ paddingBottom: '400px' }}></div>
                    </div>
                </div>
            </div>

            <CreateComponent data={dataToSearchProfile} show={createToggle ? 'flex' : 'none'} createToggle={createToggle} setCreateToggle={setCreateToggle}></CreateComponent>

            <Followers data={followersData} show={followersList ? 'flex' : 'none'} followersList={followersList} setFollowersList={setFollowersList}></Followers>

            <Following data={followingData} show={followingList ? 'flex' : 'none'} followingList={followingList} setFollowingList={setFollowingList}></Following>

        </div>
    )
}
