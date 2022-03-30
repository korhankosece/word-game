import { createContext, useMemo, useReducer } from 'react';
import GameReducer from '../stores/reducers/gameReducer';
import { GameState, initialState, Action } from '../types/gameStoreTypes';

export const GameStoreContext = createContext<{
    state: GameState;
    dispatch: React.Dispatch<Action>;
}>({
    state: initialState,
    dispatch: () => {},
});

const GameStoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(GameReducer, initialState);
    const value = useMemo(() => ({ state, dispatch }), [state]);
    return <GameStoreContext.Provider value={value}>{children}</GameStoreContext.Provider>;
};

export default GameStoreProvider;
