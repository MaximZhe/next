'use client'
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from "react-hook-form";
import style from './Recovery.module.scss';
import { useRecoveryFormContext } from '@/contex/index';
import { ErrorMessage } from '@hookform/error-message';
import { getCodeMassage } from '@/app/api/actionForgotPassword';
import UpdatePassworForm from '../UpdatePasswordForm/UpdatePasswordForm';
import GridLoader from 'react-spinners/GridLoader';

const RecoveryForm = () => {

    const { setIsRecoveryForm } = useRecoveryFormContext()
    const [isCode, setIsCode] = useState(false)
    const [isDisabledButton, setIsDisabledButton] = useState(true)
    const [isUpdateForm, setIsUpdateForm] = useState(false)
    const [loadingResponse, setLoadingResponse] = useState(false)

    const [objectResetPassword, setObjectResetPassword] = useState({
        phone: '',
        code: '',
    })
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            phone: ''
        },
        mode: 'onBlur'
    });


    const getCode = async (phone: string) => {
        setLoadingResponse(true)
        try {
            const response = await getCodeMassage(phone)
            if (response?.Result !== null) {
                setIsCode(true)
                setObjectResetPassword(prevState => ({ ...prevState, phone: phone }))
            }else{
                setIsCode(false)
                const errorMassage = response?.Error?.Message
                alert(errorMassage)
            }
        }
        catch (error) {
            console.error('Ошибка при получении смс кода:', error);
        }
        finally {
            setLoadingResponse(false)
        }
    }
    const onSubmitForm = (data: any) => {
        getCode(data.phone)
    }
    const [smsCodeValues, setSmsCodeValues] = useState(Array(6).fill(''));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (index: number, value: string) => {
        const newValues = [...smsCodeValues];
        newValues[index] = value;
        setSmsCodeValues(newValues);
        const valueCode = newValues.join('')
        if (valueCode.length === 6) {
            setIsDisabledButton(false)
            setObjectResetPassword(prevState => ({ ...prevState, code: valueCode }))
        }
        if (value.length >= 1 && index < smsCodeValues.length - 1) {
            inputRefs.current[index + 1]?.focus();

        }
    };

    const handleKeyDown = (index: number, e: { key: string; }) => {
        if (e.key === 'Backspace' && smsCodeValues[index].length === 0 && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const redirectUpdateForm = () => {
        setIsUpdateForm(true)
    }
    return (
        <>
            {isUpdateForm ?
                <UpdatePassworForm dataUpdatePassword={objectResetPassword} />
                :
                <>
                    {loadingResponse ?
                        <div className={style['loading-form']}>
                            Отправка сообщения с кодом
                            <div className='loading-spiner'>
                                <GridLoader color={'#FFFFFF'} loading={true} size={10} />
                            </div>
                        </div> : null
                    }
                    <div className={style["form-recovery"]}>
                        <h2 className={style["form-recovery__title"]}>Восстановить пароль</h2>
                        <form id="form-recovery" className={`${style["form-recovery__form"]} ${style["form-lk"]}`} onSubmit={handleSubmit(onSubmitForm)}>
                            <div className={style["form-recovery__phone-wrapper"]}>
                                <label>Номер телефона</label>
                                <input id="phoneRecovery" type="text"
                                    {...register('phone', {
                                        required: "Пожалуйста введите номер телефона",
                                        pattern: {
                                            value: /^[^a-zA-Z]*$/,
                                            message: "Только цифры и специальные знаки разрешены"
                                        }
                                    }
                                    )} name="phone" placeholder="+375 29 000 45 45" />
                                <ErrorMessage errors={errors} name="phone" />
                                <div className={`${style["form-recovery-verification"]} ${isCode ? style['form-recovery-verification--active'] : ''}`}>
                                    <label>Укажите код из СМС</label>
                                    <div className={style["sms-code-container"]}>
                                        {smsCodeValues.map((value, index) => (
                                            <input
                                                key={index}
                                                ref={el => inputRefs.current[index] = el} // Привязка рефа к элементу
                                                type="text"
                                                maxLength={1}
                                                className={style["sms-code"]}
                                                value={value}
                                                onChange={(e) => handleChange(index, e.target.value)}
                                                onKeyDown={(e) => handleKeyDown(index, e)}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className={style["form-recovery-submit-btn"]}>
                                    {isCode ?
                                        <button id="btn-recovery-phone" type='button'
                                            className={`${style['form-recovery_btn-next']} ${style['form-lk-btn']}`}
                                            disabled={isDisabledButton ? true : false}
                                            onClick={redirectUpdateForm}>Далее</button>
                                        :
                                        <button id="btn-recovery-phone" type='submit'
                                            className={`${style['form-recovery_btn-next']} ${style['form-lk-btn']}`}

                                        >Далее</button>
                                    }

                                </div>
                            </div>
                            <div className={style["form-autorization-footer"]}>
                                {!isCode ?
                                    <button id={style['autorization-back']} type="button" className={style["form-autorization-footer__btn"]}
                                        onClick={() => setIsRecoveryForm(false)}>
                                        Вернуться назад
                                    </button>
                                    :
                                    <div className={style["change-block"]}>
                                        <button className={style["form-autorization-footer__btn"]} type="button"
                                            onClick={() => getCode(objectResetPassword.phone)}>
                                            Отправить смс повторно
                                        </button>
                                        <button className={style["form-autorization-footer__btn"]} type="button"
                                            onClick={() => setIsRecoveryForm(false)}>
                                            Нет доступа к телефону
                                        </button>
                                    </div>}
                            </div>
                        </form>
                    </div>
                </>
            }
        </>


    );
};

export default RecoveryForm;

