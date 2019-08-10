import React from 'react';
import { useDispatch } from 'react-redux';
import { changeScreen } from 'store/main-ui/actions';
import { GAME } from 'constants/screens';

const MainMenu = () => {
    const dispatch = useDispatch();
    return (
        <>
            <h1>Capac Racer</h1>
            <button type="button" onClick={() => dispatch(changeScreen(GAME))}>
                Start
            </button>
        </>
    );
};

export default MainMenu;
