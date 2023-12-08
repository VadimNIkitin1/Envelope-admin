import { CgDanger } from 'react-icons/cg';
import style from './Instruction.module.scss';
import { useState } from 'react';
import clsx from 'clsx';

const Instruction = () => {
  const [hidden, setHidden] = useState(true);

  return (
    <div className={style.instruction_container}>
      <p className={style.instruction_title} onClick={() => setHidden(!hidden)}>
        <CgDanger fontSize={'18px'} color="#fb923c" /> Инструкция
      </p>
      <ol className={clsx(style.instruction_text, hidden && style.hidden)}>
        <li>
          Перейдите в чат с ботом{' '}
          <a href="https://t.me/BotFather" target="_blank" style={{ color: '#2b9cf2' }}>
            @BotFather
          </a>{' '}
          в Telegram
        </li>
        <li>Отправьте команду /newbot , чтобы создать нового бота</li>
        <li>Укажите name и username</li>
        <li>
          {' '}
          В ответ{' '}
          <a href="https://t.me/BotFather" target="_blank" style={{ color: '#2b9cf2' }}>
            @BotFather
          </a>{' '}
          пришлет токен вашего бота в формате:{' '}
          <p style={{ color: '#fb923c' }}>789012:DEF-ABC5678ijKlm-nop90X1u2v345rsTU</p>
        </li>
        <li>Укажите его в поле Telegram-токен бота</li>
        <li>Ссылку на бота указать без @ </li>
      </ol>
    </div>
  );
};

export { Instruction };
