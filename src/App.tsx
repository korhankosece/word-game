import Main from './components/Main/Main';
import GameStoreProvider from './contexts/GameContext';

const App = () => {
    return (
        <GameStoreProvider>
            <Main />
        </GameStoreProvider>
    );
};

export default App;
