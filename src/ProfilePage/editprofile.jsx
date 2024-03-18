import React, { useState } from 'react'
import '../CreatePage/CreateComponent.css'
import { getFirestore, updateDoc, doc } from 'firebase/firestore';
import app from '../Firebase/firebase';

export default function EditProfile(props) {

    const popDown = () => {
        props.setEditProfileToggle(!props.editProfileToggle)
    }

    const [userName, setUserName] = useState(props.data.username);
    const [name, setName] = useState(props.data.name);
    const [phone, setPhone] = useState(props.data.phone);
    const [bio, setBio] = useState(props.data.bio);

    const handleSubmit = async () => {

        try {
            const db = getFirestore(app)
            const docRef = doc(db, "Users", props.data.uid)

            await updateDoc(docRef, {
                username: userName,
                name: name,
                phone: phone,
                bio: bio

            }).then(() => {
                popDown()
            })

            props.data.username = userName
            props.data.name = name
            props.data.phone = phone
            props.data.bio = bio

        } catch (error) {
            console.log(error)
        }
    }

    const textBoxStyle = {
        display: "flex",
        alignItems: 'center',
        justifyContent: 'end',
        marginBottom: '20px',
        fontWeight: 'bold',
        fontFamily: 'Arial'
    }

    return (
        <>
            <div id='createBackContainer' onClick={popDown} style={{ display: props.show }}></div>

            <div id="createTopContainer" style={{ display: props.show }} >

                <p id='createTopContainer-p'>Edit Profile</p>

                <div className="horizontalline"></div>

                <div >
                    <form style={{ marginTop: '60px' }}>
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
                    <button id='createTopContainer-button' style={{ marginTop: '45px' }} onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </>
    )
}
