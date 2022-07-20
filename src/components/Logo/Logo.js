import React from 'react'; 
import './Logo.css'
import brain from './brain.png'
const Logo = () => {
    
    return(
        <div options={{max:100}}>
                    <img alt="brain" src={brain} style={{height: "5rem"}}/>
        </div>
    )
}

export default Logo;