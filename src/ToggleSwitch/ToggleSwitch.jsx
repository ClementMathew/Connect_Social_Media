import React, { useState } from 'react';
import './ToggleSwitch.css';
import { collection, doc, getFirestore, updateDoc } from 'firebase/firestore';
import app from '../Firebase/firebase';

const ToggleSwitch = (props) => {

  const [isChecked, setIsChecked] = useState(props.toggle);

  const handleToggle = () => {
    setIsChecked(!isChecked);

    try {
      const db = getFirestore(app)
      const docRef = doc(db, "Users", props.userid)

      if (props.type == 'darkmode') {
        updateDoc(docRef, {
          darkmode: !isChecked
        })
      }
      if (props.type == 'public') {
        updateDoc(docRef, {
          public: !isChecked
        })
      }
      if (props.type == 'notifications') {
        updateDoc(docRef, {
          notifications: !isChecked
        })
      }

    } catch (error) {
      console.log(error)
    }
  };

  return (
    <label className="toggle-switch">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleToggle}
      />
      <span className="slider"></span>
    </label>
  );
};

export default ToggleSwitch;
