import React from 'react'
import NavComponent from '../HomeComponents/NavComponent'
import '../HomePage/home.css'
import './search.css'
import ProfileDetails from '../Components/ProfileDetails'
import RecentSearch from '../Components/RecentSearch'

export default function Search() {
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
                    <NavComponent iconSource='home.png' navName="Home" navPage='/home'></NavComponent>
                    <NavComponent selected='#F3F3F3' iconSource='search.png' navName="Search" navPage="/search"></NavComponent>
                    <NavComponent iconSource='messages.png' navName="Messages" navPage="/messages"></NavComponent>
                    <NavComponent iconSource='notifications.png' navName="Notifications" navPage="/notifications"></NavComponent>
                    <NavComponent iconSource='create.png' navName="Create" navPage="/create"></NavComponent>
                    <NavComponent iconSource='profile_icon.png' navName="Profile" navPage="/profile"></NavComponent>
                    <NavComponent iconSource='more.png' navName="More" navPage="/more"></NavComponent>
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

                <div id="recent">Recent</div>

                <RecentSearch></RecentSearch>
                <RecentSearch></RecentSearch>
                <RecentSearch></RecentSearch>
                <RecentSearch></RecentSearch>
            </div>

            <div className="verticalline"></div>

            <div id="rightside">

                <div id="profileDetails">
                    <img src="profile.jpg" alt="profilepic" />
                    <ProfileDetails detailType='Username' detailName="__clement.m__"></ProfileDetails>
                    <ProfileDetails detailType='Name' detailName="Clement Mathew"></ProfileDetails>
                    <ProfileDetails detailType='Email' detailName="clementmathew924@gmail.com"></ProfileDetails>
                    <ProfileDetails detailType='Phone' detailName="+918156819141"></ProfileDetails>
                </div>

                <div id="copyright">
                    @ 2024 Copyright from Connect
                </div>
            </div>

        </div>
    )
}
