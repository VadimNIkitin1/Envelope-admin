import { FC, ReactNode } from 'react';

import { useAppSelector } from '../../types/hooks';

import { ModalType } from '../../store/modalsSlice';

import { Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/react';
import { Button } from '../../shared/Button/Button';

import style from './ModalWindow.module.scss';
import clsx from 'clsx';

interface ModalWindowProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title: string;
  onSubmit?: () => void;
  type?: string;
}

const ModalWindow: FC<ModalWindowProps> = ({
  children,
  isOpen,
  onClose,
  title,
  onSubmit,
  type,
}) => {
  const { theme } = useAppSelector((state) => state.active);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent borderRadius={16}>
        <ModalBody className={clsx(style.modal, theme && style.light)} padding={5}>
          <h1 className={clsx(style.modalTitle, theme && style.light)}>{title}</h1>
          <form className={style.modalForm} onSubmit={onSubmit}>
            {children}
            <div style={{ display: 'flex', columnGap: '20px' }}>
              <Button view="delete" style={{ fontSize: '20px', color: '#fff' }} onClick={onClose}>
                Закрыть
              </Button>
              <Button view="add" type="submit" style={{ fontSize: '20px' }}>
                {type === ModalType.DELETE ? 'Удалить' : title}
              </Button>
            </div>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export { ModalWindow };
