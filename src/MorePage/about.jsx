import React from 'react'

export default function About(props) {

    const popDown = () => {
        props.setAboutToggle(!props.aboutToggle)
    }

    return (
        <>
            <div id='createBackContainer' onClick={popDown} style={{ display: props.show }}>
            </div>

            <div id="createTopContainer" style={{ display: props.show }} >

                <p id='createTopContainer-p'>About</p>

                <div className="horizontalline"></div>
            </div>

        </>
    )
}
