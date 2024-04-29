import React, { useState } from 'react'
import './CommentBox.css'
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import app from '../Firebase/firebase';
import axios from 'axios'


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

            axios.post('http://localhost:5000/comment', { comment: currentComment })
                .then(response => {
                    if (response.data.toxicity == true)
                        delete comments[len]
                })
                .catch(error => {
                    console.error('Error:', error);
                });

            comments[len] = {
                username: props.data.username,
                profilepicurl: props.data.profilepicurl,
                text: currentComment
            }
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

                <div id='CommentList'>

                    {Object.keys(props.comment).map((key) => (

                        <div key={key}>

                            <div id='CommentsDetails'>

                                <div id='CommentsPicShape'>

                                    <img id='CommentsPic' src={props.comment[key].profilepicurl} alt="profile picture" />

                                </div>

                                <p id='CommentsUser'>
                                    {props.comment[key].username}
                                </p>

                                <p id='CommentsText'>
                                    {props.comment[key].text}
                                </p>

                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
