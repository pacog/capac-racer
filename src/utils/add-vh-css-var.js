import debounce from 'lodash.debounce';

export default function() {
    const setVH = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    window.addEventListener('resize', debounce(setVH, 200));
    setVH();
}
