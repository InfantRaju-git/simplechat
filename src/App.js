import React,{useState}  from 'react';
import template from "./template.png";
import './App.css';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

//chatra code begins here
(function(d, w, c) {
  w.ChatraID = 'hG7t4GAk7GZpMjZrN';
  var s = d.createElement('script');
  w[c] = w[c] || function() {
      (w[c].q = w[c].q || []).push(arguments);
  };
  s.async = true;
  s.src = 'https://call.chatra.io/chatra.js';
  if (d.head) d.head.appendChild(s);
})(document, window, 'Chatra');
//chatra code ends here


function App (props) {
  const [dataUri, setDataUri] = useState('');

  function handleTakePhoto (dataUri) {
    // Do stuff with the photo..
    console.log(dataUri);
    setDataUri(dataUri);
    console.log('takePhoto');
  }
  
 
  return (
    <div>
      {
        <Camera
          onTakePhoto = { (dataUri) => { handleTakePhoto(dataUri); } }
              idealFacingMode = {FACING_MODES.ENVIRONMENT}
      idealResolution = {{width: 640, height: 480}}
      imageType = {IMAGE_TYPES.PNG}
      imageCompression = {0.97}
      isMaxResolution = {true}
      isImageMirror = {false}
      isSilentMode = {false}
      isDisplayStartCameraError = {true}
      isFullscreen = {false}
      sizeFactor = {1}
                />
                
      }
      <div className="entireframe" download >
      <img src={template} className="mainframe"/>
      <img src={dataUri} className="innerimg"/>
      </div>
    </div>
  );
}
  



export default App;
