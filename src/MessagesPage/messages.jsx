import React, { useState, useEffect, useRef } from 'react'
import CreateComponent from '../CreatePage/CreateComponent'
import './messages.css'
import '../HomePage/home.css'
import MessageNavComponent from './MessageNavComponent'
import ChatComponent from './ChatComponent'
import '../NotificationsPage/notifications.css'
import ChatBubble from './ChatBubble'
import { useLocation } from 'react-router-dom'
import { getDatabase, ref, onValue, push, set } from 'firebase/database'
import app from '../Firebase/firebase'
import ChatContent from './ChatContent'

export default function Messages() {

    const [createToggle, setCreateToggle] = useState(false)
    const location = useLocation()

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [chatList, setChatList] = useState({});
    const [selectedChat, setSelectedChat] = useState({});
    const [selectedChatToggle, setSelectedChatToggle] = useState(false);
    let chatListTemp = {};

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

                            users.forEach(element => {

                                if (element !== dataToMessages.username) {

                                    chatListTemp[data[key][key2].username] = data[key][key2]
                                    setChatList(chatListTemp)
                                }
                            });

                            if (data[key][key2].username !== (dataToMessages.username)) {

                                chat = data[key][key2]
                                chat.send = true
                            }
                        })
                        if (messagePerson) {
                            if (users.includes((messagePerson.username).split('.').join('*')))
                                setMessages(data[key]);
                        }
                        else {
                            setMessages(data[key])
                        }
                    }
                })
            }
        });
    }, [selectedChatToggle]);


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
                name: messagePerson.name,
                username: messagePerson.username,
                profilepicurl: messagePerson.profilepicurl,
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
                        Object.keys(chatList).map((key) => (

                            chatList[key].username !== dataToMessages.username ?

                                <ChatComponent key={key} onClick={() => {
                                    setSelectedChat(chatList[key])
                                    setSelectedChatToggle(true)
                                }} picSource={chatList[key].profilepicurl ? chatList[key].profilepicurl : 'profile.png'} messageCount='3' userName={chatList[key].username} mainName='3'></ChatComponent>
                                : ''))
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

                                <ChatBubble key={key} chatType={messages[key].send ? "Sent" : "Recieve"} msg={messages[key].text}></ChatBubble>
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
                (selectedChatToggle ?
                    <div id="messageRightside">

                        <div id="chattingTop">

                            <div id='profilepic' style={{ height: '60px', width: '60px' }}>
                                <img id='profilepic-img' src={selectedChat.profilepicurl ? selectedChat.profilepicurl : 'profile.png'} alt="profile picture" />
                            </div >
                            <div id="nametag" style={{ marginLeft: '24px', marginRight: '38vw' }}>
                                <p id="username">
                                    {selectedChat.username}
                                </p>
                                <p id="mainname">
                                    {selectedChat.name}
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

                                    <ChatBubble key={key} chatType={messages[key].send ? "Sent" : "Recieve"} msg={messages[key].text}></ChatBubble>
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
                    : '')

            }

            <CreateComponent data={dataToMessages} show={createToggle ? 'flex' : 'none'} createToggle={createToggle} setCreateToggle={setCreateToggle}></CreateComponent>

        </div>
    );
}
