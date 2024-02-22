import React from 'react'
import { Link } from 'react-router-dom'
import '../HomeComponents/NavComponent.css'

export default function MessageNavComponent(props) {
    return (
        <Link id='navigation' to={props.navPage}>
            <div id='nav' style={{ backgroundColor: props.selected }}>
                <img src={props.iconSource} alt="navIcon" />
            </div>
        </Link>
    )
}
