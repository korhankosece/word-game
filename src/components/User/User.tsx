import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { getResultWordChain, isValidWord } from '../../utils/gameUtils';
import useGameStore from '../../stores/GameStore';
import CustomModal from '../shared/Modal/Modal';
import names from '../../data/names.json';
import speech from '../../utils/speechRecognizer';
import {
    INVALID_FIRST_CHAR,
    MULTIPLE_WORD_ERROR,
    USED_WORD_ERROR,
    WORD_NOT_FOUND,
} from '../../constants/gameMessages';

interface ISpeechEvent {
    readonly results: SpeechRecognitionResultList;
}
interface IUserProps {
    restartGameTimer: () => void;
    stopGameTimer: () => void;
    clearGameTimer: () => void;
}

const User: React.FC<IUserProps> = ({ restartGameTimer, stopGameTimer, clearGameTimer }) => {
    const {
        state: { lastUsedWord, usedWords, losingMessage, chainWordResult },
        actions: { setLastWord, endGame, restartGame },
    } = useGameStore();
    const [isModalVisible, setIsModalVisible] = useState<boolean>((losingMessage && true) || false);

    useEffect(() => {
        speech.onresult((event: ISpeechEvent) => {
            const { transcript }: { transcript: string } = event.results[0][0];
            const userWord = transcript.toLocaleLowerCase().toString();

            if (userWord.includes(' ')) {
                stopGameTimer();
                endGame({
                    isGameEnd: true,
                    losingMessage: MULTIPLE_WORD_ERROR,
                    chainWordResult: getResultWordChain([...usedWords, userWord]),
                });
                return;
            }
            if (lastUsedWord && !isValidWord(lastUsedWord, userWord)) {
                stopGameTimer();
                endGame({
                    isGameEnd: true,
                    losingMessage: INVALID_FIRST_CHAR,
                    chainWordResult: getResultWordChain([...usedWords, userWord]),
                });
                return;
            }
            if (usedWords.includes(userWord)) {
                stopGameTimer();
                endGame({
                    isGameEnd: true,
                    losingMessage: USED_WORD_ERROR,
                    chainWordResult: getResultWordChain([...usedWords, userWord]),
                });
                return;
            }
            if (names.includes(userWord)) {
                setLastWord(userWord);
                restartGameTimer();
                return;
            }

            stopGameTimer();
            endGame({
                isGameEnd: true,
                losingMessage: WORD_NOT_FOUND,
                chainWordResult: getResultWordChain([...usedWords, userWord]),
            });
        });
        speech.start();
    }, []);

    useEffect(() => {
        if (!losingMessage) {
            return;
        }

        setIsModalVisible(true);
    }, [losingMessage]);

    const handleSubmit = () => {
        clearGameTimer();
        restartGame();
    };

    return (
        <>
            <Typography variant="h4" component="h2">
                Sıra sende!
            </Typography>
            <CustomModal
                modalTitle="Kaybettiniz"
                modalText={`Kullanılan kelimeler: ${chainWordResult || ''}`}
                modalSubText={losingMessage}
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
                handleSubmit={handleSubmit}
                buttonText="YENİDEN BAŞLA"
                disableClose
            />
        </>
    );
};

export default User;
