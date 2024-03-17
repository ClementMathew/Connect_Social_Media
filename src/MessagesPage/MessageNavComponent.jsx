import React from 'react'
import { Link } from 'react-router-dom'
import '../Components/NavComponent.css'

export default function MessageNavComponent(props) {
    return (
        <Link id='navigation' to={props.navPage} state={{ data: props.data }}>
            <div id='nav' style={{ backgroundColor: props.selected, justifyContent: 'center' }}>
                <img id='nav-img' style={{ margin: '0px' }} src={props.iconSource} alt="navIcon" />
            </div>
        </Link>
    )
}
