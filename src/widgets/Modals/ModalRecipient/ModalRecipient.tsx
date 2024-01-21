import { useForm } from 'react-hook-form';
import { Radio, RadioGroup, Stack } from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from '@/types/hooks';

import { toggleRecipient, triggerRender } from '@/store/activeSlice/activeSlice';
import { toggleModal } from '@/store/modalsSlice';

import { ModalWindow } from '@/entities/ModalWindow';
import { getAllActiveProperties } from '@/store/activeSlice';

const ModalRecipient = ({ type, isOpen }) => {
  const dispatch = useAppDispatch();

  const { recipient } = useAppSelector((state) => getAllActiveProperties(state));

  const { handleSubmit } = useForm({ mode: 'onBlur' });

  const onSubmit = () => {
    dispatch(triggerRender());
    dispatch(toggleModal({ action: false, type }));
  };

  return (
    <ModalWindow
      isOpen={isOpen}
      onClose={() => dispatch(toggleModal({ action: false, type }))}
      title={'Выберите получателей'}
      onSubmit={handleSubmit(onSubmit)}
    >
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
    </ModalWindow>
  );
};

export { ModalRecipient };
