import React from 'react'

export default function Help(props) {

    const popDown = () => {
        props.setHelpToggle(!props.helpToggle)
    }

    return (
        <>
            <div id='createBackContainer' onClick={popDown} style={{ display: props.show }}>
            </div>

            <div id="createTopContainer" style={{ display: props.show }} >

                <p id='createTopContainer-p'>Help</p>

                <div className="horizontalline"></div>
            </div>
        </>
    )
}
