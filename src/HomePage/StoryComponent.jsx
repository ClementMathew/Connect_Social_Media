import React from 'react'
import './StoryComponent.css'

export default function StoryComponent(props) {
    return (
        <div onClick={props.onClick} id='story'>
            <div id="storyborder">
                <div id='storyProfilePicShape'>
                    <img id='storyProfilePic' src={props.storyPicSource === '' ? 'profile.png' : props.storyPicSource} alt="profile picture" />
                </div>
            </div>
            <div id="storyname">{props.storyName.slice(0, 10).concat('..')}</div>
        </div>
    )
}

