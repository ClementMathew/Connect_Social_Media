import React, { useEffect, useState } from 'react'
import '../CreatePage/CreateComponent'
import '../HomePage/home.css'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import app from '../Firebase/firebase'
import { collection, doc, getDoc, getFirestore, updateDoc, setDoc, onSnapshot } from 'firebase/firestore'

export default function AddStory(props) {

    const [myerror, setMyError] = useState('');
    const [toggleError, settoggleError] = useState({});
    const [loading, setLoading] = useState(false)
    const [imageUpload, setImageUpload] = useState(null);

    const popDown = () => {
        props.setStoryToggle(!props.storyToggle)
        setImageUpload(null)
    }

    let storiesLength = 0

    useEffect(() => {

        try {
            const db = getFirestore(app)
            const collectionRef = collection(db, "Stories")

            onSnapshot(collectionRef, (snapshot) => {
                storiesLength = snapshot.size
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

            if (imageUpload === null) return;

            const imageRef = ref(storage, `Users/${props.data.username}/Stories/${imageUpload.name}`);

            uploadBytes(imageRef, imageUpload).then((snapshot) => {

                getDownloadURL(snapshot.ref).then(async (url) => {

                    const storiesId = storiesLength + "_" + props.data.uid
                    const docRef = doc(db, "Stories", storiesId)

                    await setDoc(docRef, {
                        profilepicurl: props.data.profilepicurl,
                        username: props.data.username,
                        url: url
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
                <p id='createTopContainer-p'>Upload Story</p>

                <div className="horizontalline"></div>

                <div>
                    <img id='newPostDrag-img' src="draggallery.png" alt="drag gallery" />
                    <p id='newPostDrag-p'>Drag photos here</p>
                </div>

                <p id="fileName">{imageUpload === null ? 'No File Choosen' : imageUpload.name}</p>

                <input
                    type="file"
                    id="fileInputStory"
                    style={{ display: 'none' }}
                    onChange={handleFileInputChange}
                />

                <div id="chooseFile">
                    <button id='createTopContainer-button'
                        onClick={() => document.getElementById('fileInputStory').click()}
                    >
                        Choose File
                    </button>
                    <button id='createTopContainer-button' onClick={uploadFile}>{loading ? 'Loading...' : 'Upload'}</button>
                </div>

            </div>

        </>
    )
}
