import React from 'react'
import '../HomeComponents/SuggestComponent.css'
import { Link } from 'react-router-dom'

export default function RecentSearch(props) {
    return (
        <Link to='/searchedprofile'>
            <div style={{ marginLeft: '4.6vw', display: 'flex', alignItems: 'center', paddingTop: '10px', paddingBottom: '10px' }}>
                <div id='profilepic' style={{ cursor: 'pointer' }}>
                    <img src={props.picSource} alt="profile picture" />
                </div>
                <div id="nametag" style={{ paddingLeft: '5px' }}>
                    <p id="username" style={{ cursor: 'pointer' }}>
                        {props.userName}
                    </p>
                    <p id="mainname">
                        {props.mainName}
                    </p>
                </div>
                <div id="closebutton">
                    <img src="close.png" alt="close" />
                </div>
            </ div>
        </Link>
    )
}
