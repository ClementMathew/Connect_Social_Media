import React from 'react'
import './SuggestComponent.css'

export default function SuggestComponent() {
    return (
        <div id='suggestions'>
            <div id='profilepic'>
                <img src="profile.jpg" alt="profile picture" />
            </div>
            <div id="nametag">
                <p id="username">
                    _clement.m_
                </p>
                <p id="mainname">
                    Clement Mathew
                </p>
            </div>
            <div id="followbutton">
                <button></button>
            </div>
        </div>
    )
}
