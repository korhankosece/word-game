import { Box, Button, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import SmartToyTwoToneIcon from '@mui/icons-material/SmartToyTwoTone';
import PersonOutlineTwoToneIcon from '@mui/icons-material/PersonOutlineTwoTone';
import { COMPUTER, USER } from '../../constants';
import useGameTimer from '../../hooks/useGameTimer';
import useGameStore from '../../stores/GameStore';
import { randomPlayer } from '../../utils/gameUtils';
import Computer from '../Computer/Computer';
import Timer from '../Timer/Timer';
import User from '../User/User';
import './style.css';

const Play = () => {
    const [startRole, setStartRole] = useState(USER);

    const {
        state: { isGameEnd, isGameStarted, gameTurn, lastUsedWord, usedWords },
        actions: { changeGameTurn, changeGameStatus },
    } = useGameStore();

    const { gameTime, startGameTimer, restartGameTimer, stopGameTimer, clearGameTimer } =
        useGameTimer();

    useEffect(() => {
        setStartRole(USER);
    }, [isGameEnd]);

    const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
        if (newAlignment !== null) {
            setStartRole(newAlignment);
        }
    };

    const handleStart = () => {
        startGameTimer();
        changeGameStatus({ isGameStarted: true });
    };

    return (
        <>
            {' '}
            {!isGameStarted && (
                <>
                    <Typography component="span">Kimin oyuna başlayacağını seç:</Typography>
                    <Box className="toggle-player-btn">
                        <ToggleButtonGroup
                            color="primary"
                            value={startRole}
                            exclusive
                            onChange={handleChange}
                        >
                            <ToggleButton
                                className="toggle-btn"
                                onClick={() => changeGameTurn(USER)}
                                value={USER}
                            >
                                İNSAN
                            </ToggleButton>
                            <ToggleButton
                                onClick={() => changeGameTurn(randomPlayer())}
                                value="random"
                                className="toggle-btn"
                            >
                                RASTGELE
                            </ToggleButton>
                            <ToggleButton
                                className="toggle-btn"
                                onClick={() => changeGameTurn(COMPUTER)}
                                value={COMPUTER}
                            >
                                BİLGİSAYAR
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Box>
                    <Button variant="contained" onClick={handleStart}>
                        Başla
                    </Button>
                </>
            )}
            {isGameStarted && (
                <>
                    <Box className="player-icons-wrapper">
                        <PersonOutlineTwoToneIcon
                            className={gameTurn === USER ? 'human-icon-turn' : 'human-icon'}
                        />
                        <SmartToyTwoToneIcon
                            className={
                                gameTurn === COMPUTER ? 'computer-icon-turn' : 'computer-icon'
                            }
                        />
                    </Box>
                    {gameTurn === COMPUTER ? (
                        <Computer
                            restartGameTimer={restartGameTimer}
                            stopGameTimer={stopGameTimer}
                            clearGameTimer={clearGameTimer}
                        />
                    ) : (
                        <User
                            restartGameTimer={restartGameTimer}
                            stopGameTimer={stopGameTimer}
                            clearGameTimer={clearGameTimer}
                        />
                    )}
                </>
            )}
            <Box className="last-used-word">
                {lastUsedWord && (
                    <Typography variant="h5" component="p">
                        En son söylenen kelime:{' '}
                        <Typography variant="h4" component="span">
                            {lastUsedWord}
                        </Typography>
                    </Typography>
                )}
            </Box>
            {isGameStarted && <Timer gameTime={gameTime} usedWords={usedWords} />}
        </>
    );
};

export default Play;
