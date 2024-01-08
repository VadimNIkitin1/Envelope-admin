import { ReactNode } from 'react';

export interface ModalWindowProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title: string;
  onSubmit?: () => void;
  type?: string;
}
