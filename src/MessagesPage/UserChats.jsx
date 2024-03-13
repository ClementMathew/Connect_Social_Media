import React from 'react'

export default function UserChats(props) {

    const sentStyle = {
        backgroundColor: '#FF9100',
        width: '700px',
        padding: '17px',
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
        width: '700px',
        padding: '17px',
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
        <div style={props.chatType == "Sent" ? sentStyle : recieveStyle} >Hi Good Morning Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi temporibus quam nobis labore aliquam, cum consequuntur veniam inventore corporis qui recusandae? Cum esse aliquam impedit, in error cupiditate quaerat explicabo!...</div>
    )
}
