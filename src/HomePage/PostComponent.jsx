import { doc, getFirestore, updateDoc } from 'firebase/firestore';
import React, { useState, useEffect } from 'react'
import app from '../Firebase/firebase';

export default function PostComponent(props) {

    const likeLen = Object.keys(props.likes).length

    const [likeToggle, setLikeToggle] = useState(props.likes[props.data.uid]);
    const [likeicon, setLikeIcon] = useState('not_like.png')
    const [likeCount, setLikeCount] = useState(likeLen)

    const db = getFirestore(app)
    const docRef = doc(db, "Posts", props.postkey)

    const commentPop = () => {
        props.setCommentToggle(!props.commentToggle)
    }

    useEffect(() => {

        if (likeToggle) {

            setLikeIcon('liked.png')
            setLikeCount(likeLen + 1)

            props.likes[props.data.uid] = true

            updateDoc(docRef, {
                likes: props.likes
            })
        }
        else {

            setLikeIcon('not_like.png')
            setLikeCount(likeLen - 1)

            delete props.likes[props.data.uid]

            updateDoc(docRef, {
                likes: props.likes
            })
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
