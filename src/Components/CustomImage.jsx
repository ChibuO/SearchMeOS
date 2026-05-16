// so I can handle img require exceptions
import React from 'react';
import default_image from '../Images/smos_transparent.png';

const Img = ({imageName, defaultImg, alt, ...props}) => {

    const CheckSrc = () => {
        try {
            return <img src={require(`../Images/${imageName}`)} alt={alt} {...props} />
        } catch(err) {  
            return <img src={defaultImg || default_image } alt={alt} {...props} />
        }
    }

    return (
        CheckSrc()
    ); 
}

export default Img;