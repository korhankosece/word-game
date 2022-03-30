import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import useGameStore from '../../stores/GameStore';
import {
    getRandomWord,
    getResultWordChain,
    canComputerAnswer,
    randomComputerResponseTime,
} from '../../utils/gameUtils';
import CustomModal from '../shared/Modal/Modal';
import names from '../../data/names.json';
import { PLAYER_TURN_TIME } from '../../constants';
import speech from '../../utils/speechRecognizer';
import { COMPUTER_USED_WORD_ERROR, COMPUTER_WORD_NOT_FOUND } from '../../constants/gameMessages';

interface IComputerProps {
    restartGameTimer: () => void;
    stopGameTimer: () => void;
    clearGameTimer: () => void;
}

const Computer: React.FC<IComputerProps> = ({
    restartGameTimer,
    stopGameTimer,
    clearGameTimer,
}) => {
    const {
        state: { lastUsedWord, usedWords, winningMessage, chainWordResult },
        actions: { setLastWord, endGame, restartGame },
    } = useGameStore();

    const [isModalVisible, setIsModalVisible] = useState(false);

    const answer = (transcript: string) => {
        const lastChar = transcript[transcript.length - 1];
        const validWords = names.filter((name) => name[0] === lastChar);
        const randomWord = getRandomWord(validWords);

        if (!usedWords.includes(randomWord)) {
            speech.speak(randomWord).finally(() => {
                setLastWord(randomWord);
                restartGameTimer();
            });
            return;
        }

        endGame({
            isGameEnd: true,
            winningMessage: COMPUTER_USED_WORD_ERROR,
            chainWordResult: getResultWordChain([...usedWords, randomWord]),
        });
    };

    const computerAnswer = (transcript: string) => {
        const randomMilisecond = randomComputerResponseTime();
        speech.stop();

        if (!canComputerAnswer()) {
            setTimeout(() => {
                endGame({
                    isGameEnd: true,
                    winningMessage: COMPUTER_WORD_NOT_FOUND,
                    chainWordResult: getResultWordChain(usedWords),
                });

                stopGameTimer();
            }, PLAYER_TURN_TIME * 1000);
            return;
        }

        setTimeout(() => answer(transcript), randomMilisecond);
    };

    const startGameComputer = () => {
        const randomWord = getRandomWord(names);
        const randomMilisecond = randomComputerResponseTime();

        setTimeout(() => {
            speech.speak(randomWord).finally(() => {
                setLastWord(randomWord);
                restartGameTimer();
            });
        }, randomMilisecond);
    };

    useEffect(() => {
        if (!lastUsedWord) {
            startGameComputer();
            return;
        }

        computerAnswer(lastUsedWord);
    }, []);

    useEffect(() => {
        if (!winningMessage) {
            return;
        }

        setIsModalVisible(true);
    }, [winningMessage]);

    const handleSubmit = () => {
        clearGameTimer();
        restartGame();
    };

    return (
        <>
            <Typography variant="h4" component="h2">
                Bilgisayar düşünüyor...
            </Typography>
            <CustomModal
                modalTitle="Kazandınız!!"
                modalText={`Kullanılan kelimeler: ${chainWordResult || ''}`}
                modalSubText={winningMessage}
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
                handleSubmit={handleSubmit}
                buttonText="YENİDEN BAŞLA"
                disableClose
            />
        </>
    );
};

export default Computer;
