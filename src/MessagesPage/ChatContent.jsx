// import React from 'react'

// export default function ChatContent(props) {
//     return (
//         <div id="messageRightside">

//             <div id="chattingTop">

//                 <div id='profilepic' style={{ height: '60px', width: '60px' }}>
//                     <img id='profilepic-img' src={props.messagePerson.profilepicurl ? props.messagePerson.profilepicurl : 'profile.png'} alt="profile picture" />
//                 </div >
//                 <div id="nametag" style={{ marginLeft: '24px', marginRight: '38vw' }}>
//                     <p id="username">
//                         {props.messagePerson.username}
//                     </p>
//                     <p id="mainname">
//                         {props.messagePerson.name}
//                     </p>
//                 </div>

//                 <img className='callSize' src="phone.png" alt="phone call" />
//                 <img className='callSize' style={{ height: '36px' }} src="video.png" alt="video call" />
//                 <img className='callSize' style={{ height: '29px' }} src="options.png" alt="options" />
//             </div>

//             <div className="horizontalOrange"></div>

//             <div id="userChats">

//                 <div style={{ padding: '10px' }}></div>
//                 {
//                     Object.keys(props.messages).map((key) => (

//                         <ChatBubble key={key} chatType={props.messages[key].send ? "Sent" : "Recieve"} msg={props.messages[key].text}></ChatBubble>
//                     ))
//                 }
//             </div>

//             <div id="chattingBottom">

//                 <div id="chatTyping">
//                     <img id='chatTyping-img' src="smiley.png" alt="smiley" />
//                     <input id='chatTyping-input' value={props.newMessage} onChange={(e) => setNewMessage(e.target.value)} type="text" placeholder='Enter Something ...' />
//                 </div>

//                 <div id="chatSend">
//                     {/*
//                             <button onClick={startRecording} disabled={isRecording}>Start Recording</button>
//                             <button onClick={stopRecording} disabled={!isRecording}>Stop Recording</button>
//                             <button onClick={handlePlayback}>Play Recorded Audio</button> */}

//                     <img id='chatSend-img' src="voice.png" alt="voice" />
//                     <img id='chatSend-img' src="gallery.png" alt="gallery" />
//                     <button onClick={handleMessageSubmit} id="chatSendButton">Send</button>
//                 </div>
//             </div>
//         </div>
//     )
// }
