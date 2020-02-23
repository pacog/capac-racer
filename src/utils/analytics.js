const log = process.env.NODE_ENV === 'development';

/**
 * Tracks a google analytics event
 *
 * @param {string} action
 * @param {object} [params = {}]
 * @param {string} [params.category]
 * @param {string} [params.label]
 * @param {string} [params.value]
 */
export const track = (action, { category, label, value } = {}) => {
    if (log) {
        // eslint-disable-next-line no-console
        console.log('track', action, category, label, value);
    }
    if (!window.gtag) {
        return;
    }
    if (process.env.NODE_ENV === 'development') {
        return;
    }
    window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value,
    });
};
