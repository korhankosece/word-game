import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { getPermission, isBrowserSupported } from '../../utils/browserUtils';
import CustomModal from '../shared/Modal/Modal';
import useGameStore from '../../stores/GameStore';
import Play from '../Play/Play';
import './style.css';
import MicRequestImage from '../../assets/images/mic-request.png';

const Main: React.FC = () => {
    const {
        state: { errorMessage, isGameStarted },
        actions: { changeGameStatus },
    } = useGameStore();
    const [isModalVisible, setIsModalVisible] = useState((errorMessage && true) || false);
    const [isPlayable, setIsPlayable] = useState(false);

    const handleMicPermission = () => {
        if (!isBrowserSupported()) {
            changeGameStatus({
                isGameStarted: false,
                errorMessage: 'Desteklenmeyen tarayıcı, lütfen başka bir tarayıcı deneyiniz.',
            });
            return;
        }

        getPermission()
            .then(() => {
                setIsModalVisible(false);
                setIsPlayable(true);
            })
            .catch(() =>
                changeGameStatus({
                    isGameStarted: false,
                    errorMessage: 'Mikrofon izni alınamadı!',
                }),
            );
    };

    return (
        <Box className="main-container">
            <Typography variant="h2" component="h1">
                Kelime Oyunu
            </Typography>
            {!isGameStarted && (
                <Typography component="p" className="main-text">
                    Bilgisayara karşı oynanan bu oyunda son söylenen kelimenin son harfi ile
                    başlayan bir kelime türetmelisin. Kullanılan kelimeleri tekrar kullanmamaya ve
                    süreye dikkat et! Hadi o zaman başlayalım...
                </Typography>
            )}
            {!isPlayable ? (
                <Button
                    variant="contained"
                    className="request-btn"
                    onClick={() => setIsModalVisible(true)}
                >
                    İZİN VER
                </Button>
            ) : (
                <Play />
            )}
            <CustomModal
                modalTitle={errorMessage ? 'Hata ' : 'Mikrofon izni'}
                modalText={
                    errorMessage ||
                    'Oyuna başlayabilmek için lütfen mikrofon erişimine izin veriniz.'
                }
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
                handleSubmit={handleMicPermission}
                buttonText={!errorMessage ? 'İZİN VER' : ''}
                modalImage={
                    <Box>
                        <img
                            className="modal-request-image"
                            alt="Microphone request snapshot"
                            src={MicRequestImage}
                        />
                    </Box>
                }
            />
        </Box>
    );
};

export default Main;
