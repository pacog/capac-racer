// Based on https://stackoverflow.com/a/4819886/3493388
function checkTouchDevice() {
    const prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');

    const mq = (query) => {
        return window.matchMedia(query).matches;
    };

    if (
        'ontouchstart' in window ||
        // eslint-disable-next-line no-undef
        (window.DocumentTouch && document instanceof DocumentTouch)
    ) {
        return true;
    }

    // include the 'heartz' as a way to have a non matching MQ to help terminate the join
    // https://git.io/vznFH
    const query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join(
        '',
    );
    return mq(query);
}

export const isTouchDevice = checkTouchDevice();
