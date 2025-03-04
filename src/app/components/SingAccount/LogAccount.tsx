'use client'

import CloseIcon from '@/app/icons/svg/CloseIcon';
import React, { useEffect, useState } from 'react';
import SingForm from '../SingForm/LogInForm';
import RecoveryForm from '../RecoveryForm/RecoveryForm';
import { useRecoveryFormContext, useSingFormVisibleContext } from '@/contex/index';
import style from './SingAccount.module.scss';
import RegistrationForm from '../RegistrationForm/RegistrationForm';
import { useUserAccountContext } from '../../../contex/userAccount';

const SingAccount = () => {

    const { isRecoveryForm, setIsRecoveryForm } = useRecoveryFormContext()
    const { isOpenSing, toggleVisibleForm } = useSingFormVisibleContext()
    
    const {accountData, toggleFormContent} = useUserAccountContext();
    const handleFormSwitch = (form: string) => {
        toggleFormContent(form);
    };
    const  handleClickClose  = () => {
        toggleVisibleForm(false)
        setIsRecoveryForm(false)
    }
    return (
        <div className={`${style["popup-wrapper"]} ${isOpenSing.visibleForm ? style.open : ''}`}>
            <section className={style["form-autorization"]}>
                <button type="button" className={style["form-close"]}
                    onClick={handleClickClose }>
                    <CloseIcon />
                </button>
                {!isRecoveryForm ? 
                <div className={style["form-autorization__role"]}>
                    <button type='button' className={`${style['btn-user']} ${accountData.currentForm === 'login' ? style['btn-user--active'] : ''}`} onClick={() => handleFormSwitch('login')}>
                        Авторизация
                    </button>
                    <span>/</span>
                    <button type='button' className={`${style['btn-user']} ${accountData.currentForm === 'register' ? style['btn-user--active'] : ''}`} onClick={() => handleFormSwitch('register')}>
                        Регистрация
                    </button>
                </div> : null
                }
                {isRecoveryForm ? <RecoveryForm /> :
                    <>
                        <div className={style["forms"]}>

                            <div className={`${style['form-wrapper']} ${accountData.currentForm === 'login' ? style['form-wrapper--active'] : ''}`}>
                                <SingForm />
                            </div>
                            <div className={`${style['form-wrapper']} ${accountData.currentForm === 'register' ? style['form-wrapper--active'] : ''}`}>
                                <RegistrationForm />
                            </div>

                        </div>
                    </>
                }
            </section>
        </div>
    );
};

export default SingAccount;