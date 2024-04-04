
import React from 'react'

export default function UserChats(props) {

    const sentStyle = {
        backgroundColor: '#FF9100',
        width: 'auto',
        padding: '17px 29px',
        color: 'white',
        fontFamily: 'Arial',
        fontSize: '16px',
        lineHeight: '22px',
        margin: '10px 30px',
        borderBottomRightRadius: '0px',
        borderTopLeftRadius: '25px',
        borderTopRightRadius: '25px',
        borderBottomLeftRadius: '25px',
        float: 'right'
    }

    const recieveStyle = {
        backgroundColor: '#F3F3F3',
        width: 'auto',
        padding: '17px 29px',
        fontFamily: 'Arial',
        fontSize: '16px',
        lineHeight: '22px',
        margin: '10px 30px',
        borderBottomRightRadius: '25px',
        borderTopLeftRadius: '25px',
        borderTopRightRadius: '25px',
        borderBottomLeftRadius: '0px',
        float: 'left'
    }

    return (
        <div style={props.chatType == "Sent" ? sentStyle : recieveStyle} >{props.msg}</div>
    )
}
