import React from 'react'
import NavComponent from '../HomeComponents/NavComponent'
import '../HomePage/home.css'
import './more.css'
import '../NotificationsPage/notifications.css'
import '../ProfilePage/profile.css'
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch'
import { useState } from 'react'
import '../HomeComponents/NavComponent.css'
import CreateComponent from '../CreatePage/CreateComponent';
import { useLocation } from 'react-router-dom'
import Report from './report'
import About from './about'
import Help from './help'

export default function More() {

    const [createToggle, setCreateToggle] = useState(false)
    const [reportToggle, setReportToggle] = useState(false)
    const [aboutToggle, setAboutToggle] = useState(false)
    const [helpToggle, setHelpToggle] = useState(false)

    const popUp = () => {
        setCreateToggle(!createToggle)
    }
    const popReport = () => {
        setReportToggle(!reportToggle)
    }
    const popAbout = () => {
        setAboutToggle(!aboutToggle)
    }
    const popHelp = () => {
        setHelpToggle(!helpToggle)
    }

    const location = useLocation()
    const dataToMore = location.state.data

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
                    <NavComponent iconSource='home.png' navName="Home" navPage='/home' data={dataToMore}></NavComponent>
                    <NavComponent iconSource='search.png' navName="Search" navPage="/search" data={dataToMore}></NavComponent>
                    <NavComponent iconSource='messages.png' navName="Messages" navPage="/messages" data={dataToMore}></NavComponent>
                    <NavComponent iconSource='notifications.png' navName="Notifications" navPage="/notifications" data={dataToMore}></NavComponent>

                    <div id='nav' onClick={popUp}>
                        <img src='create.png' alt="navIcon" />
                        <p>Create</p>
                    </div>

                    <NavComponent iconSource='profile_icon.png' navName="Profile" navPage="/profile" data={dataToMore}></NavComponent>
                    <NavComponent selected='#F3F3F3' iconSource='more.png' navName="More" navPage="/more" data={dataToMore}></NavComponent>
                </div>
                <div id="sloganhome">Get Connected, Get Social</div>
            </div>

            <div className="verticalline"></div>

            <div id="morecenter">

                <div id="notificationhead">More</div>

                <div className="profileHorizontalLine" style={{ marginTop: '3px' }}></div>

                <div id="moreBody">

                    <div id="moreContainer">

                        <div style={{ padding: '9px' }}></div>

                        <div className='moreToggleSwitch'>
                            <p className="moreContent">Dark Mode</p>
                            <ToggleSwitch userid={dataToMore.userid} toggle={dataToMore.darkmode} type='darkmode'></ToggleSwitch>
                        </div>

                        <hr />
                        <div className='moreToggleSwitch'>
                            <p className="moreContent">Public Account</p>
                            <ToggleSwitch userid={dataToMore.userid} toggle={dataToMore.public} type='public'></ToggleSwitch>
                        </div>

                        <hr />
                        <div className='moreToggleSwitch'>
                            <p className="moreContent">Notifications</p>
                            <ToggleSwitch userid={dataToMore.userid} toggle={dataToMore.notifications} type='notifications'></ToggleSwitch>
                        </div>

                        <hr />
                        <p className="moreContent" id='deleteAccount'>Delete Account</p>

                        <hr />
                        <p className="moreContent" onClick={popReport}>Report Problem</p>

                        <hr />
                        <p className="moreContent" onClick={popAbout} >About</p>

                        <hr />
                        <p className="moreContent" onClick={popHelp}>Help</p>

                        <div style={{ padding: '7px' }}></div>

                    </div>
                    <div style={{ padding: '15px' }}></div>
                </div>
            </div>

            <CreateComponent data={dataToMore} show={createToggle ? 'flex' : 'none'} createToggle={createToggle} setCreateToggle={setCreateToggle}></CreateComponent>

            <Report show={reportToggle ? 'flex' : 'none'} reportToggle={reportToggle} setReportToggle={setReportToggle}></Report>

            <About show={aboutToggle ? 'flex' : 'none'} aboutToggle={aboutToggle} setAboutToggle={setAboutToggle}></About>

            <Help show={helpToggle ? 'flex' : 'none'} helpToggle={helpToggle} setHelpToggle={setHelpToggle}></Help>

        </div >
    )
}
