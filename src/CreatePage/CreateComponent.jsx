import React, { useEffect, useState } from 'react'
import './CreateComponent.css'
import '../HomePage/home.css'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import app from '../Firebase/firebase'
import { collection, doc, getDoc, getFirestore, updateDoc, setDoc, onSnapshot } from 'firebase/firestore'
import axios from 'axios'

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

      query(imagePreview).then((response) => {

        const data = response;
        let adultScore = null;

        for (let i = 0; i < data.length; i++) {
          if (data[i].label === "adult_成人商品") {
            adultScore = data[i].score;
            break; // Exit the loop once the "adult_成人商品" label is found
          }
        }

        if (adultScore !== null) {
          if (adultScore < 0.7) {

            query2(imagePreview).then((response) => {

              console.log(JSON.stringify(response));

              var generatedText = JSON.stringify(response);
              var data = JSON.parse(generatedText);

              console.log(data)

              var word = data[0].generated_text.match(/<s_nm>(.*?)<\/s_nm>/)[1].trim();

              axios.post('http://localhost:5000/comment', { comment: word })
                .then(response => {
                  if (response.data.toxicity == false) {

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
                        showError('off')

                        setTimeout(() => {
                          hideError()
                          popDown()
                        }, 2000
                        )
                      });
                    });
                  }
                  else {
                    setLoading(false)
                    setMyError("Upload Failed !")
                    showError('on')

                    setTimeout(() => {
                      hideError()
                      popDown()
                    }, 2000
                    )
                  }

                })
                .catch(error => {
                  console.error('Error:', error);
                });

            })

          }
          else {
            setLoading(false)
            setMyError("Upload Failed !")
            showError('on')

            setTimeout(() => {
              hideError()
              popDown()
            }, 2000
            )
          }
        } else {
          console.log("No adult score found.");
        }
      });

    } catch (error) {
      setLoading(false)
      popDown()
    }
  };

  const showError = (error) => {

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
      backgroundColor: error == 'on' ? 'rgb(255, 40, 40)' : 'rgb(0, 202, 30)'
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

  async function query2(data) {
    const dataConverted = dataUrlToArrayBuffer(data)
    const response = await fetch(
      "https://api-inference.huggingface.co/models/jinhybr/OCR-Donut-CORD",
      {
        headers: { Authorization: "Bearer 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" },
        method: "POST",
        body: dataConverted,
      }
    );
    const result = await response.json();
    return result;
  }

  async function query(data) {
    const dataConverted = dataUrlToArrayBuffer(data)
    const response = await fetch(
      "https://api-inference.huggingface.co/models/jiechau/adult-content-identify-image",
      {
        headers: { Authorization: "Bearer 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" },
        method: "POST",
        body: dataConverted,
      }
    );
    const result = await response.json();
    return result;
  }

  function dataUrlToArrayBuffer(dataUrl) {
    // Extract base64-encoded data portion from Data URL
    const base64Data = dataUrl.split(',')[1];

    // Decode base64-encoded data into binary string
    const binaryString = atob(base64Data);

    // Create ArrayBuffer from binary string
    const arrayBuffer = new ArrayBuffer(binaryString.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < binaryString.length; i++) {
      uint8Array[i] = binaryString.charCodeAt(i);
    }

    return arrayBuffer;
  }

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