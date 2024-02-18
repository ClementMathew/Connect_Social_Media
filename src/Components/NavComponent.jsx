import React from 'react'
import './NavComponent.css'
import { Link } from 'react-router-dom'

export default function NavComponent(props) {
    return (
        <Link id='navigation' to={props.navPage}>
            <div id='nav'>
                <img src={props.iconSource} alt="navIcon" />
                <p>{props.navName}</p>
            </div>
        </Link>
    )
}
