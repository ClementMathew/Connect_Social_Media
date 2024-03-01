import React, { useState } from 'react'
import '../CreatePage/CreateComponent.css'

export default function EditProfile(props) {

    const popDown = () => {
        props.setEditProfileToggle(!props.editProfileToggle)
    }

    const [userName, setUserName] = useState();
    const [name, setName] = useState();
    const [phone, setPhone] = useState();
    const [bio, setBio] = useState();

    const handleSubmit = () => {

    }

    const textBoxStyle = {
        display: "flex",
        alignItems: 'center',
        justifyContent: 'end',
        marginBottom: '10px',
        fontWeight: 'bold',
        fontFamily: 'Arial'
    }

    return (
        <>
            <div id='createBackContainer' onClick={popDown} style={{ display: props.show }}></div>

            <div id="createTopContainer" style={{ display: props.show }} >
                <p>Edit Profile</p>
                <div className="horizontalline"></div>
                <div >
                    <form onSubmit={handleSubmit} style={{ marginTop: '50px' }}>
                        <label style={textBoxStyle} htmlFor="input" >Username :
                            <input
                                className='textbox'
                                type="text"
                                placeholder=''
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                required
                            />
                            <br />
                        </label>
                        <label style={textBoxStyle} htmlFor="input" >Name :
                            <input
                                className='textbox'
                                type="text"
                                placeholder=''
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <br />
                        </label>
                        <label style={textBoxStyle} htmlFor="input" >Phone :
                            <input
                                className='textbox'
                                type="text"
                                placeholder=''
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                            <br />
                        </label>
                        <label style={textBoxStyle} htmlFor="input" >Bio :
                            <input
                                className='textbox'
                                type="text"
                                placeholder='Add Bio'
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                required
                            />
                            <br />
                        </label>

                    </form>
                </div>
                <button>Select from PC</button>
            </div>
        </>
    )
}
