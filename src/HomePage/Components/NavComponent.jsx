import React from 'react'
import './NavComponent.css'

export default function NavComponent(props) {
    return (
        <div id='nav'>
            <img src={props.iconSource} alt="navIcon" />
            <p>{props.navName}</p>
        </div>
    )
}
