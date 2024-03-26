import React, { useEffect, useState } from 'react'
import './CreateComponent.css'
import '../HomePage/home.css'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import app from '../Firebase/firebase'
import { collection, doc, getDoc, getFirestore, updateDoc, setDoc, onSnapshot } from 'firebase/firestore'

export default function CreateComponent(props) {

  const [myerror, setMyError] = useState('');
  const [toggleError, settoggleError] = useState({});
  const [loading, setLoading] = useState(false)
  const [imageUpload, setImageUpload] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [about, setAbout] = useState('');

  const popDown = () => {

    setImageUpload(null)
    setImagePreview(null)
    props.setCreateToggle(!props.createToggle)
  }

  let postsLength = 0

  useEffect(() => {

    try {
      const db = getFirestore(app)

      const collectionRef = collection(db, "Posts")

      onSnapshot(collectionRef, (snapshot) => {
        postsLength = snapshot.size
      })

    } catch (error) {
      console.log(error)
    }
  })

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

          const postId = postsLength + "_" + props.data.uid

          postData[postId] = {
            url: url,
            likes: {},
            comments: {},
            share: 0,
            about: about
          }

          await updateDoc(docRef1, {
            posts: postData
          })

          const docRef2 = doc(db, "Posts", postId)

          await setDoc(docRef2, {
            profilepicurl: docSnap.profilepicurl,
            username: docSnap.username,
            url: url,
            likes: {},
            comments: {},
            share: 0,
            about: about
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

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  return (
    <>
      <div id='createBackContainer' onClick={popDown} style={{ display: props.show }}>
        <div style={toggleError}>
          {myerror}
        </div>
      </div>

      <div id="createTopContainer" style={{ display: props.show }} >
        <p id='createTopContainer-p'>Create New Post</p>

        <div className="horizontalline"></div>

        <div style={{ display: 'block' }}>
          <img id='newPostDrag-img' src={imagePreview != null ? imagePreview : "draggallery.png"} alt="drag gallery" />
          {imagePreview != null ?
            <>
              <br />
              <input
                className='textbox'
                type="text"
                placeholder='Add About ...'
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                required
              />
              <br />
              <br />
            </>
            : <p id='newPostDrag-p'>Drag photos here</p>}
        </div>

        <p id="fileName">{imageUpload === null ? 'No File Choosen' : imageUpload.name}</p>

        <input
          type="file"
          id="fileInput"
          style={{ display: 'none' }}
          onChange={handleFileInputChange}
        />

        <div id="chooseFile">
          <button id='createTopContainer-button'
            onClick={() => document.getElementById('fileInput').click()}
          >
            Choose File
          </button>
          <button id='createTopContainer-button' onClick={uploadFile}>{loading ? 'Loading...' : 'Upload'}</button>
        </div>

      </div>

    </>
  )
}
