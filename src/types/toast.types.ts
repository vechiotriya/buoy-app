export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastOptions {
  message: string;
  type?: ToastType;
  title: string;
  duration?: number;
}

export interface ToastContextValue {
  show: (options: ToastOptions) => void;
  hide: () => void;
}

export interface ToastState {
  visible: boolean;
  message: string;
  title: string;
  type: ToastType;
}