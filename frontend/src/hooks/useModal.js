import { useState } from 'react';

export const useModal = () => {
    const [modalState, setModalState] = useState({
        isOpen: false,
        title: '',
        message: '',
        type: 'info',
        confirmText: 'OK',
        cancelText: 'Cancel',
        showCancel: false,
        onConfirm: null,
        onClose: null
    });

    const showModal = ({
        title,
        message,
        type = 'info',
        confirmText = 'OK',
        cancelText = 'Cancel',
        showCancel = false,
        onConfirm = null
    }) => {
        return new Promise((resolve) => {
            setModalState({
                isOpen: true,
                title,
                message,
                type,
                confirmText,
                cancelText,
                showCancel,
                onConfirm: () => {
                    setModalState(prev => ({ ...prev, isOpen: false }));
                    if (onConfirm) onConfirm();
                    resolve(true);
                },
                onClose: () => {
                    setModalState(prev => ({ ...prev, isOpen: false }));
                    resolve(false);
                }
            });
        });
    };

    const closeModal = () => {
        setModalState(prev => ({ ...prev, isOpen: false }));
    };

    // Convenience methods
    const showAlert = (message, title = 'Alert') => {
        return showModal({
            title,
            message,
            type: 'info',
            confirmText: 'OK',
            showCancel: false
        });
    };

    const showConfirm = (message, title = 'Confirm') => {
        return showModal({
            title,
            message,
            type: 'confirm',
            confirmText: 'OK',
            cancelText: 'Cancel',
            showCancel: true
        });
    };

    const showError = (message, title = 'Error') => {
        return showModal({
            title,
            message,
            type: 'error',
            confirmText: 'OK',
            showCancel: false
        });
    };

    const showSuccess = (message, title = 'Success') => {
        return showModal({
            title,
            message,
            type: 'success',
            confirmText: 'OK',
            showCancel: false
        });
    };

    const showWarning = (message, title = 'Warning') => {
        return showModal({
            title,
            message,
            type: 'warning',
            confirmText: 'OK',
            showCancel: false
        });
    };

    return {
        modalState,
        showModal,
        closeModal,
        showAlert,
        showConfirm,
        showError,
        showSuccess,
        showWarning
    };
};