import { useContext } from 'react';
import {
    CHANGE_GAME_STATUS,
    CHANGE_GAME_TURN,
    CHANGE_LAST_USED_WORD,
    END_GAME,
    RESTART_GAME,
} from '../constants/gameActions';
import { GameStoreContext } from '../contexts/GameContext';
import { GameStoreHook } from '../types/gameStoreTypes';

const useGameStore = (): GameStoreHook => {
    const { state, dispatch } = useContext(GameStoreContext);

    const changeGameStatus = (status: { isGameStarted: boolean; errorMessage?: string }) =>
        dispatch({ type: CHANGE_GAME_STATUS, payload: status });

    const setLastWord = (lastUsedWord: string) =>
        dispatch({ type: CHANGE_LAST_USED_WORD, payload: lastUsedWord });

    const changeGameTurn = (turn: string) => dispatch({ type: CHANGE_GAME_TURN, payload: turn });

    const endGame = (status: {
        isGameEnd: boolean;
        winningMessage?: string;
        losingMessage?: string;
        chainWordResult?: string;
    }) => dispatch({ type: END_GAME, payload: status });

    const restartGame = () => dispatch({ type: RESTART_GAME });

    return {
        state,
        actions: {
            setLastWord,
            changeGameStatus,
            changeGameTurn,
            restartGame,
            endGame,
        },
    };
};

export default useGameStore;
