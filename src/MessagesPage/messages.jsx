import React, { useState, useEffect, useRef } from 'react'
import CreateComponent from '../CreatePage/CreateComponent'
import './messages.css'
import '../HomePage/home.css'
import MessageNavComponent from './MessageNavComponent'
import ChatComponent from './ChatComponent'
import '../NotificationsPage/notifications.css'
import UserChats from './UserChats'
import { useLocation } from 'react-router-dom'
import { getDatabase, ref, onValue, push, set } from 'firebase/database'
import app from '../Firebase/firebase'

export default function Messages() {

    const [createToggle, setCreateToggle] = useState(false)
    const location = useLocation()
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [chatList, setChatList] = useState({});

    const [isRecording, setIsRecording] = useState(false);
    const [audioURL, setAudioURL] = useState(null);
    const mediaRecorder = useRef(null);
    const chunks = useRef([]);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder.current = new MediaRecorder(stream);
            mediaRecorder.current.addEventListener('dataavailable', handleDataAvailable);
            mediaRecorder.current.start();
            setIsRecording(true);
        } catch (error) {
            console.error('Error accessing microphone:', error);
        }
    };

    const stopRecording = () => {
        if (mediaRecorder.current && mediaRecorder.current.state !== 'inactive') {
            mediaRecorder.current.stop();
            setIsRecording(false);
        }
    };

    const handleDataAvailable = (event) => {
        if (event.data.size > 0) {
            chunks.current.push(event.data);
            console.log(chunks.current[0])
        }
    };

    const handlePlayback = () => {
        if (chunks.current.length === 0) {
            console.warn('No recorded audio available');
            return;
        }
        const blob = new Blob(chunks.current, { type: 'audio/wav' });
        const audioURL = URL.createObjectURL(blob);
        setAudioURL(audioURL);

        const audio = new Audio(audioURL);
        audio.onended = () => {
            URL.revokeObjectURL(audioURL); // Clean up the object URL
            setAudioURL(null); // Reset audioURL state after playback
        };

        audio.onerror = (error) => {
            console.error('Error playing audio:', error);
        };

        audio.play();
    };

    let messagePerson = null

    const dataToMessages = location.state.data

    if (location.state.msgdata) {
        messagePerson = location.state.msgdata
    }

    const db = getDatabase(app)

    useEffect(() => {

        const messagesRef = ref(db, 'Messages');

        onValue(messagesRef, (snapshot) => {

            const data = snapshot.val();
            let chat = {}

            if (data) {
                Object.keys(data).map((key) => {

                    const users = key.split('&')

                    if (users.includes((dataToMessages.username).split('.').join('*'))) {

                        Object.keys(data[key]).map((key2) => {

                            if (data[key][key2].username === (dataToMessages.username)) {

                                chat = data[key][key2]
                                chat.send = true
                            }
                        })
                        setMessages(data[key]);

                    }
                })
            }
        });
    }, []);


    const handleMessageSubmit = (e) => {
        e.preventDefault();

        let sortUsers = []

        if (newMessage.trim() !== '') {

            sortUsers.push((dataToMessages.username).split('.').join('*'))
            sortUsers.push((messagePerson.username).split('.').join('*'))

            sortUsers.sort()
            const id = sortUsers.join('&')

            const messagesRef = ref(db, 'Messages/' + id);

            push(messagesRef, {
                username: dataToMessages.username,
                text: newMessage,
                timestamp: Date.now()
            });

            setNewMessage('');
        }
    };

    const popUp = () => {
        setCreateToggle(!createToggle)
    }

    return (
        <div id="containerhome">

            <div id="messageSidebar">

                <div id="messageLogo">
                    <img id='messageLogo-img' src="logo.png" alt="connectlogo" />
                </div>

                <div id="stripes">
                    <div id="blackstripe"></div>
                    <div id="orangestripe"></div>
                </div>

                <div id="navhome">
                    <MessageNavComponent iconSource='home.png' navPage='/home' data={dataToMessages}></MessageNavComponent>
                    <MessageNavComponent iconSource='search.png' navPage='/search' data={dataToMessages}></MessageNavComponent>
                    <MessageNavComponent selected='#F3F3F3' iconSource='messages.png' navPage='/messages' data={dataToMessages}></MessageNavComponent>
                    <MessageNavComponent iconSource='notifications.png' navPage='/notifications' data={dataToMessages}></MessageNavComponent>

                    <div id='nav' onClick={popUp} style={{ justifyContent: 'center' }}>
                        <img id='nav-img' style={{ margin: '0px' }} src='create.png' alt="navIcon" />
                    </div>

                    <MessageNavComponent iconSource='profile_icon.png' navPage='/profile' data={dataToMessages}></MessageNavComponent>
                    <MessageNavComponent iconSource='more.png' navPage='/more' data={dataToMessages}></MessageNavComponent>
                </div>
            </div>

            <div className="verticalline"></div>

            <div id="messageCenter">

                <div id="notificationhead">Messages</div>

                <div id="ChatsList">
                    {
                        Object.keys(chatList).map((key) => {

                            <ChatComponent key={key} selected={true} picSource='profile.jpg' messageCount='3' userName='__clement.m__' mainName='Clement Mathew'></ChatComponent>
                        })
                    }

                    <div style={{ padding: '60px' }}></div>
                </div>

            </div>

            <div className="verticalline"></div>

            {messagePerson !== null ?

                <div id="messageRightside">

                    <div id="chattingTop">

                        <div id='profilepic' style={{ height: '60px', width: '60px' }}>
                            <img id='profilepic-img' src={messagePerson.profilepicurl ? messagePerson.profilepicurl : 'profile.png'} alt="profile picture" />
                        </div >
                        <div id="nametag" style={{ marginLeft: '24px', marginRight: '38vw' }}>
                            <p id="username">
                                {messagePerson.username}
                            </p>
                            <p id="mainname">
                                {messagePerson.name}
                            </p>
                        </div>

                        <img className='callSize' src="phone.png" alt="phone call" />
                        <img className='callSize' style={{ height: '36px' }} src="video.png" alt="video call" />
                        <img className='callSize' style={{ height: '29px' }} src="options.png" alt="options" />
                    </div>

                    <div className="horizontalOrange"></div>

                    <div id="userChats">

                        <div style={{ padding: '10px' }}></div>
                        {
                            Object.keys(messages).map((key) => (

                                <UserChats key={key} chatType={messages[key].send ? "Sent" : "Recieve"} msg={messages[key].text}></UserChats>
                            ))
                        }
                    </div>

                    <div id="chattingBottom">

                        <div id="chatTyping">
                            <img id='chatTyping-img' src="smiley.png" alt="smiley" />
                            <input id='chatTyping-input' value={newMessage} onChange={(e) => setNewMessage(e.target.value)} type="text" placeholder='Enter Something ...' />
                        </div>

                        <div id="chatSend">
                            {/* 
                            <button onClick={startRecording} disabled={isRecording}>Start Recording</button>
                            <button onClick={stopRecording} disabled={!isRecording}>Stop Recording</button>
                            <button onClick={handlePlayback}>Play Recorded Audio</button> */}

                            <img id='chatSend-img' src="voice.png" alt="voice" />
                            <img id='chatSend-img' src="gallery.png" alt="gallery" />
                            <button onClick={handleMessageSubmit} id="chatSendButton">Send</button>
                        </div>
                    </div>
                </div>

                :
                ''
            }

            <CreateComponent data={dataToMessages} show={createToggle ? 'flex' : 'none'} createToggle={createToggle} setCreateToggle={setCreateToggle}></CreateComponent>

        </div>
    );
}
