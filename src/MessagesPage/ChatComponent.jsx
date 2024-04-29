import React from 'react'
import '../HomePage/SuggestComponent.css'
import './ChatComponent.css'

export default function ChatComponent(props) {

    return (
        <div onClick={props.onClick} id='chatPerson' style={props.selected ? { backgroundColor: '#F3F3F3' } : {}}>
            <div id='profilepic' style={{ height: '60px', width: '60px' }}>
                <img id='profilepic-img' src={props.picSource} alt="profile picture" />
            </div >
            <div id="nametag" style={{ marginLeft: '24px', marginRight: '24px' }}>
                <p id="username">
                    {props.userName}
                </p>
                <p id="mainname">
                    {props.messageCount} new messages
                </p>
            </div>
            <div id='chatDot'>
                <p id='msgCount'>{props.messageCount}</p>
            </div>
        </ div >
    )
}
