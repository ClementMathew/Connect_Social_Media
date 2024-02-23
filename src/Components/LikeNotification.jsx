import React from 'react'

export default function LikeNotification(props) {
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
        liked your post.
      </p>

    </div>
  )
}
