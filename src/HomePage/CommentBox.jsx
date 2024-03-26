import React, { useState } from 'react'
import './CommentBox.css'
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import app from '../Firebase/firebase';

export default function CommentBox(props) {

    const [currentComment, setCurrentComment] = useState('');

    const popDown = async () => {

        const db = getFirestore(app)
        const docRef = doc(db, "Posts", props.commentKey)

        updateDoc(docRef, {
            comments: props.comment
        })

        props.setCommentToggle(!props.commentToggle)
    }

    const handleComment = async () => {

        const comments = props.comment
        const len = Object.keys(comments).length

        if (currentComment !== '') {
            comments[len] = currentComment
        }
        props.setComment(comments)
        setCurrentComment('')
    }

    return (
        <>
            <div id='createBackContainer' onClick={popDown} style={{ display: props.show }}>
            </div>

            <div id="commentTopContainer" style={{ display: props.show }} >
                <p id='commentTopContainer-p'>Comments</p>

                <div className="horizontalline"></div>

                <div>
                    <input id='CommentsInput' placeholder='Enter Something ...' value={currentComment} onChange={(e => { setCurrentComment(e.target.value) })} />
                    <button id='CommentsDone' onClick={handleComment}>Post</button>
                </div>

                {Object.keys(props.comment).map((key) => (
                    <div key={key}>
                        <p>{props.comment[key]}</p>
                    </div>
                ))}
            </div>
        </>
    )
}
