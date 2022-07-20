import React, { Component } from 'react';
import Particles from "react-tsparticles";
import Navigation from './components/Navigation/Navigation'
import GlassContainer from './components/GlassContainer/GlassContainer'
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import { loadFull } from "tsparticles";
import './App.css';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: 'cc88967295284ba2b456bdb27e155cae'
});

const particleConfig = {
  background: {
    color: {
      value: "transparent",
    },
  },
  fpsLimit: 120,
  interactivity: {
    events: {
      resize: true,
    },
    modes: {
      push: {
        quantity: 4,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: "#ffffff",
    },
    links: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    collisions: {
      enable: true,
    },
    move: {
      direction: "none",
      enable: true,
      outModes: {
        default: "out",
      },
      random: false,
      speed: 2,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 800,
      },
      value: 70,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: "circle",
    },
    size: {
      value: { min: 1, max: 3 },
    },
  },
  detectRetina: true,
};
class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
    }
  };
  particlesInit = async (main) => {
    console.log("particles init", main);
    await loadFull(main);
  };

  particlesLoaded = (container) => {
    console.log("Particles loaded", container);
  };

  onInputChange = (event) => {
    console.log(event);
  }
  onButtonSubmit = () => {
    console.log('click');
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      'https://samples.clarifai.com/face-det.jpg'
    ).then(response => {
      console.log('hi', response)
    })
  }
  render() {
    return (
      <div className="App">
        <GlassContainer>
        <Particles id="tsparticles" init={this.particlesInit} loaded={this.particlesLoaded} options={particleConfig}/>
    
          <Navigation/>
          <Rank/>
          <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
        </GlassContainer>
        
      </div>
    );
  }
}

export default App;
