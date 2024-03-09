import app from '../Firebase/firebase';
import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './welcome.css'
import './register.css'

const SignUp = () => {

  const [email, setEmail] = useState('');
  const [phone, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRePassword] = useState('');
  const [theName, setName] = useState('');
  const [userName, setUserName] = useState('');

  const [mypasserror, setMyPassError] = useState('');
  const [togglePassError, settogglePassError] = useState({});

  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    setLoading(true)
    e.preventDefault();

    if (email.includes('.com')) {

      if (password === repassword) {

        try {
          const auth = getAuth(app);
          const db = getFirestore(app);
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);

          const user = userCredential.user;
          const userDocRef = doc(db, 'Users', user.uid);

          updateProfile(user, {
            displayName: theName,
          }).then(() => {
            console.log(user.displayName)
          })

          await setDoc(userDocRef, {
            username: userName,
            name: theName,
            email: email,
            phone: ("+91" + phone),
            posts: {},
            recenthistory: {},
            notificationslist: {},
            profilepicurl: '',
            followers: 0,
            following: 0,
            bio: "",
            darkmode: false,
            public: false,
            notifications: false
          });

          const dataToHome = {
            username: userName,
            name: theName,
            email: email,
            phone: ("+91" + phone),
          }

          navigate('/home', { state: dataToHome })
          // You can send a request to your authentication server here
        } catch (error) {

          setLoading(false)
          switch (error.code) {
            case 'auth/email-already-in-use':
              setMyPassError('Email Already Taken !')
              break;
          }
          showPassError()
          setTimeout(() => {
            hidePassError()
          }, 2000
          )
        }
        // You can send a request to your authentication server here
      }
      else {
        setLoading(false)
        setMyPassError("Passwords doesn't match !")
        showPassError()
        setTimeout(() => {
          hidePassError()
        }, 2000
        )
      }
    }
    else {
      setLoading(false)
      setMyPassError("Invalid Email !")
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
        <div id="signup">

          <img id='lets' style={{ paddingTop: '75px', paddingLeft: '115px' }} src="lets.svg" alt="lets" />

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
                pattern="[a-z._0-9]+"
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

              {loading ?
                <div id='loading'>
                  <img id='loadingBox' src='loading_box.gif' alt='loading...'></img>
                  <p>Loading...</p>
                </div>
                :
                <button type="submit" className='loginButton' style={{ marginBottom: '40px', marginTop: '15px' }}>
                  Sign Up
                </button>
              }
              <br />

              <div className='myLink' style={{ paddingTop: '10px' }}>
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