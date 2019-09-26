import Counter from 'utils/Counter';
import {
    addToUpdate as addToGameLoopUpdate,
    removeFromUpdate as removeFromGameLoopUpdate,
} from 'utils/gameLoop';

export const timeout = (timeMs = 1000) => {
    return new Promise((resolve) => {
        const counter = new Counter({ timeToWait: timeMs });
        const notifyPassOfTime = (time) => {
            counter.notifyTimePassed(time);
        };
        addToGameLoopUpdate(notifyPassOfTime);
        counter.restart({
            callbackOnEnd: () => {
                removeFromGameLoopUpdate(notifyPassOfTime);
                counter.stop();
                resolve();
            },
        });
    });
};
