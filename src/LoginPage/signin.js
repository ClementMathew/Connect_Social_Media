
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import app from "../firebase";
import { getAuth } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

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

  const styles = {
    container: {
      backgroundImage: 'url("../backg.png")',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#ffffff',
    },
    form: {
      backgroundColor: '#ffffff',
      padding: '80px',
      borderRadius: '30px',
      maxWidth: '600px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      margin: 'auto',
    },
    input: {
      marginBottom: '20px',
      width: '100%',
      padding: '10px',
      boxSizing: 'border-box',
    },
    button: {
      borderRadius: '10px',
      backgroundColor: '#ff9100',
      width: '100%',
      padding: '10px',
      marginBottom: '15px', // Add marginBottom for spacing
    },
    h1: {
      padding: '10px',
      textAlign: 'center',
    },
    label: {
      textAlign: 'center',
      marginBottom: '20px', // Add marginBottom for spacing
    },
    textdesign: {
      textAlign: 'center',
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h1 style={styles.h1}>Connect</h1>

        <label>
          Email:
          <input
            style={styles.input}
            type="email"
            placeholder='Enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            style={styles.input}
            type="password"
            placeholder='Enter your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button style={styles.button} type="submit">
          Login
        </button>
        <label style={styles.label}>
          Don't have an account ? <Link to="/signup">Sign Up</Link>
        </label>
        <p style={styles.textdesign} >Forgot Password ? <Link to="/forgotpass">Click Here</Link></p>
      </form>

    </div>
  );
}

export default SignIn;