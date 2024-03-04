import React, { useState } from 'react'
import './CreateComponent.css'
import '../HomePage/home.css'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import app from '../Firebase/firebase'
import { collection, doc, getDoc, getFirestore, updateDoc, setDoc } from 'firebase/firestore'

export default function CreateComponent(props) {

  const [myerror, setMyError] = useState('');
  const [toggleError, settoggleError] = useState({});
  const [loading, setLoading] = useState(false)
  const [imageUpload, setImageUpload] = useState(null);

  const popDown = () => {
    props.setCreateToggle(!props.createToggle)
    setImageUpload(null)
  }

  const uploadFile = () => {

    try {
      setLoading(true)
      const db = getFirestore(app)
      const storage = getStorage(app)
      if (imageUpload == null) return;

      const imageRef = ref(storage, `Users/${props.data.username}/Posts/${imageUpload.name}`);

      uploadBytes(imageRef, imageUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then(async (url) => {

          const docRef1 = doc(collection(db, "Users"), props.data.uid)
          const docSnap = (await getDoc(docRef1)).data()
          let postData = docSnap.posts

          const len = Object.keys(postData).length

          postData[len] = {
            url: url,
            likes: 0,
            commentcount: 0,
            comments: {},
            share: 0,
            about: ''
          }

          await updateDoc(docRef1, {
            posts: postData
          })

          const postId = props.data.uid.concat(url.slice(-20))
          const docRef2 = doc(db, "Posts", postId)

          await setDoc(docRef2, {
            profilepicurl: docSnap.profilepicurl,
            username: docSnap.username,
            url: url,
            likes: 0,
            commentcount: 0,
            comments: {},
            share: 0,
            about: ''
          })

          setLoading(false)
          setMyError("Successfully Uploaded !")
          showError()
          setTimeout(() => {
            hideError()
            popDown()
          }, 2000
          )
        });
      });
    } catch (error) {
      setLoading(false)
      popDown()
    }
  };

  const showError = () => {
    settoggleError({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      zIndex: '20',
      left: '50%',
      transform: 'translate(-50%,0%)',
      borderRadius: '15px',
      color: 'white',
      fontWeight: 'bold',
      boxShadow: '0px 0px 7px 0px rgb(68, 68, 68)',
      fontSize: '18px',
      fontFamily: "'Times New Roman', Times, serif",
      letterSpacing: '1px',
      bottom: '40px',
      height: '50px',
      width: '400px',
      backgroundColor: 'rgb(0, 202, 30)'
    });
  }

  const hideError = () => {
    settoggleError({
    });
    setMyError('')
  }

  const handleFileInputChange = (event) => {

    setImageUpload(event.target.files[0]);
  };

  return (
    <>
      <div id='createBackContainer' onClick={popDown} style={{ display: props.show }}>
        <div style={toggleError}>
          {myerror}
        </div>
      </div>

      <div id="createTopContainer" style={{ display: props.show }} >
        <p>Create New Post</p>
        <div className="horizontalline"></div>
        <div id="newPostDrag">
          <img src="draggallery.png" alt="drag gallery" />
          <p>Drag photos here</p>
        </div>
        <div id="fileName">
          <p>{imageUpload === null ? 'No File Choosen' : imageUpload.name}</p>
        </div>

        <input
          type="file"
          id="fileInput"
          style={{ display: 'none' }}
          onChange={handleFileInputChange}
        />

        <div id="chooseFile">
          <button
            onClick={() => document.getElementById('fileInput').click()}
          >
            Choose File
          </button>
          <button onClick={uploadFile}>{loading ? 'Loading...' : 'Upload'}</button>
        </div>

      </div>

    </>
  )
}
