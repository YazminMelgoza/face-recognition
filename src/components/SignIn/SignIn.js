import React from "react";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: "",
      signInPassword: "",
    };
  }

  onEmailChange = (event) => {
    document.querySelector(".signincomp input[type='email']").style.border =
      "1px solid white";
    this.setState({ signInEmail: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ signInPassword: event.target.value });
    document.querySelector(".signincomp input[type='password']").style.border =
      "1px solid white";
  };

  onSubmitSignIn = () => {
    const { signInEmail, signInPassword } = this.state;
    if (!signInEmail) {
      document.querySelector(".signincomp input[type='email']").style.border =
        "1px solid red";
    }
    if (!signInPassword) {
      document.querySelector(
        ".signincomp input[type='password']"
      ).style.border = "1px solid red";
    }
    if (!signInEmail || !signInPassword) {
      return;
    }
    fetch("https://guarded-eyrie-87300.herokuapp.com/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.id) {
          this.props.loadUser(data);
          this.props.onRouteChange("home");
        }
        if (data === "wrong credentials") {
          const paragraph = document.querySelector("fieldset > p");
          paragraph.style.display = "block";
        }
      });
  };

  render() {
    const { onRouteChange } = this.props;
    return (
      <main className="pa4 black-80 signincomp">
        <div className="measure center white">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f2 fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">
                Email
              </label>
              <input
                required
                className="pa2 fw6 input-reset white ba bg-transparent hover-bg-white hover-black w-100 b--white"
                type="email"
                name="email-address"
                id="email-address"
                onChange={this.onEmailChange}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">
                Password
              </label>
              <input
                required
                className="b pa2 input-reset b--white white ba bg-transparent hover-bg-white hover-black w-100"
                type="password"
                name="password"
                id="password"
                onChange={this.onPasswordChange}
              />
            </div>
            <p style={{ display: "none" }}>Wrong Credentials!!</p>
          </fieldset>
          <div className="">
            <input
              onClick={this.onSubmitSignIn}
              className="b ph3 pv2 white input-reset ba b--white bg-transparent grow pointer f6 dib"
              type="submit"
              value="Sign in"
            />
          </div>
          <div className="lh-copy mt3">
            <a
              onClick={() => onRouteChange("register")}
              href="#0"
              className="f6 link white dim db"
            >
              Register
            </a>
          </div>
        </div>
      </main>
    );
  }
}

export default SignIn;
