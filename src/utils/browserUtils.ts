export const isBrowserSupported = () => {
    if ('webkitSpeechRecognition' in window && 'speechSynthesis' in window) {
        return true;
    }
    return false;
};

export const getPermission = () => window.navigator.mediaDevices.getUserMedia({ audio: true });
