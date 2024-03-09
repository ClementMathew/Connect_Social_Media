import React from 'react'

export default function Following(props) {

    const popDown = () => {
        props.setFollowingList(!props.followingList)
    }

    return (
        <>
            <div id='createBackContainer' onClick={popDown} style={{ display: props.show }}>
            </div>

            <div id="createTopContainer" style={{ display: props.show }} >
                <p>Following</p>
                <div className="horizontalline"></div>
            </div>

        </>
    )
}
