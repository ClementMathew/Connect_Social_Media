import React from 'react'
import '../HomePage/SuggestComponent.css'
import './ChatComponent.css'

export default function ChatComponent(props) {

    return (
        <div id='chatPerson' style={props.selected ? { backgroundColor: '#F3F3F3' } : {}}>
            <div id='profilepic' style={{ height: '60px', width: '60px' }}>
                <img id='profilepic-img' src={props.picSource} alt="profile picture" />
            </div >
            <div id="nametag" style={{ marginLeft: '24px', marginRight: '24px' }}>
                <p id="username">
                    {props.userName}
                </p>
                <p id="mainname">
                    {props.mainName}
                </p>
            </div>
            <img id='newDot' src="dot.png" alt="new dot" />
            <p id='msgCount'>{props.messageCount} new messages</p>
        </ div >
    )
}
