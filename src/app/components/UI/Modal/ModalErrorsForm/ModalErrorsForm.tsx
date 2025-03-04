'use client'
import React, { FC } from 'react';
import style from './ModalErrorsForm.module.scss';
import { useModalErrorFormContext } from '@/contex/modal';

interface IModalProps {
    isOpen: boolean;
    children: React.ReactNode;
}
const ModalErrorsForm:FC<IModalProps> = ({ isOpen, children }) => {
    if (!isOpen) return null;
    const { setIsModalErrorForm} = useModalErrorFormContext();
    function onClose() {
      setIsModalErrorForm(false);
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

export default ModalErrorsForm;