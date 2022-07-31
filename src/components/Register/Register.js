import React from "react";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
    };
  }

  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  onNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  onSubmitRegister = () => {
    fetch("https://guarded-eyrie-87300.herokuapp.com/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        password: this.state.password,
        email: this.state.email,
        name: this.state.name,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange("home");
        }
      });
  };
  render() {
    const { onRouteChange } = this.props;
    return (
      <main className="pa4 black-80">
        <div className="measure center white">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f2 fw6 ph0 mh0">Register</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" for="name">
                Name
              </label>
              <input
                required
                className="pa2 fw6 input-reset white ba bg-transparent hover-bg-white hover-black w-100 b--white"
                type="text"
                name="name"
                id="name"
                onChange={this.onNameChange}
              />
            </div>
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
          </fieldset>

          <div className="">
            <input
              onClick={this.onSubmitRegister}
              className="b ph3 pv2 white input-reset ba b--white bg-transparent grow pointer f6 dib"
              type="submit"
              value="Register"
            />
          </div>

          <div className="lh-copy mt3">
            <a
              onClick={() => onRouteChange("signin")}
              href="#0"
              className="f6 link white dim db"
            >
              Sign in
            </a>
          </div>
        </div>
      </main>
    );
  }
}

export default Register;
