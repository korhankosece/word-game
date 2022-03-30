import { Box, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { USER } from '../../constants';
import useGameStore from '../../stores/GameStore';
import { getResultWordChain } from '../../utils/gameUtils';
import './style.css';

interface ITimerProps {
    gameTime: number;
    usedWords: Array<string>;
}

const Timer: React.FC<ITimerProps> = ({ usedWords, gameTime }) => {
    const {
        state: { gameTurn },
        actions: { endGame },
    } = useGameStore();

    const losingMessage = 'Yeterli sürede cevaplayamadınız.';
    const winningMessage = 'Bilgisayar yeterli sürede cevaplayamadı, tebrikler kazandınız.';

    useEffect(() => {
        if (gameTime === 0) {
            endGame({
                isGameEnd: true,
                chainWordResult: getResultWordChain(usedWords),
                losingMessage: gameTurn === USER ? losingMessage : '',
                winningMessage: gameTurn === USER ? '' : winningMessage,
            });
        }
    }, [gameTime]);

    return (
        <Box className="timer-text">
            <Typography variant="h5" component="h3">
                Kalan süre:{' '}
                <Typography variant="h4" component="span">
                    {' '}
                    {gameTime} sn
                </Typography>
            </Typography>
        </Box>
    );
};

export default Timer;
