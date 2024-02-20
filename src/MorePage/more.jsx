import React from 'react'
import NavComponent from '../HomeComponents/NavComponent'
import '../HomePage/home.css'
import './more.css'
import '../NotificationsPage/notifications.css'
import '../ProfilePage/profile.css'
import ToggleSwitch from '../Components/ToggleSwitch'

export default function More() {
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
                    <NavComponent iconSource='home.png' navName="Home" navPage='/home'></NavComponent>
                    <NavComponent iconSource='search.png' navName="Search" navPage="/search"></NavComponent>
                    <NavComponent iconSource='messages.png' navName="Messages" navPage="/messages"></NavComponent>
                    <NavComponent iconSource='notifications.png' navName="Notifications" navPage="/notifications"></NavComponent>
                    <NavComponent iconSource='create.png' navName="Create" navPage="/create"></NavComponent>
                    <NavComponent iconSource='profile_icon.png' navName="Profile" navPage="/profile"></NavComponent>
                    <NavComponent selected='#F3F3F3' iconSource='more.png' navName="More" navPage="/more"></NavComponent>
                </div>
                <div id="sloganhome">Get Connected, Get Social</div>
            </div>

            <div className="verticalline"></div>

            <div id="morecenter">

                <div id="notificationhead">More</div>

                <div className="profileHorizontalLine" style={{ marginTop: '2px' }}></div>

                <div id="moreBody">

                    <div id="moreContainer">

                        <div style={{ padding: '9px' }}></div>

                        <div className='moreToggleSwitch'>
                            <p className="moreContent">Dark Mode</p>
                            <ToggleSwitch></ToggleSwitch>
                        </div>

                        <hr />
                        <div className='moreToggleSwitch'>
                            <p className="moreContent">Private Account</p>
                            <ToggleSwitch ></ToggleSwitch>
                        </div>

                        <hr />
                        <div className='moreToggleSwitch'>
                            <p className="moreContent">Notifications</p>
                            <ToggleSwitch></ToggleSwitch>
                        </div>

                        <hr />
                        <p className="moreContent" id='deleteAccount'>Delete Account</p>

                        <hr />
                        <p className="moreContent">Report Problem</p>

                        <hr />
                        <p className="moreContent">About</p>

                        <hr />
                        <p className="moreContent">Help</p>

                        <div style={{ padding: '7px' }}></div>

                    </div>
                    <div style={{ padding: '15px' }}></div>
                </div>
            </div>

        </div >
    )
}
