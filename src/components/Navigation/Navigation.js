import React from 'react'; 
import './Navigation.css';
import Logo from './../Logo/Logo';
import GlassContainer from '../GlassContainer/GlassContainer';

const Navigation = ({onRouteChange, isSignedIn}) => {
    if (isSignedIn) {
        return (
            <nav>
                <Logo/>
                <GlassContainer margin="0.7rem">
                    <p onClick={() => onRouteChange('signout')}>Sign Out</p>
                </GlassContainer>
            </nav>
        );
    } else {
        return (
            <nav>
                <Logo/>
                <GlassContainer margin="0.7rem">
                    <p onClick={() => onRouteChange('signin')}>Sign In</p>
                </GlassContainer>
                <GlassContainer margin="0.7rem">
                    <p onClick={() => onRouteChange('register')}>Register</p>
                </GlassContainer>
            </nav>
        );
    }
}

export default Navigation;