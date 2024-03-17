import React from 'react'
import './NavComponent.css'
import { Link } from 'react-router-dom'

export default function NavComponent(props) {

    return (
        <Link id='navigation' to={props.navPage} state={{ data: props.data}}>
            <div id='nav' style={{ backgroundColor: props.selected }}>
                <img id='nav-img' src={props.iconSource} alt="navIcon" />
                <p id='nav-p'>{props.navName}</p>
            </div>
        </Link>
    )
}
