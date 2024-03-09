import React from 'react'

export default function Followers(props) {

    const popDown = () => {
        props.setFollowersList(!props.followersList)
    }

    return (
        <>
            <div id='createBackContainer' onClick={popDown} style={{ display: props.show }}></div>

            <div id="createTopContainer" style={{ display: props.show }} >
                <p>Followers</p>
                <div className="horizontalline"></div>
               
            </div>

        </>
    )
}
