const { compareScreen } = require('./utils/compare-screen.js');

describe('Basics', () => {
    beforeAll(async () => {
        await page.goto('http://localhost:3000');
    });

    it('should be titled "Capac Racer"', async () => {
        await expect(page.title()).resolves.toMatch('Capac Racer');
        await compareScreen('main-screen');
    });
});
