import { FC } from 'react';
import { Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/react';

import { useAppSelector } from '@/types/hooks';

import { ModalType } from '@/store/modalsSlice';
import { getAllActiveProperties } from '@/store/activeSlice/selectors';

import { Button } from '@/shared/Button';

import type { ModalWindowProps } from './types';

import style from './ModalWindow.module.scss';
import clsx from 'clsx';

const ModalWindow: FC<ModalWindowProps> = ({
  children,
  isOpen,
  onClose,
  title,
  onSubmit,
  type,
}) => {
  const { theme } = useAppSelector((state) => getAllActiveProperties(state));

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
