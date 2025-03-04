'use client'
import React, { FC } from 'react';
import style from './ModalErrorsSearchId.module.scss';
import { useModalErrorSearchIdContext } from '@/contex/modal';

interface IModalProps {
    isOpen: boolean;
    children: React.ReactNode;
}
const ModalErrorsSearchId:FC<IModalProps> = ({ isOpen, children }) => {
    if (!isOpen) return null;
    const { setIsModalErrorSearchId} = useModalErrorSearchIdContext();
    function onClose() {
      setIsModalErrorSearchId(false);
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

export default ModalErrorsSearchId;