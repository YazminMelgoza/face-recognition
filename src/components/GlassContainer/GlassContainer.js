import React from 'react'; 
import './GlassContainer.css'
const GlassContainer = (props) => {
    return (
        <div className="GlassContainer">
            {props.children}
        </div>
    )
}

export default GlassContainer;