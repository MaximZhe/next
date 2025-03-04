'use client'

import React, { FC, useState } from 'react';
import { useForm } from "react-hook-form";
import style from './SingForm.module.scss';
import { ErrorMessage } from '@hookform/error-message';
import { useRecoveryFormContext, useSingFormVisibleContext } from '@/contex/index';

import { useRouter } from 'next/navigation';
import GridLoader from 'react-spinners/GridLoader';
import { useUserAccountContext } from '@/contex/userAccount';


const SingForm: FC = () => {

    const { setIsRecoveryForm } = useRecoveryFormContext()
    const [isVissible, setIsVissible] = useState(false);
    const { toggleVisibleForm, setValueButton } = useSingFormVisibleContext()
    const [loadingSing, setLoadingSing] = useState(false)
    const { toogleStateButton } = useUserAccountContext()
    const router = useRouter()

    const { register, formState: { errors }, handleSubmit } = useForm({
        defaultValues: {
            phone: '',
            password: '',
        },
        mode: 'onBlur'
    });

    const getTocken = async (data: { phone: string, password: string }) => {
        const dat = {
            username: data.phone,
            password: data.password
        }
        setLoadingSing(true)
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dat),
            });

            if (response.status === 401) {
                alert('Неправильный логин или пароль')
                setLoadingSing(false)
                return
                
            }
            setLoadingSing(false)
            const authResult = await response.json();
            if (authResult) {
                router.push('/account')
                toggleVisibleForm(false)
                setValueButton(false)
                toogleStateButton(true)
            }

        } catch (error) {
            setLoadingSing(false)
            console.log("Error:", error);
        }
    }
    const onSubmitForm = (data: { phone: string, password: string }) => {
        getTocken(data)
    }
    return (
        <>  {loadingSing ?
                <div className={style['loading-form']}>
                    Проверка данных
                    <div className='loading-spiner'>
                        <GridLoader color={'#0243A6'} loading={true} size={10} />
                    </div>
                </div> : null
            }
            <div className={`${style['form-autorization__wrapper']} ${style.active}`}>
                <form className={`${style['form-autorization__form']} ${style['form-lk']} ${style.active} `}
                    onSubmit={handleSubmit(onSubmitForm)} >
                    <div className={style['form-autorization__phone-wrapper']}>
                    <label>Номер телефона</label>
                        <input type="text"
                            {...register('phone', { required: 'Пожалуйста, введите номер телефона' })} placeholder="+375 29 000 45 45" />
                        <span><ErrorMessage errors={errors} name="phone" /></span>
                    </div>
                    <label>Пароль</label>
                    <div className={style["password-wrapper"]}>
                        <input id="passenger-password"
                            type={isVissible ? "text" : "password"}
                            {...register('password', { required: 'Пожалуйста, введите пароль' })}
                            placeholder="Пароль" />
                        <span className={`${style["toggle-password"]} ${isVissible ? style['open-password'] : ''}`} onClick={() => setIsVissible(!isVissible)}>
                            <svg className={style["password__hidden"]} width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M10.7429 5.09232C11.1494 5.03223 11.5686 5 12.0004 5C17.1054 5 20.4553 9.50484 21.5807 11.2868C21.7169 11.5025 21.785 11.6103 21.8231 11.7767C21.8518 11.9016 21.8517 12.0987 21.8231 12.2236C21.7849 12.3899 21.7164 12.4985 21.5792 12.7156C21.2793 13.1901 20.8222 13.8571 20.2165 14.5805M6.72432 6.71504C4.56225 8.1817 3.09445 10.2194 2.42111 11.2853C2.28428 11.5019 2.21587 11.6102 2.17774 11.7765C2.1491 11.9014 2.14909 12.0984 2.17771 12.2234C2.21583 12.3897 2.28393 12.4975 2.42013 12.7132C3.54554 14.4952 6.89541 19 12.0004 19C14.0588 19 15.8319 18.2676 17.2888 17.2766M3.00042 3L21.0004 21M9.8791 9.87868C9.3362 10.4216 9.00042 11.1716 9.00042 12C9.00042 13.6569 10.3436 15 12.0004 15C12.8288 15 13.5788 14.6642 14.1217 14.1213"
                                    stroke="#9B9B9E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <svg className={style["password__view"]} width="24" height="24" viewBox="0 0 22 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M1.42012 8.71318C1.28394 8.49754 1.21584 8.38972 1.17772 8.22342C1.14909 8.0985 1.14909 7.9015 1.17772 7.77658C1.21584 7.61028 1.28394 7.50246 1.42012 7.28682C2.54553 5.50484 5.8954 1 11.0004 1C16.1054 1 19.4553 5.50484 20.5807 7.28682C20.7169 7.50246 20.785 7.61028 20.8231 7.77658C20.8517 7.9015 20.8517 8.0985 20.8231 8.22342C20.785 8.38972 20.7169 8.49754 20.5807 8.71318C19.4553 10.4952 16.1054 15 11.0004 15C5.8954 15 2.54553 10.4952 1.42012 8.71318Z"
                                    stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path
                                    d="M11.0004 11C12.6573 11 14.0004 9.65685 14.0004 8C14.0004 6.34315 12.6573 5 11.0004 5C9.34355 5 8.0004 6.34315 8.0004 8C8.0004 9.65685 9.34355 11 11.0004 11Z"
                                    stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                    </div>
                    <span><ErrorMessage errors={errors} name="password" /></span>
                    <button type="button" className={style['form-autorization__restore']} onClick={() => setIsRecoveryForm(true)} >Восстановить доступ</button>
                    <button type="submit" className={`${style['form-autorization__btn']} ${style['form-lk-btn']} ${style.active}`}
                    >Войти</button>

                </form>
            </div>
        </>

    );
};

export default SingForm;