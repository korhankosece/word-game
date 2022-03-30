import { useEffect, useRef, useState } from 'react';
import { PLAYER_TURN_TIME } from '../constants';

interface IGameTimer {
    gameTime: number;
    startGameTimer: () => void;
    stopGameTimer: () => void;
    clearGameTimer: () => void;
    restartGameTimer: () => void;
}

const useGameTimer = (): IGameTimer => {
    const timerRef = useRef<NodeJS.Timeout | null>();
    const [gameTime, setGameTime] = useState(PLAYER_TURN_TIME);

    const startGameTimer = () => {
        timerRef.current = setInterval(() => {
            setGameTime((prev) => prev - 1);
        }, 1000);
    };

    const stopGameTimer = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    };

    const clearGameTimer = () => {
        stopGameTimer();
        setGameTime(PLAYER_TURN_TIME);
    };

    const restartGameTimer = () => {
        clearGameTimer();
        startGameTimer();
    };

    useEffect(() => {
        if (gameTime === 0) {
            stopGameTimer();
        }
    }, [gameTime]);

    return {
        gameTime,
        startGameTimer,
        stopGameTimer,
        clearGameTimer,
        restartGameTimer,
    };
};

export default useGameTimer;
