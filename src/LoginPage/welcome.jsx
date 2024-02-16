
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import app from "../Firebase/firebase";
import { getAuth } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import './welcome.css'

const SignIn = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const auth = getAuth(app);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your authentication logic here
    signInWithEmailAndPassword(auth, email, password).then(() => {
      navigate('/home');
    }).catch((error) => {
      console.log(error);
    });
    // You can send a request to your authentication server here
  };

  return (
    <div id='containerbackg'>
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
        <div id="login">
          <img id='lets' style={{ paddingTop: '72px', paddingLeft: '115px' }} src="lets.svg" alt="lets" />
          <div id='logincenter'>
            <img src="connecthead.png" style={{ paddingTop: '90px', paddingBottom: '20px' }} alt="connecthead" id="connecthead" />
            <form onSubmit={handleSubmit}>
              <input className='textbox'
                type="email"
                placeholder='Enter Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <br />
              <input className='textbox'
                type="password"
                placeholder='Enter Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <br />
              <button type="submit" style={{ marginBottom: '40px', marginTop: '15px' }} className='loginButton'>
                Login
              </button>
              <br />
              <div className='myLink' >
                <Link className="Link" to="/forgotpass">Forgot Password ?</Link>
              </div>
              <ul id='mySection'>
                <hr />
                <p>or</p>
                <hr />
              </ul>
              <div className='myLink'>
                <Link className='Link' to="/signup">Sign Up</Link>
              </div>
            </form>
            <button className="myOutButton" style={{ marginTop: '30px'}}>
              <img src="google.png" alt="continue with google" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;