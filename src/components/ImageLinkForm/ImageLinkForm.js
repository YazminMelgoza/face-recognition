import React from 'react';
import './ImageLinkForm.css'
const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return(
        <div>
            <p className='f2'>
                {'This Magic Brain will detect faces in your pictures. Give it a try'}
            </p>
            <div id='form-container'>
                <input onSubmit={onButtonSubmit} type="text" onChange={onInputChange}/>
                <button onClick={onButtonSubmit} id="detect" >Detect</button>
            </div>
        </div>
    )
}

export default ImageLinkForm;