import React, { Component } from 'react';

class Camera extends Component{
  takePhoto = () => {
    navigator.mediaDevices.getUserMedia({video: true})
      .then(mediaStream => {
        const mediaStreamTrack = mediaStream.getVideoTracks()[0];
        const imageCapture = new ImageCapture(mediaStreamTrack);
        imageCapture.takePhoto()
          .then(blob => this.handleImageBlob(blob))
          .catch(error => console.error('takePhoto() error:', error));
        console.log(imageCapture);
      })
      .catch(error => console.error('getUserMedia() error:', error));
  }

  handleImageBlob = blob => {
    console.log(blob);
    const img = document.getElementById('photo');
    img.src = URL.createObjectURL(blob);
  }

  render() {
    return <div>
      <button onClick={this.takePhoto}>Take Photo</button>
      <img id="photo" alt="Captured"></img>
    </div>
  }
}

export default Camera;