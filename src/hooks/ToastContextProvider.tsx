import React, { createContext, useCallback, useContext, useRef, useState } from 'react';
import Toast from '../components/Toast';
import { ToastContextValue, ToastOptions, ToastState } from '../types/toast.types';

export const ToastContext = createContext<ToastContextValue | undefined>(undefined);

const DEFAULT_DURATION = 3000;

const DEFAULT_STATE: ToastState = {
  visible: false,
  message: '',
  title: '',
  type: 'success',
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toast, setToast] = useState<ToastState>(DEFAULT_STATE);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hide = useCallback(() => {
    setToast(prev => ({ ...prev, visible: false }));
  }, []);

  const show = useCallback(({ message,title, type = 'info', duration = DEFAULT_DURATION }: ToastOptions) => {
    // Clear any existing timer to prevent premature dismissal
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Show the toast
    setToast({ visible: true, message,title, type });

    // Auto-dismiss after duration
    timerRef.current = setTimeout(() => {
      hide();
    }, duration);
  }, [hide]);

  return (
    <ToastContext.Provider value={{ show, hide }}>
      {children}
      <Toast
        visible={toast.visible}
        message={toast.message}
        title={toast.title}
        type={toast.type}
      />
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextValue => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
};