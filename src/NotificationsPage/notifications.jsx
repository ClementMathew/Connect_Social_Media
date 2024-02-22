import React from 'react'
import '../HomePage/home.css'
import '../SearchPage/search.css'
import NavComponent from '../HomeComponents/NavComponent'
import ProfileDetails from '../Components/ProfileDetails'
import './notifications.css'
import NotificationDay from '../Components/NotificationDay'
import '../HomeComponents/NavComponent.css'
import { useState } from 'react'
import CreateComponent from '../CreatePage/CreateComponent';

export default function Notifications() {

  const [createToggle, setCreateToggle] = useState(false)

  const popUp = () => {
    setCreateToggle(!createToggle)
  }

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
          <NavComponent iconSource='search.png' navName="Search" navPage="/search"></NavComponent>
          <NavComponent iconSource='messages.png' navName="Messages" navPage="/messages"></NavComponent>
          <NavComponent selected='#F3F3F3' iconSource='notifications.png' navName="Notifications" navPage="/notifications"></NavComponent>

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

        <div id="notificationhead">Notifications</div>

        <div id="notificationbody">

          <NotificationDay day='New'></NotificationDay>
          <NotificationDay day='Today'></NotificationDay>
          <NotificationDay day='Yesterday'></NotificationDay>
          <NotificationDay day='17, February, 2024'></NotificationDay>
          <NotificationDay day='16, February, 2024'></NotificationDay>

          <div style={{ paddingBottom: '80px' }}></div>
        </div>
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

        <div id="copyright" style={{ paddingTop: '144px' }}>
          @ 2024 Copyright from Connect
        </div>
      </div>

      <CreateComponent show={createToggle ? 'flex' : 'none'} createToggle={createToggle} setCreateToggle={setCreateToggle}></CreateComponent>

    </div>
  )
}
