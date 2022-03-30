import { COMPUTER, COMPUTER_LOSE_RATE_PERCENT, PLAYER_TURN_TIME, USER } from '../constants';

export const randomComputerResponseTime = () => {
    const time: number = Math.floor(Math.random() * (PLAYER_TURN_TIME - 2)) + 1;
    return time * 1000;
};

export const canComputerAnswer = () => {
    const randomNumber: number = Math.floor(Math.random() * 10) + 1;
    if (randomNumber > COMPUTER_LOSE_RATE_PERCENT / 10) {
        return true;
    }
    return false;
};

export const getRandomWord = (filteredNames: Array<string>) => {
    return filteredNames[Math.floor(Math.random() * filteredNames.length)];
};

export const isValidWord = (lastUsedWord: string, newWord: string) => {
    const lastChar = lastUsedWord.charAt(lastUsedWord.length - 1);
    const firstChar = newWord.charAt(0);
    if (lastChar.toLocaleLowerCase() === firstChar.toLocaleLowerCase()) {
        return true;
    }
    return false;
};

export const getResultWordChain = (usedWords: Array<string>) => {
    return usedWords.join(' > ');
};

export const randomPlayer = () => {
    const random: number = Math.floor(Math.random() * 2);
    if (random === 0) {
        return COMPUTER;
    }
    return USER;
};
