import default_image from '../Images/smos_transparent.png';

// so I can handle img require exceptions
const images = import.meta.glob('../Images/*', { eager: true, import: 'default' });

const Img = ({imageName, defaultImg, alt, ...props}) => {
    const src = images[`../Images/${imageName}`] || defaultImg || default_image;
    return <img src={src} alt={alt} {...props} />;
}

export default Img;