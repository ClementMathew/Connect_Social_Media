import React from 'react'
import LikeNotification from './LikeNotification'
import ConnectRequest from './ConnectRequest'
import CommentNotification from './CommentNotification'

export default function NotificationDay(props) {
    return (
        <div style={{ paddingTop: '20px' }}>
            <p style={{ fontFamily: 'Amaranth', fontWeight: 'bold', fontSize: '20px' }}>{props.day}</p>

            <LikeNotification picSource='profile.jpg' userName='__clement.m__' ></LikeNotification>
            <ConnectRequest picSource='profile.jpg' userName='__clement.m__' ></ConnectRequest>
            <CommentNotification picSource='profile.jpg' userName='__clement.m__' ></CommentNotification>
        </div>
    )
}
