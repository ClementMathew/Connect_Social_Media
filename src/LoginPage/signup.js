import app from '../firebase';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [theName, setName] = useState('');
  const [userName, setUserName] = useState('');

  const auth = getAuth(app);
  const db = getFirestore(app);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

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
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h1 style={styles.h1}>Connect</h1>
        <label>
          Name:
          <input
            style={styles.input}
            type="text"
            placeholder='Enter your name'
            value={theName}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Username:
          <input
            style={styles.input}
            type="text"
            placeholder='Enter a username'
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </label>
        <br />
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
        <button style={styles.button} type="submit">Register</button>
        <label style={styles.label}>
          Already have an account ? <Link to="/">Sign In</Link>
        </label>
      </form>
    </div>
  );
}

export default SignUp;