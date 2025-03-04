import React, { FC } from 'react';
import style from './Modal.module.scss';
import { useModalErrorContext } from '@/contex/modal';

interface IModalProps {
    isOpen: boolean;
    children: React.ReactNode;
}
const ModalErrors:FC<IModalProps> = ({ isOpen, children }) => {
    if (!isOpen) return null;
    const {isModalError, setIsModalError} = useModalErrorContext();
    function onClose() {
      setIsModalError(false);
    }
    return (
      <div className={style['modal-overlay']}>
        <div className={style['modal-content']}>
          {children}
          <button className={style['modal-close']} onClick={() => {onClose()}}></button>
        </div>
      </div>
    );
  };

export default ModalErrors;