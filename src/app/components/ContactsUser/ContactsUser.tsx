'use client'
import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from "@hookform/error-message"
import style from './ContactsUser.module.scss';
import { PhoneInput} from 'react-international-phone';
import 'react-international-phone/style.css';

const ContactsUser = ({ controllers }: { controllers: any }) => {
    const { register, control, watch, formState: { errors } } = useFormContext();
    const Controller = controllers;
    const emailUser = watch(`Email`);
    const phoneUser = watch(`Phone`);
    return (
        <div className={style['contacts-user']}>
            <h3 className={style['contacts-user__title']}>
                Контактные данные
            </h3>
            <p className={style['contacts-user__subtitle']}>
                Эти данные будут использоваться для отправки информации о билетах
            </p>
            <div className={style['contacts-user-form']}>
                <div className={style['contacts-user-form__box']}>
                    <div className={style['contacts-user-form__input']}>
                        <div className={`${errors['Email'] ? `${style['errors-validate']}` : ''} ${style['contacts-user-form__wrapper']} `}>
                            <input type='email'
                                {...register('Email', {
                                    required: 'Пожалуйста, введите адрес электронной почты',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+[A-Z]{2,4}$/i,
                                        message: 'Укажите корректный адрес электронной почты'
                                    }
                                })}
                            />
                            <label className={`${emailUser ? style.active : ""}`}>Адрес электронной почты</label>
                        </div>

                        <div className={style['contacts-user-form__error']}>
                            <ErrorMessage errors={errors} name="Email" />
                        </div>
                    </div>
                    <div className={style['contacts-user-form__input-wrapper']}>
                        <div className={`${errors['Phone'] ? `${style['errors-validate']}` : ''} ${style['contacts-user-form__input']}`}>
                            <div className={`${style['contacts-user-form__wrapper']}  ${errors['Phone'] ? `${style['errors-validate']}` : ''}`}>
                                <Controller
                                    control={control}
                                    name="Phone"
                                    rules={{
                                        required: 'Пожалуйста, введите контактный телефон',
                                        minLength: 5,
                                        message: 'Пожалуйста, введите контактный телефон'
                                    }}
                                    render={({ field: { onChange, value, name, ref } }: any) => (
                                        <PhoneInput
                                            name={name}
                                            inputRef={ref}
                                            defaultCountry="ru"
                                            value={value}
                                            onChange={onChange}
                                        />
                                    )}
                                />
                                <label className={style.active}>Контактный телефон</label>
                            </div>


                            <div className={style['contacts-user-form__error']}>
                                {errors['Phone'] && (
                                    <div>
                                        <ErrorMessage errors={errors} name="Phone" />
                                        {errors['Phone'].type === 'minLength' && (
                                            <span>Пожалуйста, введите контактный телефон</span>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className={`${errors['PhoneTwo'] ? `${style['errors-validate']}` : ''} ${style['contacts-user-form__input']}`}>
                            <div className={`${style['contacts-user-form__wrapper']}  ${errors['PhoneTwo'] ? `${style['errors-validate']}` : ''}`}>
                                <Controller
                                    control={control}
                                    name="PhoneTwo"
                                    render={({ field: { onChange, value, name, ref } }: any) => (
                                        <PhoneInput
                                            name={name}
                                            inputRef={ref}
                                            defaultCountry="ru"
                                            value={value}
                                            onChange={onChange}
                                        />
                                    )}
                                />
                                <label className={style.active}>Контактный телефон</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style['contacts-user-form__check']}>
                    <input
                        type='checkbox'
                        {...register('HasSubscription')}
                    />
                    <label>Хочу получать информацию о скидках и акционных предложениях</label>
                </div>
            </div>

        </div>
    );
};

export default ContactsUser;