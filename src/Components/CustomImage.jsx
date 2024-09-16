// so I can handle img require exceptions
import React from 'react';
import default_image from '../Images/fake_album.jpg';

const Img = ({imageName, ...props}) => {

    const CheckSrc = () => {
        try {
            return <img src={require(`../Images/${imageName}`)} {...props} />
        } catch(err) {  
            return <img src={default_image} {...props} />
        }
    }

    return (
        CheckSrc()
    ); 
}

export default Img;