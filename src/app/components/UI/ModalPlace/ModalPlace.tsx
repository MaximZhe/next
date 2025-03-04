import React, { FC } from 'react';
import style from './Modal.module.scss';
import { useModalPlaceContext } from '@/contex/modal';
interface IModalProps {
    isOpen: boolean;
    children: React.ReactNode;
}
const ModalPlace:FC<IModalProps> = ({ isOpen, children }) => {
    if (!isOpen) return null;
    const {isOpenModalPlace, setIsOpenModalPlace} = useModalPlaceContext();
    function onClose() {
      setIsOpenModalPlace(false);
    }
    return (
      <div className={`${style['modal-overlay']} ${isOpenModalPlace ? style.active : ''}`}>
          <div className={style['modal-content']}>
            {children}
            <button className={style['modal-close']} onClick={() => {onClose()}}>Выбрать другое место</button>
          </div>
        </div>
    )
    
  };

export default ModalPlace;