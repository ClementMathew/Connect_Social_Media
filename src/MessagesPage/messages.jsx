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
                    <ChatComponent picSource='profile.jpg' messageCount='3' userName='__clement.m__' mainName='Clement Mathew'></ChatComponent>
                    <ChatComponent picSource='profile.jpg' messageCount='3' userName='__clement.m__' mainName='Clement Mathew'></ChatComponent>
                    <ChatComponent picSource='profile.jpg' messageCount='3' userName='__clement.m__' mainName='Clement Mathew'></ChatComponent>

                    <div style={{ padding: '60px' }}></div>
                </div>

            </div>

            <div className="verticalline"></div>

            <div id="messageRightside">

                <div id="chattingTop">

                    <div id='profilepic' style={{ height: '60px', width: '60px' }}>
                        <img src='profile.jpg' alt="profile picture" />
                    </div >
                    <div id="nametag" style={{ marginLeft: '24px', marginRight: '38vw' }}>
                        <p id="username">
                            __clement.m__
                        </p>
                        <p id="mainname">
                            Clement Mathew
                        </p>
                    </div>

                    <img className='callSize' src="phone.png" alt="phone call" />
                    <img className='callSize' style={{ height: '36px' }} src="video.png" alt="video call" />
                    <img className='callSize' style={{ height: '29px' }} src="options.png" alt="options" />
                </div>

                <div className="horizontalline" style={{ width: '80vw' }}></div>

                <div id="chattingBottom">
                    <input type="text" placeholder='Enter Something ...' />
                </div>
            </div>

            <CreateComponent show={createToggle ? 'flex' : 'none'} createToggle={createToggle} setCreateToggle={setCreateToggle}></CreateComponent>

        </div>
    );
}
