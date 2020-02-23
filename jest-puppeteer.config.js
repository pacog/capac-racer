module.exports = {
    launch: {
        // headless: false,
        // slowMo: 300,
    },
    server: {
        command: 'BROWSER=none npm run start',
        port: 3000,
        launchTimeout: 10000,
    },
};
