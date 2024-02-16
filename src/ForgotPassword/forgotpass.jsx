import { sendPasswordResetEmail, getAuth } from "firebase/auth";
import React from "react";
import app from "../Firebase/firebase";
import { Link, useNavigate } from "react-router-dom";
import './forgotpass.css'

function ForgotPassword() {

    const auth = getAuth(app);
    const history = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        const emalVal = e.target.email.value;
        sendPasswordResetEmail(auth, emalVal).then(data => {
            alert("Check your gmail")
            history("/")
        }).catch(err => {
            alert(err.code)
        })
    }
    return (
        <div id='containerbackg'>
            <img id="back" src="back.png" alt="back" />
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
            <div id="containertop">
                <div id="login">
                    <img id='lets' style={{ paddingTop: '72px', paddingLeft: '115px' }} src="lets.svg" alt="lets" />
                    <div id='logincenter'>
                        <img src="connecthead.png" style={{ paddingTop: '90px', paddingBottom: '20px' }} alt="connecthead" id="connecthead" />
                        <form onSubmit={handleSubmit}>
                            <input className='textbox'
                                type="email"
                                placeholder='Enter Email'
                                required
                            />
                            <br />
                            <button type="submit" className='loginButton'>
                                Reset Password
                            </button>
                        </form>
                        <ul id='mySection'>
                            <hr />
                            <p>Info</p>
                            <hr />
                        </ul>
                        <p className="info"><strong>Step 1 </strong>: Reset link is send to your email address.</p>
                        <p className="info"><strong>Step 2</strong> : Enter the new password.</p>
                    </div>
                </div>
            </div>
        </div>
        // <div className="App">
        //     <h1>Forgot Password</h1>
        //     <form onSubmit={(e) => handleSubmit(e)}>
        //         <input name="email" /><br /><br />
        //         <button>Reset</button>
        //     </form>
        // </div>
    )
}
export default ForgotPassword;