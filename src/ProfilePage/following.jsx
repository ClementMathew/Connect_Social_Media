import React from 'react'
import '../HomePage/SuggestComponent.css'

export default function Following(props) {

    const popDown = () => {
        props.setFollowingList(!props.followingList)
    }

    return (
        <>
            <div id='createBackContainer' onClick={popDown} style={{ display: props.show }}>
            </div>

            <div id="createTopContainer" style={{ display: props.show }} >

                <p id='createTopContainer-p'>Following</p>

                <div className="horizontalline" style={{ paddingBottom: '30px' }}></div>
                {
                    Object.keys(props.data).map((key) => (

                        <div id='suggestions' key={key}>

                            <div id='profilepic'>
                                <img id='profilepic-img' src={props.data[key].profilepicurl == '' ? 'profile.png' : props.data[key].profilepicurl} alt="profile picture" />
                            </div>

                            <div id="nametag">
                                <div id="username" style={{ paddingBottom: '25px' }}>
                                    {props.data[key].username}
                                </div>
                                <div id="mainname">
                                    {props.data[key].name}
                                </div>
                            </div>

                            <button id='logOut' style={{ marginLeft: '100px', marginTop: '0px' }}>Disconnect</button>
                        </div>
                    ))
                }

            </div>

        </>
    )
}
