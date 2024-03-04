import React, { useState } from 'react'
import '../CreatePage/CreateComponent.css'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import app from '../Firebase/firebase'
import { doc, getFirestore, updateDoc } from 'firebase/firestore'

export default function ProfilePicUpload(props) {

    const [myerror, setMyError] = useState('');
    const [toggleError, settoggleError] = useState({});
    const [loading, setLoading] = useState(false)
    const [imageUpload, setImageUpload] = useState(null);

    const popDown = () => {
        props.setUploadPicToggle(!props.setUploadPicToggle)
        setImageUpload(null)
    }

    const uploadFile = () => {

        try {
            const storage = getStorage(app)
            const db = getFirestore(app)

            setLoading(true)
            if (imageUpload == null) return;

            const imageRef = ref(storage, `Users/${props.data.username}/Profile Picture/${imageUpload.name}`);
            
            uploadBytes(imageRef, imageUpload).then((snapshot) => {
                getDownloadURL(snapshot.ref).then(async (url) => {

                    const docRef = doc(db, "Users", props.data.uid)
                    await updateDoc(docRef, {
                        profilepicurl: url
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
                <p>Upload Profile Picture</p>
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
                    id="fileInputProfile"
                    style={{ display: 'none' }}
                    onChange={handleFileInputChange}
                />

                <div id="chooseFile">
                    <button
                        onClick={() => document.getElementById('fileInputProfile').click()}
                    >
                        Choose File
                    </button>
                    <button onClick={uploadFile}>{loading ? 'Loading...' : 'Upload'}</button>
                </div>

            </div>

        </>
    )
}
