import { COMPUTER, USER } from '../../constants';
import {
    CHANGE_LAST_USED_WORD,
    CHANGE_GAME_STATUS,
    CHANGE_GAME_TURN,
    RESTART_GAME,
    END_GAME,
} from '../../constants/gameActions';
import { GameState, Action, initialState } from '../../types/gameStoreTypes';

const GameReducer = (state: GameState, action: Action): GameState => {
    switch (action.type) {
        case CHANGE_LAST_USED_WORD:
            return {
                ...state,
                lastUsedWord: action.payload,
                usedWords: [...state.usedWords, action.payload],
                gameTurn: state.gameTurn === COMPUTER ? USER : COMPUTER,
            };
        case CHANGE_GAME_STATUS:
            return {
                ...state,
                isGameStarted: action.payload.isGameStarted,
                errorMessage: action.payload.errorMessage,
            };
        case CHANGE_GAME_TURN:
            return {
                ...state,
                gameTurn: action.payload,
            };
        case END_GAME:
            return {
                ...state,
                isGameEnd: action.payload.isGameEnd,
                winningMessage: action.payload.winningMessage,
                losingMessage: action.payload.losingMessage,
                chainWordResult: action.payload.chainWordResult,
            };
        case RESTART_GAME:
            return { ...initialState };
        default:
            return state;
    }
};

export default GameReducer;
