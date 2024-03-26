import React, { useState, useEffect } from 'react'

export default function PostComponent(props) {

    const [likeToggle, setLikeToggle] = useState(false);
    const [likeicon, setLikeIcon] = useState('not_like.png')
    const [likeCount, setLikeCount] = useState(2)

    const commentPop = () => {
        props.setCommentToggle(!props.commentToggle)
    }

    useEffect(() => {

        if (likeToggle) {

            setLikeIcon('liked.png')
            setLikeCount(prevlikeCount => prevlikeCount + 1)
        }
        else {

            setLikeIcon('not_like.png')
            setLikeCount(prevlikeCount => prevlikeCount - 1)
        }
    }, [likeToggle])

    const handleLike = () => {
        setLikeToggle(!likeToggle)
    }

    return (
        <div onClick={props.onClick}>
            <div id="posthead">

                <div id="postProfilePicShape">
                    <img id="postProfilePic" src={props.profilepicurl == "" ? 'profile.png' : props.profilepicurl} alt="profilepicture" />
                </div>
                <div id="postname">{props.username}</div>
            </div>

            <div id="postimage">
                <img src={props.url} alt="postimage" />
            </div>

            <div id="postfoot">

                <div id="likes">
                    <img id='likes-img' onClick={handleLike} src={likeicon} alt="like" />
                    <p id='likes-p'>{likeCount} Likes</p>
                </div>

                <div id="comments">
                    <img id='comments-img' onClick={commentPop} src="comment.png" alt="comment" />
                    <p id='comments-p'>{Object.keys(props.comments).length} Comments</p>
                </div>

                <div id="share">
                    <img id="share-img" src="share.png" alt="share" />
                    <p id='share-p'>{props.share} Shares</p>
                </div>

                <div id="postabout">
                    <img id='postabout-img' src="dot.png" alt="dot" />
                    <p id='postabout-p'>{props.about}</p>
                </div>
            </div>

            <div className="horizontalline"></div>
        </div>
    )
}
