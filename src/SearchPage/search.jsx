import React from 'react'
import NavComponent from '../HomeComponents/NavComponent'
import '../HomePage/home.css'
import { useState } from 'react'
import './search.css'
import ProfileDetails from '../Components/ProfileDetails'
import RecentSearch from '../Components/RecentSearch'
import '../HomeComponents/NavComponent.css'
import CreateComponent from '../CreatePage/CreateComponent';
import { useLocation } from 'react-router-dom'

export default function Search() {

    const [createToggle, setCreateToggle] = useState(false)

    const popUp = () => {
        setCreateToggle(!createToggle)
    }

    const location = useLocation()
    const dataToSearch = location.state.data

    return (
        <div id='containerhome'>
            <div id="sidebar">
                <div id="connectwithlogo">
                    <img src="connectwithlogo.png" alt="connectlogo" />
                </div>
                <div id="stripes">
                    <div id="blackstripe"></div>
                    <div id="orangestripe"></div>
                </div>
                <div id="navhome">
                    <NavComponent iconSource='home.png' navName="Home" navPage='/home' data={dataToSearch}></NavComponent>
                    <NavComponent selected='#F3F3F3' iconSource='search.png' navName="Search" navPage="/search" data={dataToSearch}></NavComponent>
                    <NavComponent iconSource='messages.png' navName="Messages" navPage="/messages" data={dataToSearch}></NavComponent>
                    <NavComponent iconSource='notifications.png' navName="Notifications" navPage="/notifications" data={dataToSearch}></NavComponent>

                    <div id='nav' onClick={popUp}>
                        <img src='create.png' alt="navIcon" />
                        <p>Create</p>
                    </div>

                    <NavComponent iconSource='profile_icon.png' navName="Profile" navPage="/profile" data={dataToSearch}></NavComponent>
                    <NavComponent iconSource='more.png' navName="More" navPage="/more" data={dataToSearch}></NavComponent>
                </div>
                <div id="sloganhome">Get Connected, Get Social</div>
            </div>

            <div className="verticalline"></div>

            <div id="center">

                <div id="searchbar">
                    <input id="searchbox" placeholder='Enter something ...'>
                    </input>
                    <button id="searchbutton">Search</button>
                </div>

                <div id="recent">
                    <p>Recent</p>
                    <button>Clear All</button>
                </div>

                <div id="recentHistory">
                    <RecentSearch picSource='profile.jpg' userName='__clement.m__' mainName='Clement Mathew'></RecentSearch>
                    <RecentSearch picSource='profile.jpg' userName='__clement.m__' mainName='Clement Mathew'></RecentSearch>
                    <RecentSearch picSource='profile.jpg' userName='__clement.m__' mainName='Clement Mathew'></RecentSearch>
                    <RecentSearch picSource='profile.jpg' userName='__clement.m__' mainName='Clement Mathew'></RecentSearch>
                    <RecentSearch picSource='profile.jpg' userName='__clement.m__' mainName='Clement Mathew'></RecentSearch>
                    <RecentSearch picSource='profile.jpg' userName='__clement.m__' mainName='Clement Mathew'></RecentSearch>
                    <RecentSearch picSource='profile.jpg' userName='__clement.m__' mainName='Clement Mathew'></RecentSearch>
                    <RecentSearch picSource='profile.jpg' userName='__clement.m__' mainName='Clement Mathew'></RecentSearch>
                    <RecentSearch picSource='profile.jpg' userName='__clement.m__' mainName='Clement Mathew'></RecentSearch>
                    <RecentSearch picSource='profile.jpg' userName='__clement.m__' mainName='Clement Mathew'></RecentSearch>
                    <RecentSearch picSource='profile.jpg' userName='__clement.m__' mainName='Clement Mathew'></RecentSearch>
                    <RecentSearch picSource='profile.jpg' userName='__clement.m__' mainName='Clement Mathew'></RecentSearch>
                    <RecentSearch picSource='profile.jpg' userName='__clement.m__' mainName='Clement Mathew'></RecentSearch>
                    <RecentSearch picSource='profile.jpg' userName='__clement.m__' mainName='Clement Mathew'></RecentSearch>
                    <div style={{ paddingBottom: '160px' }}></div>
                </div>
            </div>

            <div className="verticalline"></div>

            <div id="rightside">

                <div id="profileDetails">
                    <img src="profile.jpg" alt="profilepic" />
                    <ProfileDetails detailType='Username' detailName={dataToSearch.username}></ProfileDetails>
                    <ProfileDetails detailType='Name' detailName={dataToSearch.name}></ProfileDetails>
                    <ProfileDetails detailType='Email' detailName={dataToSearch.email}></ProfileDetails>
                    <ProfileDetails detailType='Phone' detailName={dataToSearch.phone}></ProfileDetails>
                </div>

                <div id="copyright" style={{ paddingTop: '144px' }}>
                    @ 2024 Copyright from Connect
                </div>
            </div>

            <CreateComponent show={createToggle ? 'flex' : 'none'} createToggle={createToggle} setCreateToggle={setCreateToggle}></CreateComponent>

        </div>
    )
}
