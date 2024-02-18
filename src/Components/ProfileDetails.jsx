import React from 'react'

export default function ProfileDetails(props) {
    return (
        <div style={{ textAlign: 'initial', marginLeft: '120px', marginTop: '50px' }}>
            <p style={{ fontFamily: 'Arial', fontSize: '18px', lineHeight: '8px' }}>{props.detailType}</p>
            <p style={{ fontFamily: 'Arial', fontSize: '18px', fontWeight: 'bold', lineHeight: '8px' }}>{props.detailName}</p>
        </div>
    )
}
