import React from 'react'; 
import './GlassContainer.css'
const GlassContainer = (props) => {
    
    return (
        <div className="GlassContainer" style={{margin: props.margin}}>
            {props.children}
        </div>
    )
}

export default GlassContainer;