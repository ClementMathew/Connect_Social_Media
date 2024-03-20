import React from 'react'

export default function ViewStory(props) {

    const popDown = () => {
        props.setStoryViewToggle(!props.storyViewToggle)
        props.setCurrentStoryToggle(!props.currentStoryToggle)
    }

    return (
        <>
            <div id='storyBackContainer' onClick={popDown} style={{ display: props.show }}>
            </div>

            <div id="storyTopContainer" style={{ display: props.show }} >
                <img id='storyImage' src={props.storyDatas[props.currentStory].url} alt="" />
            </div >

        </>
    )
}
