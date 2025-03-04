import React, { FC } from 'react';
import style from './Modal.module.scss';
import { useModalContext } from '@/contex/modal';
import { backPage } from '@/app/utils/backPage';

interface IModalProps {
  isOpen: boolean;
  children: React.ReactNode;
}

const Modal: FC<IModalProps> = ({ isOpen, children }) => {
  const { setIsModal } = useModalContext();

  function onClose() {
    setIsModal(false);
  }


  if (!isOpen) {
    return null;
  }

  return (
    <div className={style['modal-overlay']}>
      <div className={style['modal-content']}>
        {children}
        <button
          className={style['modal-close']}
          onClick={() => {
            onClose();
            backPage();
          }}
        >
          Перейти к поиску
        </button>
      </div>
    </div>
  );
};

export default Modal;