import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({sourceImg, boxes}) => {
    const bounding_boxes = boxes.map((box) => {
        //({leftCol, topRow, rightCol, bottomRow} = box);
        return (
        <div 
        className='bounding-box' 
        style={{top: box.top_row, right: box.right_col, bottom: box.bottom_row, left: box.left_col}}
        >
        </div>)
    });
    if (sourceImg) {
        return (
            <div id="image-container">
                <img id="face-recognition" alt="Face Recognition" src={sourceImg}/>
                {bounding_boxes}
            </div>
        )
    }

}

export default FaceRecognition;