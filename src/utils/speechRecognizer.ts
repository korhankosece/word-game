interface IWindow extends Window {
    webkitSpeechRecognition: any;
}

interface ISpeechEvent {
    readonly results: SpeechRecognitionResultList;
}

interface IRecognition {
    continuous: boolean;
    lang: string;
    start: () => void;
    stop: () => void;
    on: () => void;
    onresult: (result: any) => void;
}
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const { webkitSpeechRecognition: WebkitSpeechRecognition }: IWindow = window as unknown as IWindow;

class Speech {
    recognition: IRecognition;

    synth: SpeechSynthesis;

    constructor() {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        this.recognition = new WebkitSpeechRecognition(); // eslint-disable-line @typescript-eslint/no-unsafe-call
        this.recognition.continuous = false;
        this.recognition.lang = 'tr-TR';
        this.synth = window.speechSynthesis;
    }

    start() {
        this.recognition.start();
    }

    stop() {
        this.recognition.stop();
    }

    onresult = (callback: (data: ISpeechEvent) => void) => {
        this.recognition.onresult = (result: ISpeechEvent) => callback(result);
    };

    speak(word: string) {
        return new Promise((resolve) => {
            const utterance = new SpeechSynthesisUtterance(word);
            utterance.addEventListener('end', () => {
                resolve(word);
            });
            this.synth?.speak(utterance);
        });
    }
}

const speech = new Speech();
export default speech;
