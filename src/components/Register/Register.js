import React from 'react';


const Register = ({onRouteChange}) => {
    return(
        <main className="pa4 black-80">
        <form className="measure center white">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f2 fw6 ph0 mh0">Register</legend>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" for="name">Name</label>
                    <input className="pa2 fw6 input-reset white ba bg-transparent hover-bg-white hover-black w-100 b--white" type="email" name="name"  id="name"/>
                </div>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                    <input className="pa2 fw6 input-reset white ba bg-transparent hover-bg-white hover-black w-100 b--white" type="email" name="email-address"  id="email-address"/>
                </div>
                <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                    <input className="b pa2 input-reset b--white white ba bg-transparent hover-bg-white hover-black w-100" type="password" name="password"  id="password"/>
                </div>
            </fieldset>
            
            <div className="">
            <input 
                onClick={() => onRouteChange('home')}
                className="b ph3 pv2 white input-reset ba b--white bg-transparent grow pointer f6 dib" 
                type="submit" 
                value="Register"/>
            </div>

            <div className="lh-copy mt3">
            <a onClick={() => onRouteChange('signin')} href="#0" className="f6 link white dim db">Sign in</a>
            </div>
        </form>
        </main>
    );
}

export default Register;