import React from 'react'
import './PostComponent.css'

export default function PostComponent(props) {
    return (
        <div id="post">
            <div id="posthead">
                <div id="postProfilePic">
                    <img src={props.postPicSource} alt="profilepicture" />
                </div>
                <div id="postname">{props.postName}</div>
            </div>
            <div className="horizontalline"></div>
            <div id="postimage">
                <img src={props.postSource} alt="postimage" />
            </div>
            <div id="postfoot">
                <div id="likes">
                    <img src="not_like.png" alt="like" />
                    <p>{props.postLikes} Likes</p>
                </div>
                <div id="comments">
                    <img src="comment.png" alt="comment" />
                    <p>{props.postComments} Comments</p>
                </div>
                <div id="share">
                    <img src="share.png" alt="share" />
                    <p>{props.postShare} Shares</p>
                </div>
                <div id="postabout">
                    <img src="dot.png" alt="dot" />
                    <p>{props.postAbout}</p>
                </div>
            </div>
            <div className="horizontalline"></div>
        </div>
    )
}
