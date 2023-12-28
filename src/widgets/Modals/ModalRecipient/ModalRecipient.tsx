import { useForm } from 'react-hook-form';

import style from './ModalRecipient.module.scss';
import Button from '../../../shared/Button/Button';
import { useAppDispatch, useAppSelector } from '../../../types/hooks';
import { toggleRecipient, triggerRender } from '../../../store/activeSlice';
import { toggleModal } from '../../../store/modalsSlice';

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react';
import clsx from 'clsx';

const ModalRecipient = ({ type, isOpen }) => {
  const dispatch = useAppDispatch();

  const { theme, recipient } = useAppSelector((state) => state.active);

  const { handleSubmit } = useForm({ mode: 'onBlur' });

  const onSubmit = () => {
    dispatch(triggerRender());
    dispatch(toggleModal({ action: false, type }));
  };

  const handleCloseModal = () => {
    dispatch(toggleModal({ action: false, type }));
    dispatch(triggerRender());
  };

  return (
    <Modal isOpen={isOpen} onClose={() => dispatch(toggleModal({ action: false, type }))}>
      <ModalOverlay />
      <ModalContent marginTop={200} borderRadius={16}>
        <ModalBody className={clsx(style.modal, theme && style.light)} padding={5}>
          <h1 className={clsx(style.modalTitle, theme && style.light)}>Выберите получателей</h1>
          <form className={style.modalForm} onSubmit={handleSubmit(onSubmit)}>
            <RadioGroup
              onChange={(e) => dispatch(toggleRecipient(e))}
              value={recipient}
              marginBottom={'20px'}
            >
              <Stack direction="column">
                <Radio value="all">Всем</Radio>
                <Radio value="without_order">Кто еще не заказывал</Radio>
                <Radio value="with_order">Кто уже заказывал</Radio>
                <Radio value="is_premium">С премимум подпиской TG</Radio>
              </Stack>
            </RadioGroup>
            <div style={{ display: 'flex', columnGap: '20px' }}>
              <Button
                view="delete"
                style={{ fontSize: '20px', color: '#fff' }}
                onClick={() => handleCloseModal()}
              >
                Закрыть
              </Button>
              <Button view="add" type="submit" style={{ fontSize: '20px' }}>
                Выбрать
              </Button>
            </div>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export { ModalRecipient };
