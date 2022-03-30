import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';
import './style.css';
import { ReactElement } from 'react';

interface IModalProps {
    isModalVisible: boolean;
    setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    modalTitle?: string;
    modalText?: string;
    modalSubText?: string;
    buttonText?: string;
    handleSubmit: () => void;
    disableClose?: boolean;
    modalImage?: ReactElement;
}

const CustomModal: React.FC<IModalProps> = ({
    isModalVisible,
    setIsModalVisible,
    modalTitle,
    modalText,
    modalSubText,
    buttonText,
    handleSubmit,
    disableClose,
    modalImage,
}) => {
    const handleClose = (event: unknown, reason: string) => {
        if (disableClose) {
            if (reason && reason === 'backdropClick') return;
        }
        setIsModalVisible(false);
    };

    return (
        <Modal
            open={isModalVisible}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            disableEscapeKeyDown={disableClose}
        >
            <Box className="modal-inner-container">
                <Typography id="modal-modal-title" variant="h4" component="h2">
                    {modalTitle}
                </Typography>
                <Box>
                    <Typography id="modal-modal-description" className="modal-text">
                        {modalText}
                    </Typography>
                </Box>
                <Box>
                    <Typography id="modal-modal-description" className="modal-sub-text">
                        {modalSubText}
                    </Typography>
                </Box>
                {modalImage}
                {buttonText && (
                    <Button variant="contained" className="modal-btn" onClick={handleSubmit}>
                        {buttonText}
                    </Button>
                )}
            </Box>
        </Modal>
    );
};

export default CustomModal;
