import React from 'react'
import { useState } from 'react'
import CreateComponent from '../CreatePage/CreateComponent'
import './messages.css'
import '../HomePage/home.css'
import MessageNavComponent from '../Components/MessageNavComponent'
import ChatComponent from '../Components/ChatComponent'
import '../NotificationsPage/notifications.css'

export default function Messages() {

    const [createToggle, setCreateToggle] = useState(false)

    const popUp = () => {
        setCreateToggle(!createToggle)
    }

    return (
        <div id="containerhome">

            <div id="messageSidebar">

                <div id="messageLogo">
                    <img src="logo.png" alt="connectlogo" />
                </div>
                <div id="stripes">
                    <div id="blackstripe"></div>
                    <div id="orangestripe"></div>
                </div>

                <div id="navhome">
                    <MessageNavComponent iconSource='home.png' navPage='/home'></MessageNavComponent>
                    <MessageNavComponent iconSource='search.png' navPage='/search'></MessageNavComponent>
                    <MessageNavComponent selected='#F3F3F3' iconSource='messages.png' navPage='/messages'></MessageNavComponent>
                    <MessageNavComponent iconSource='notifications.png' navPage='/notifications'></MessageNavComponent>

                    <div id='nav' onClick={popUp} style={{ justifyContent: 'center' }}>
                        <img style={{ margin: '0px' }} src='create.png' alt="navIcon" />
                    </div>

                    <MessageNavComponent iconSource='profile_icon.png' navPage='/profile'></MessageNavComponent>
                    <MessageNavComponent iconSource='more.png' navPage='/more'></MessageNavComponent>
                </div>
            </div>

            <div className="verticalline"></div>

            <div id="messageCenter">
                <div id="notificationhead">Messages</div>

                <div id="ChatsList">

                    <ChatComponent picSource='profile.jpg' messageCount='3' userName='__clement.m__' mainName='Clement Mathew'></ChatComponent>
                    <ChatComponent picSource='profile.jpg' messageCount='3' userName='__clement.m__' mainName='Clement Mathew'></ChatComponent>
                    <ChatComponent picSource='profile.jpg' messageCount='3' userName='__clement.m__' mainName='Clement Mathew'></ChatComponent>
                    <ChatComponent picSource='profile.jpg' messageCount='3' userName='__clement.m__' mainName='Clement Mathew'></ChatComponent>
                    <ChatComponent picSource='profile.jpg' messageCount='3' userName='__clement.m__' mainName='Clement Mathew'></ChatComponent>
                    <ChatComponent picSource='profile.jpg' messageCount='3' userName='__clement.m__' mainName='Clement Mathew'></ChatComponent>
                    <ChatComponent picSource='profile.jpg' messageCount='3' userName='__clement.m__' mainName='Clement Mathew'></ChatComponent>
                    <ChatComponent picSource='profile.jpg' messageCount='3' userName='__clement.m__' mainName='Clement Mathew'></ChatComponent>
                    <ChatComponent picSource='profile.jpg' messageCount='3' userName='__clement.m__' mainName='Clement Mathew'></ChatComponent>
                    <ChatComponent picSource='profile.jpg' messageCount='3' userName='__clement.m__' mainName='Clement Mathew'></ChatComponent>
                    <ChatComponent picSource='profile.jpg' messageCount='3' userName='__clement.m__' mainName='Clement Mathew'></ChatComponent>
                    <ChatComponent picSource='profile.jpg' messageCount='3' userName='__clement.m__' mainName='Clement Mathew'></ChatComponent>

                </div>

            </div>

            <div className="verticalline"></div>

            <div id="messageRightside">

            </div>

            <CreateComponent show={createToggle ? 'flex' : 'none'} createToggle={createToggle} setCreateToggle={setCreateToggle}></CreateComponent>

        </div>
    );
}
