import React from 'react'
import './CreateComponent.css'
import '../HomePage/home.css'

export default function CreateComponent(props) {

  const popDown = () => {
    props.setCreateToggle(!props.createToggle)
  }

  return (
    <>
      <div id='createBackContainer' onClick={popDown} style={{ display: props.show }}></div>

      <div id="createTopContainer" style={{ display: props.show }} >
        <p>Create New Post</p>
        <div className="horizontalline"></div>
        <div id="newPostDrag">
          <img src="draggallery.png" alt="drag gallery" />
          <p>Drag photos here</p>
        </div>
        <button>Select from PC</button>
      </div>
    </>
  )
}
