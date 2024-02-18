import React from 'react'
import './StoryComponent.css'

export default function StoryComponent(props) {
    return (
        <div id='story'>
            <div id="storyborder">
                <div id='storyProfilePic'>
                    <img src={props.storyPicSource} alt="profile picture" />
                </div>
            </div>
            <div id="storyname">{props.storyName}</div>
        </div>
    )
}