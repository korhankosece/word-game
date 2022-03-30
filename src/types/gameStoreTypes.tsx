import { USER } from '../constants';
import {
    CHANGE_LAST_USED_WORD,
    CHANGE_GAME_STATUS,
    CHANGE_GAME_TURN,
    RESTART_GAME,
    END_GAME,
} from '../constants/gameActions';

interface IChangeGameStatusAction {
    type: typeof CHANGE_GAME_STATUS;
    payload: {
        isGameStarted: boolean;
        errorMessage?: string;
    };
}

interface ISetLastWordAction {
    type: typeof CHANGE_LAST_USED_WORD;
    payload: string;
}

interface IChangeGameTurn {
    type: typeof CHANGE_GAME_TURN;
    payload: string;
}

interface IEndGame {
    type: typeof END_GAME;
    payload: {
        isGameEnd: boolean;
        winningMessage?: string;
        losingMessage?: string;
        chainWordResult?: string;
    };
}

interface IRestartGame {
    type: typeof RESTART_GAME;
}

type GameStoreActions =
    | IChangeGameStatusAction
    | ISetLastWordAction
    | IChangeGameTurn
    | IRestartGame
    | IEndGame;

export type Action = GameStoreActions;

export type GameState = {
    lastUsedWord: string;
    usedWords: Array<string>;
    gameTurn: string;
    isGameStarted: boolean;
    isGameEnd: boolean;
    winningMessage?: string;
    losingMessage?: string;
    errorMessage?: string;
    chainWordResult?: string;
};

export const initialState: GameState = {
    lastUsedWord: '',
    usedWords: [],
    gameTurn: USER,
    isGameStarted: false,
    isGameEnd: false,
    winningMessage: '',
    losingMessage: '',
    errorMessage: '',
    chainWordResult: '',
};

export type GameStoreHook = {
    state: GameState;
    actions: {
        changeGameStatus: (status: { isGameStarted: boolean; errorMessage?: string }) => void;
        setLastWord: (lastUsedWord: string) => void;
        changeGameTurn: (turn: string) => void;
        endGame: (status: {
            isGameEnd: boolean;
            winningMessage?: string;
            losingMessage?: string;
            chainWordResult?: string;
        }) => void;
        restartGame: () => void;
    };
};
