import { pickRandomFromArray } from './random';

const FIRST_NAMES = [
    'The amazing',
    'Marvelous',
    'Mr.',
    'The great',
    'Max',
    'Jeroen',
    'Manolo',
];

const LAST_NAMES = [
    'Cucaracha',
    'López',
    'Aubergine',
    'Tentacles',
    'Rex',
    'Agapito',
    'Tolomeo',
];

export const getRandomName = () => {
    return `${pickRandomFromArray(FIRST_NAMES)} ${pickRandomFromArray(
        LAST_NAMES,
    )}`;
};
