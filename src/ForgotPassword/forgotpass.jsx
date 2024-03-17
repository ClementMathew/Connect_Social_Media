import { sendPasswordResetEmail, getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import app from "../Firebase/firebase";
import { Link } from "react-router-dom";
import '../AuthenticationPage/welcome.css'
import './forgotpass.css'

function ForgotPassword() {

    const [loading, setLoading] = useState(false)
    const [myalert, setMyAlert] = useState('');
    const [theError, settheError] = useState(false);
    const [toggleAlert, settoggleAlert] = useState({});

    useEffect(() => {

        if (myalert) {

            settoggleAlert({
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
                backgroundColor: myalert === "Check your Gmail !" ? 'rgb(0, 202, 30)' : 'rgb(255, 40, 40)'
            });
            settheError(true)
        }
    }, [myalert])

    const hideAlert = () => {

        settoggleAlert({
        });
        settheError(false)
        setMyAlert('')
    }

    const handleSubmit = async (e) => {

        setLoading(true)
        e.preventDefault()

        const emalVal = e.target.email.value;

        if (emalVal.includes('.com')) {

            try {
                const auth = getAuth(app);

                await sendPasswordResetEmail(auth, emalVal).then(data => {

                    console.log(data)
                    setLoading(false)
                    setMyAlert("Check your Gmail !")

                    setTimeout(() => {
                        hideAlert()
                    }, 2000
                    )
                }).catch(error => {

                    console.log(error)
                    setLoading(false)
                    setMyAlert("Check your Internet Connection !")

                    setTimeout(() => {
                        hideAlert()
                    }, 2000
                    )
                })

            } catch (error) {
                console.log(error)
            }
        }
        else {
            setLoading(false)
            setMyAlert("Invalid Email !")

            setTimeout(() => {
                hideAlert()
            }, 2000
            )
        }
    }
    return (
        <>
            <button className="backbutton">
                <Link to="/">
                    <img id="back" src="back.png" alt="back" />
                </Link>
            </button>

            <div>
                <img id='rect6' src="Rectangles/Rectangle 6.png" alt="Rectangle 6" />
                <img id='rect7' src="Rectangles/Rectangle 7.png" alt="Rectangle 7" />
                <img id='rect5' src="Rectangles/Rectangle 5.png" alt="Rectangle 5" />
                <img id='rect4' src="Rectangles/Rectangle 4.png" alt="Rectangle 4" />
                <img id='rect8' src="Rectangles/Rectangle 8.png" alt="Rectangle 8" />
                <img id='rect13' src="Rectangles/Rectangle 13.png" alt="Rectangle 13" />
                <img id='rect11' src="Rectangles/Rectangle 11.png" alt="Rectangle 11" />
                <img id='rect10' src="Rectangles/Rectangle 10.png" alt="Rectangle 10" />
            </div>

            <div id="containertop">

                <div id="forgot">

                    <img id='lets' style={{ paddingTop: '75px', paddingLeft: '115px' }} src="lets.svg" alt="lets" />

                    <div id='logincenter'>

                        <img id="connecthead" src="connecthead.png" style={{ paddingTop: '90px', paddingBottom: '20px' }} alt="connecthead" />

                        <form onSubmit={(e) => handleSubmit(e)}>
                            <input className='textbox' style={{ marginTop: '20px', marginBottom: '20px' }}
                                type="email"
                                placeholder='Enter Email'
                                name="email"
                                required
                            />
                            <br />

                            {loading ?
                                <div id='loading' style={{ height: '80px' }}>
                                    <img id='loadingBox' src='loading_box.gif' alt='loading...'></img>
                                    <p id="loading-p">Loading...</p>
                                </div>
                                :
                                <button className='loginButton' type="submit" style={{ marginBottom: '30px' }}>
                                    Reset Password
                                </button>
                            }
                        </form>

                        <ul id='mySection'>
                            <hr id="mySection-hr" />
                            <p id="mySection-p">Info</p>
                            <hr id="mySection-hr" />
                        </ul>

                        <p className="info" style={{ marginTop: '30px' }}><strong>Step 1 :</strong> Reset link is send to your email address.</p>

                        <p className="info" style={{ marginTop: '22px', marginBottom: '22px' }}><strong>Step 2 :</strong> Enter the new password.</p>

                        <p className="info"><strong>Step 3 :</strong> Relogin to your account with new password.</p>
                    </div>

                </div>
                {
                    theError ? <div style={toggleAlert}>
                        {myalert}
                    </div> : ''
                }

            </div>
        </>
    )
}
export default ForgotPassword;