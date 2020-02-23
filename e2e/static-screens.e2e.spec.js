const { compareScreen } = require('./utils/compare-screen.js');

describe('Basics', () => {
    beforeAll(async () => {
        await page.goto('http://localhost:3000', {
            waitUntil: 'networkidle0',
        });
    });

    it('should be titled "Capac Racer"', async () => {
        await expect(page.title()).resolves.toMatch('Capac Racer');
        await compareScreen('main-screen');
    });

    it('should be able to navigate to tutorial"', async () => {
        await expect(page).toClick('button', { text: 'How to play' });
        await compareScreen('tutorial-1');
        await expect(page).toClick('button', { text: 'Next' });
        await compareScreen('tutorial-2');
        await expect(page).toClick('button', { text: 'Next' });
        await compareScreen('tutorial-3');
        await expect(page).toClick('button', { text: 'Next' });
        await compareScreen('tutorial-4');
        await expect(page).toClick('button', { text: 'Done!' });
        await compareScreen('main-screen');
    }, 30000);

    it('should be able to navigate to high scores"', async () => {
        await expect(page).toClick('button', { text: 'High scores' });
        await compareScreen('high-scores');
        await expect(page).toClick('button', { text: 'Back' });
        await compareScreen('main-screen');
    }, 30000);

    it('should be able to navigate to credits"', async () => {
        await expect(page).toClick('button', { text: 'Credits' });
        await compareScreen('credits');
        await expect(page).toClick('button', { text: 'Back' });
        await compareScreen('main-screen');
    }, 30000);
});
