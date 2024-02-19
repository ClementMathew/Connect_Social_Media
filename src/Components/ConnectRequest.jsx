import React from 'react'

export default function ConnectRequest(props) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', lineHeight: '25px' }}>

      <div style={{ cursor: 'pointer', borderRadius: '50%', display: 'flex', overflow: 'hidden', height: '52px', width: '52px' }}>

        <img src={props.picSource} alt="profile picture" />

      </div>

      <p style={{
        paddingLeft: '25px', paddingRight: '20px', fontSize: '20px',
        fontWeight: 'bold',
        fontFamily: 'Arial, Helvetica, sans-serif', cursor: 'pointer'
      }}>
        {props.userName}
      </p>

      <p style={{ fontFamily: 'Arial', fontSize: '18px', paddingRight: '40px' }}>
        wants to connect with you.
      </p>

      <button style={{
        marginRight: '20px',
        backgroundColor: '#FF9100',
        border: 'none',
        height: '38px',
        width: '100px',
        borderRadius: '10px',
        color: 'white',
        fontWeight: ' bold',
        fontSize: '15px',
        boxShadow: '0px 0px 2px 0px rgb(128, 128, 128)',
        cursor: 'pointer'
      }}>Connect</button>

      <button style={{
        backgroundColor: '#F3F3F3',
        border: 'none',
        height: '38px',
        width: '100px',
        borderRadius: '10px',
        color: 'black',
        fontWeight: ' bold',
        fontSize: '15px',
        boxShadow: '0px 0px 3px 0px #cbcbcb',
        cursor: 'pointer'
      }}>Decline</button>

    </div >
  )
}
