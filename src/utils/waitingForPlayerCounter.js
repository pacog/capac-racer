import { TIME_FOR_USER_TO_PICK_POSITION } from 'constants/ux';
import Counter from './Counter';

const counter = new Counter({ timeToWait: TIME_FOR_USER_TO_PICK_POSITION });

export default counter;
