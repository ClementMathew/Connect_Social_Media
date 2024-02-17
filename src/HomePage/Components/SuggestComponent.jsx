import React from 'react'
import './SuggestComponent.css'

export default function SuggestComponent(props) {
    return (
        <div id='suggestions'>
            <div id='profilepic'>
                <img src={props.picSource} alt="profile picture" />
            </div>
            <div id="nametag">
                <p id="username">
                    {props.userName}
                </p>
                <p id="mainname">
                    {props.mainName}
                </p>
            </div>
            <div id="followbutton">
                <button>Connect</button>
            </div>
        </div>
    )
}
