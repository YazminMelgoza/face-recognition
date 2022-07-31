import React, { Component } from "react";
import Particles from "react-tsparticles";
import Navigation from "./components/Navigation/Navigation";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import GlassContainer from "./components/GlassContainer/GlassContainer";
import Rank from "./components/Rank/Rank";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import { loadFull } from "tsparticles";
import "./App.css";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";

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
      enable: false,
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

const initialState = {
  input: "",
  boxes: [],
  route: "signin",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  },
};
class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };
  componentDidMount() {
    fetch("https://guarded-eyrie-87300.herokuapp.com/")
      .then((response) => response.json())
      .then(console.log);
  }
  calculateFaceLocation = (data) => {
    console.log(data);
    const regions = data.outputs[0].data.regions;
    // For each one of the regions,
    const boxes = regions.map((region) => {
      // selects the bounding box Object
      let boundingBox = region.region_info.bounding_box;
      // Corrects bottom row
      boundingBox.bottom_row = 1 - Number(boundingBox.bottom_row);
      boundingBox.right_col = 1 - Number(boundingBox.right_col);
      // Now, iterate through the object and convert the values to percentage
      // eslint-disable-next-line
      Object.keys(boundingBox).map((key) => {
        boundingBox[key] =
          String(Math.round(Number(boundingBox[key]) * 10000) / 100) + "%";
      });
      return boundingBox;
    });
    this.setState({ boxes: boxes });
  };

  particlesInit = async (main) => {
    console.log("particles init", main);
    await loadFull(main);
  };

  particlesLoaded = (container) => {
    console.log("Particles loaded", container);
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    //reset  the input value
    document.getElementById("imagelink").value = "";
    // Asyncronously get the data from API
    fetch("https://guarded-eyrie-87300.herokuapp.com/imageurl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: this.state.input,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          fetch("https://guarded-eyrie-87300.herokuapp.com/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id,
              count: response.outputs[0].data.regions.length,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              this.setState(Object.assign(this.state.user, { entries: count }));
            })
            .catch(console.log);
        }
        this.calculateFaceLocation(response);
      })
      .catch((err) => console.log(err));
  };

  onEnterSubmit = (e) => {
    if (e.key === "Enter") {
      this.onButtonSubmit();
    }
  };
  onRouteChange = (route) => {
    if (route === "home") {
      this.setState({ isSignedIn: true });
    } else {
      this.setState(initialState);
    }
    this.setState({ route: route });
  };

  render() {
    return (
      <div className="App">
        <Particles
          id="tsparticles"
          init={this.particlesInit}
          loaded={this.particlesLoaded}
          options={particleConfig}
        />
        <GlassContainer>
          <Navigation
            onRouteChange={this.onRouteChange}
            isSignedIn={this.state.isSignedIn}
          />
          {this.state.route === "signin" ? (
            <GlassContainer>
              <SignIn
                loadUser={this.loadUser}
                onRouteChange={this.onRouteChange}
              />
            </GlassContainer>
          ) : this.state.route === "home" ? (
            <div>
              <Rank
                name={this.state.user.name}
                entries={this.state.user.entries}
              />
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
                onEnterSubmit={this.onEnterSubmit}
              />
              <FaceRecognition
                boxes={this.state.boxes}
                sourceImg={this.state.imageUrl}
              />
            </div>
          ) : (
            <GlassContainer>
              <Register
                loadUser={this.loadUser}
                onRouteChange={this.onRouteChange}
              />
            </GlassContainer>
          )}
        </GlassContainer>
      </div>
    );
  }
}

export default App;
