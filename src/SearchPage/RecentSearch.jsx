import React from 'react'
import '../HomePage/SuggestComponent.css'
import { Link } from 'react-router-dom'
import './RecentSearch.css'

export default function RecentSearch(props) {

    return (
        <Link to='/searchedprofile' state={{ data: props.data, maindata: props.mainData }} id='search-click'>
            <div id='recent-box'>

                <div id='profilepic' style={{ cursor: 'pointer' }}>
                    <img id='profilepic-img' src={props.picSource == '' ? 'profile.png' : props.picSource} alt="profile picture" />
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
                    <img id='closebutton-icon' src="close.png" alt="close" />
                </div>
            </ div>
        </Link>
    )
}
