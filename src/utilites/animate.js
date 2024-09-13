const animateCSS = (element, animation, isMaximized, prefix = 'animate__') =>
    // We create a Promise and return it
    new Promise((resolve, reject) => {
        const animationName = `${prefix}${animation}`;
        const node = document.querySelector(element);

        node.classList.add(`${prefix}animated`, animationName);
        if (!isMaximized) node.classList.add('maximized');

        // When the animation ends, we clean the classes and resolve the Promise
        function handleAnimationEnd(event) {
            event.stopPropagation();
            node.classList.remove(`${prefix}animated`, animationName);
            if (isMaximized) node.classList.remove('maximized');
            resolve('Animation ended');
        }

        node.addEventListener('animationend', handleAnimationEnd, { once: true });
    });

// alternative to animating 
const showHide = (element, isMaximized) => {
    const node = document.querySelector(element);

    if (!isMaximized) {
        node.classList.add('maximized');
    } else {
        node.classList.remove('maximized');
    }
}

export const toggleWindow = (window, isMaximized) => {
    const elementId = `#${window}-window`;
    const shouldAnimate = true;

    if (isMaximized) {
        shouldAnimate ? animateCSS(elementId, 'bounceOut', isMaximized) : showHide(elementId, isMaximized);
    } else {
        shouldAnimate ? animateCSS(elementId, 'bounceIn', isMaximized) : showHide(elementId, isMaximized);
    }
};