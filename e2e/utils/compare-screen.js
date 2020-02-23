const { toMatchImageSnapshot } = require('jest-image-snapshot');

expect.extend({ toMatchImageSnapshot });

async function compareScreen(snapshotName) {
    await page.waitFor(1000);
    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot({
        customSnapshotIdentifier: snapshotName,
    });
}

module.exports = {
    compareScreen,
};
