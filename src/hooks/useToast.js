import { useState, useCallback } from 'react';

const useToast = () => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = 'info', duration = 3000) => {
        const id = Date.now() + Math.random();
        const newToast = {
            id,
            message,
            type,
            duration
        };
        
        setToasts(prev => [...prev, newToast]);
        
        // Auto remove toast after duration
        if (duration > 0) {
            setTimeout(() => {
                removeToast(id);
            }, duration);
        }
        
        return id;
    }, []);

    const removeToast = useCallback((id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    }, []);

    const clearAllToasts = useCallback(() => {
        setToasts([]);
    }, []);

    return {
        toasts,
        addToast,
        removeToast,
        clearAllToasts,
        // Convenience methods
        showSuccess: (message, duration) => addToast(message, 'success', duration),
        showError: (message, duration) => addToast(message, 'error', duration),
        showWarning: (message, duration) => addToast(message, 'warning', duration),
        showInfo: (message, duration) => addToast(message, 'info', duration),
    };
};

export default useToast;