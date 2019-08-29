export const hasContent = ({ r, g, b, a }) => {
    if (a === 0) {
        return false;
    }
    if (r === 255 && g === 255 && b === 255) {
        return false;
    }

    return true;
};
