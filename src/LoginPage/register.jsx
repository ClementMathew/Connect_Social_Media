import app from '../Firebase/firebase';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './register.css'

const SignUp = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRePassword] = useState('');
  const [theName, setName] = useState('');
  const [userName, setUserName] = useState('');

  const [mypasserror, setMyPassError] = useState('');
  const [togglePassError, settogglePassError] = useState({});

  const auth = getAuth(app);
  const db = getFirestore(app);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password == repassword) {

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const userDocRef = doc(db, 'Users', user.uid);

        await setDoc(userDocRef, {
          email: email,
          name: theName,
          username: userName,
        });
        navigate('/home')
        // You can send a request to your authentication server here
      } catch (error) {
        alert(error);
        console.error(error);
      }
      // You can send a request to your authentication server here
    }
    else {
      showPassError()
      setTimeout(() => {
        hidePassError()
      }, 2000
      )
    }
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
    setMyPassError("Passwords doesn't match !")
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
      <img id="continuewithgoogle" src="google.png" alt="continue with google" />
      <div id="containertop">
        <div id="signup">
          <img id='lets' style={{ paddingTop: '72px', paddingLeft: '115px' }} src="lets.svg" alt="lets" />
          <div id='logincenter'>
            <img src="connecthead.png" style={{ paddingTop: '90px', paddingBottom: '20px' }} alt="connecthead" id="connecthead" />
            <form onSubmit={handleSubmit}>

              <input
                className='textbox'
                type="text"
                placeholder='Enter Name'
                value={theName}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <br />
              <input
                className='textbox'
                type="text"
                placeholder='Enter Username'
                pattern="[a-z]+"
                title='Enter only small letters'
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
              <br />
              <input
                className='textbox'
                type="email"
                placeholder='Enter Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <br />
              <input
                className='textbox'
                type="password"
                placeholder='Enter Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <br />
              <input
                className='textbox'
                type="password"
                placeholder='Retype Password'
                value={repassword}
                onChange={(e) => setRePassword(e.target.value)}
                required
              />
              <br />
              <button type="submit" className='loginButton' style={{ marginBottom: '40px', marginTop: '15px' }}>
                Sign Up
              </button>
              <br />
              <div className='myLink'>
                <Link className='Link' to="/">Already have an account ?</Link>
              </div>
            </form>
          </div>
        </div>
        <div style={togglePassError}>
          {mypasserror}
        </div>
      </div>
    </ >
  );
}

export default SignUp;