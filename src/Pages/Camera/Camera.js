import React, { Component } from 'react';
import CircleButton from './CircleButton';

import './Camera.css';

class Camera extends Component{
  state = {
    description: '',
    imgsrc: 'https://static.wixstatic.com/media/b77fe464cfc445da9003a5383a3e1acf.jpg'
  }

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
    this.setState({
      imgsrc: URL.createObjectURL(blob),
      description: "you are beaautiful."
    });
    this.sayText("you are beautiful.");
  }

  sayText = text => {
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));
  }

  render() {
    return (
      <div>
        <img src={this.state.imgsrc} alt="Captured" width="100%"></img>
        <div className="description-container">
          <p className="description">{this.state.description}</p>
        </div>
        <CircleButton onClick={this.takePhoto}></CircleButton>
      </div>
    );
  }
}

export default Camera;