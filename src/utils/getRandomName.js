import { pickRandomFromArray } from './random';

const FIRST_NAMES = [
    'Max',
    'Carlitros',
    'Michael',
    'Fernando',
    'Lolín',
    'Esquizo',
    'Agapito',
    'Tolomeo',
];

const LAST_NAMES = [
    'Cucaracha',
    'Aubergine',
    'Tentacles',
    'Rex',
    'Danger',
    'Senna',
    'Alonso',
    'Schumacher',
    'Jander',
];

export const getRandomName = () => {
    return `${pickRandomFromArray(FIRST_NAMES)} ${pickRandomFromArray(
        LAST_NAMES,
    )}`;
};
