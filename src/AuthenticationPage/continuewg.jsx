import React, { useState } from 'react'
import './register.css'
import './welcome.css'
import app from '../Firebase/firebase';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { useNavigate, useLocation } from 'react-router-dom';

export default function ContinueWithGoogle() {

    const [phone, setPhoneNumber] = useState('');
    const [userName, setUserName] = useState('');

    const [mypasserror, setMyPassError] = useState('');
    const [togglePassError, settogglePassError] = useState({});

    const [loading, setLoading] = useState(false)

    const navigate = useNavigate();
    const location = useLocation();
    const userData = location.state

    const handleSubmit = async (e) => {

        setLoading(true)
        e.preventDefault();

        try {
            const db = getFirestore(app);
            const userDocRef = doc(db, 'Users', userData.uid);

            await setDoc(userDocRef, {
                username: userName,
                name: userData.name,
                email: userData.email,
                phone: ("+91" + phone),
                posts: {},
                recenthistory: {},
                notificationslist: {},
                profilepicurl: '',
                followers: {},
                following: {},
                bio: "",
                darkmode: false,
                public: false,
                notifications: false
            });
            userData.username = userName
            userData.phone = ("+91" + phone)

            navigate('/home', { state: userData })
            // You can send a request to your authentication server here
        } catch (error) {

            setLoading(false)
            setMyPassError('Check Internet Connection !')
            showPassError()
            setTimeout(() => {
                hidePassError()
            }, 2000
            )
        }
        // You can send a request to your authentication server here
    };

    const showPassError = () => {
        settogglePassError({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            borderRadius: '15px',
            color: 'white',
            fontWeight: 'bold',
            boxShadow: '0px 0px 7px 0px rgb(68, 68, 68)',
            fontSize: '18px',
            fontFamily: "'Times New Roman', Times, serif",
            letterSpacing: '1px',
            bottom: '50px',
            height: '50px',
            width: '400px',
            backgroundColor: 'rgb(255, 40, 40)'
        });
    }

    const hidePassError = () => {
        settogglePassError({
        });
        setMyPassError('')
    }

    return (
        <>
            <img id="logo" src="logo.png" alt="Logo" />

            <div id="rectangles">
                <img id='rect6' src="Rectangles/Rectangle 6.png" alt="Rectangle 6" />
                <img id='rect7' src="Rectangles/Rectangle 7.png" alt="Rectangle 7" />
                <img id='rect5' src="Rectangles/Rectangle 5.png" alt="Rectangle 5" />
                <img id='rect4' src="Rectangles/Rectangle 4.png" alt="Rectangle 4" />
                <img id='rect8' src="Rectangles/Rectangle 8.png" alt="Rectangle 8" />
                <img id='rect13' src="Rectangles/Rectangle 13.png" alt="Rectangle 13" />
                <img id='rect11' src="Rectangles/Rectangle 11.png" alt="Rectangle 11" />
                <img id='rect10' src="Rectangles/Rectangle 10.png" alt="Rectangle 10" />
            </div>

            <img id="slogan" src="slogan.svg" alt="Slogan" />

            <div id="containertop">
                <div id="signup" style={{ height: '530px', borderRadius: '65px' }}>

                    <img id='lets' style={{ paddingTop: '90px', paddingLeft: '115px' }} src="lets.svg" alt="lets" />

                    <div id='logincenter'>

                        <img src="connecthead.png" style={{ paddingTop: '105px', paddingBottom: '40px' }} alt="connecthead" id="connecthead" />

                        <form onSubmit={handleSubmit}>

                            <input
                                className='textbox'
                                type="text"
                                placeholder='Enter Username'
                                pattern="[a-z._0-9]+"
                                title='Enter only small letters'
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                required
                            />
                            <br />
                            <input
                                className='textbox'
                                type="tel"
                                maxLength='10'
                                pattern="[0-9]{10,}"
                                title="Please enter a valid phone number (10 digits)"
                                placeholder='Enter Phone Number'
                                value={phone}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                            />
                            <br />

                            {loading ?
                                <div id='loading' style={{ marginTop: '20px' }}>
                                    <img id='loadingBox' src='loading_box.gif' alt='loading...'></img>
                                    <p>Loading...</p>
                                </div>
                                :
                                <button type="submit" className='loginButton' style={{ marginBottom: '40px', marginTop: '35px' }}>
                                    Continue
                                </button>
                            }
                            <br />

                        </form>
                    </div>
                </div>

                <div style={togglePassError}>
                    {mypasserror}
                </div>
            </div>
        </ >
    )
}
