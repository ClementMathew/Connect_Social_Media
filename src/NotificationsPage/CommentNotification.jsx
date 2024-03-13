import React from 'react'

export default function CommentNotification(props) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', lineHeight: '25px' }}>

      <div style={{ cursor: 'pointer', display: 'flex', height: '52px', width: '52px' }}>

        <img style={{ borderRadius: '50%' }} src={props.picSource} alt="profile picture" />

      </div>

      <p style={{
        paddingLeft: '25px', paddingRight: '20px', fontSize: '20px',
        fontWeight: 'bold',
        fontFamily: 'Arial, Helvetica, sans-serif', cursor: 'pointer'
      }}>
        {props.userName}
      </p>

      <p style={{ fontFamily: 'Arial', fontSize: '18px' }}>
        commented on your post.
      </p>

      <img style={{ cursor: 'pointer', height: '16px', paddingLeft: '40px' }} src="not_like.png" alt="like comment" />

    </div>
  )
}
