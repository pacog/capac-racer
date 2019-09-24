import Counter from './Counter';

const TIME_TO_WAIT_FOR_PLAYER = 15999; // TODO take from options

const counter = new Counter({ timeToWait: TIME_TO_WAIT_FOR_PLAYER });

export default counter;
