'use client'
import React, { FC, useEffect, useState } from 'react';
import style from './UserProfile.module.scss'
import moment from 'moment';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import CalendarIcon from '@/app/icons/svg/CalendarIcon';
import { set, useForm } from 'react-hook-form';
import { setUpdateProfile } from '@/app/api/actionUpdateAccount';
import { useRouter } from 'next/dist/client/components/navigation';
import { getTockenCookie } from '@/app/api/actionGetTockenCookie';
import { getInfoUser } from '@/app/api/actionGetProfileUser';
import Loading from '@/app/components/UserProfile/loading';



interface IUser {
    LastName: string;
    FirstName: string;
    MiddleName: string;
    Email: string;
    Password: string;
    ConfirmPassword: string;
    Phone: string;
    DateOfBirthDay: string;
    Pasport: string;

}

const UserProfile: FC = () => {
    const [tockenValue, setTockenValue] = useState('')
    const [vissibleMassage, setVissibleMassage] = useState(false);
    const [profileUser, setProfileUser] = useState<IUser>({
        LastName: '',
        FirstName: '',
        MiddleName: '',
        Email: '',
        Password: '',
        ConfirmPassword: '',
        Phone: '',
        DateOfBirthDay: '',
        Pasport: '',
    });
    const [date, setDate] = useState<any>();
    const [isVissiblePassword, setIsVissiblePassword] = useState(false);
    const [isConfirmPassword, setIsConfirmPassword] = useState(false);
    const [editProfile, setEditProfile] = useState(true)
    const [loadingDatas, setLoadingDatas] = useState(false)
    const [loadingSave, setLoadingSave] = useState(false)
    const [updateDate, setUpdateDate] = useState<any>((new Date()));
    const [isCalendarShow, setCalendarShow] = useState(false)
    const { register, formState: { errors }, handleSubmit, setValue } = useForm({
        defaultValues: {
            lastName: '',
            firstName: '',
            middleName: '',
            email: '',
            phone: '',
            birthDate: '',
            pasport: '',
            Password: '',
            confirmPassword: '',
        },
    });
    const router = useRouter();
    useEffect(() => {
        const fetchTocken = async () => {
            try {
                const res = await getTockenCookie();
                if (res) {
                    setTockenValue(res.value);
                }
            } catch (error) {
                console.log('Token not found', error);

            }
        };

        fetchTocken();
    }, []);

    useEffect(() => {
        const profileInfo = async () => {
            setLoadingDatas(true)
            try {
                const res = await getInfoUser(tockenValue !== undefined ? tockenValue : '');
                if (res?.Result && JSON.stringify(res.Result) !== JSON.stringify(profileUser)) {
                    setProfileUser(res.Result);
                }
               
            } catch (error) {
                console.log(error);
            }
            finally {
                setLoadingDatas(false)
            }
        };
        if (tockenValue !== '') {
            profileInfo();
        }
    }, [tockenValue])

    useEffect(() => {
        setValue("lastName", profileUser?.LastName)
        setValue("firstName", profileUser?.FirstName)
        setValue("middleName", profileUser?.MiddleName)
        setValue("email", profileUser?.Email)
        setValue("phone", profileUser?.Phone)
        setValue("birthDate", profileUser?.DateOfBirthDay)
        setValue("pasport", profileUser?.Pasport)

    }, [profileUser])

    const handleDateChange = (selectedDate: any) => {
        const newDate = moment(selectedDate).format('DD.MM.YYYY');
        setUpdateDate(selectedDate);
        setValue("birthDate", newDate);
        setDate(newDate);
        setCalendarShow(prev => !prev)
    };
    const visaibleCalendar = () => {
        if (editProfile === false) {
            setCalendarShow(prev => !prev)
        }
    }
    const getProfile = async (data: any) => {
        setLoadingSave(true)
        try {
            const res = await setUpdateProfile(data)
           
        }
        catch (error) {
            console.log(`ошибка обновления данных профиля ${error}`)
        }
        finally {
            setLoadingSave(false)
            setEditProfile(true);
        }
    }
    const handleSubmitProfile = (data: any) => {
        getProfile(data)

    }
    const handleEditProfile = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setEditProfile(false);
        setValue("birthDate", profileUser?.DateOfBirthDay);
        setDate(profileUser?.DateOfBirthDay);
    };
    const deleteUser = async () => {
        try {
            const response = await fetch('/api/auth/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 401) {
                alert('Ошибка удаления аккаунта')
                return

            }
            const responseDelete = await response.json();
            if (responseDelete) {
                router.push('/')
            }
        } catch (error) {
            console.log("Error:", error);
        }
    }
    return (
        <div className={style["content-section"]}>
            <div className={`${style['content-section__massage']} ${vissibleMassage ? style['massage-active'] : ''} `}>
                <h2 className={style['content-section__title']}>Хотите удалить аккаунт?</h2>
                <div className={style['content-section__buttons']}>
                    <button className={style["user-profile-form__btn"]} onClick={deleteUser}>Да</button>
                    <button className={style["user-profile-form__btn"]} onClick={() => setVissibleMassage(false)}>Нет</button>
                </div>
            </div>
            <form className={style["user-profile-form"]} id="user-profile-form" onSubmit={handleSubmit(handleSubmitProfile)}>
                <div className={style['user-profile-form__wrapper']}>
                    <div className={style["user-profile-form__body"]}>
                        <div className={style["user-profile-form__content"]}>
                            <label htmlFor="last-name">Фамилия:</label>
                            {loadingDatas ? <Loading /> :
                                <input type="text" {...register("lastName")} placeholder="не заполненно"
                                    readOnly={editProfile ? true : false} />
                            }

                        </div>
                        <div className={style["user-profile-form__content"]}>
                            <label htmlFor="first-name">Имя:</label>
                            {loadingDatas ? <Loading /> : <input
                                type="text" {...register("firstName")} placeholder="не заполненно" readOnly={editProfile ? true : false} />
                            }
                        </div>
                        <div className={style["user-profile-form__content"]}>
                            <label htmlFor="middle-name">Отчество:</label>
                            {loadingDatas ? <Loading /> :
                                <input
                                    type="text" {...register("middleName")} placeholder="не заполненно"
                                    readOnly={editProfile ? true : false} />}
                        </div>
                        <div className={style["user-profile-form__content"]}>
                            <label htmlFor="phone">Телефон:</label>
                            {loadingDatas ? <Loading /> : <input
                                type="tel" {...register("phone")} placeholder="не заполненно" readOnly={editProfile ? true : false} />
                            }
                        </div>
                        <div className={style["user-profile-form__content"]}>
                            <label htmlFor="email">Электронный адрес:</label>
                            {loadingDatas ? <Loading /> :
                                <input type="email" {...register("email")} placeholder="не заполненно" readOnly={editProfile ? true : false} />
                            }
                        </div>
                    </div>
                    <div className={style["user-profile-form__body"]}>
                        <div className={`${style["user-profile-form__content"]} ${style['user-profile-form__content--date']}`}>
                            <label htmlFor="birth-date">Дата рождения:</label>
                            {loadingDatas ? <Loading /> :
                                <div className={`${style['user-profile-form__inner']} ${!editProfile ? style['user-profile-form__inner--active'] : ''}`}
                                onClick={visaibleCalendar}>
                                    <input value={date || ''} type="text" {...register("birthDate")} placeholder="01-01-2000"
                                        readOnly={editProfile ? true : false}
                                         />
                                    {editProfile ? null : <CalendarIcon
                                        className={`${style['user-profile-form__icon']} `}
                                         />
                                    }
                                </div>}

                            {isCalendarShow ?
                                <div className={style['user-profile-form__calendar']}>
                                    <Calendar
                                        onChange={handleDateChange}
                                        value={updateDate}
                                    />
                                </div>
                                : null}
                        </div>
                        <div className={style["user-profile-form__content"]}>
                            <label htmlFor="passport-number">Номер Паспорта:</label>
                            {loadingDatas ? <Loading /> : <input type="text" {...register("pasport")}
                                placeholder="не заполненно" readOnly={editProfile ? true : false} />
                            }
                        </div>
                        {/* <div className={style["user-profile-form__content"]}>
                            <label htmlFor="citizenship">Гражданство:</label>
                            <input type="text" {...register("citizenship")} placeholder="Россия" readOnly />
                        </div> */}

                        <div className={`${style["user-profile-form__content"]} ${editProfile ? style.hidden : style.vissible}`} id="user-profile-password">
                            <label htmlFor="password-profile">Пароль:</label>
                            <div className={style["password-container-profile"]}>
                                <input {...register('Password')} type={isVissiblePassword ? "text" : "password"} id={style["password-profile"]} placeholder="" minLength={6}
                                    readOnly={editProfile ? true : false} />
                                <span className={`${style["toggle-password-profile"]} ${isVissiblePassword ? style['open-password'] : ''}`} onClick={() => setIsVissiblePassword(!isVissiblePassword)}
                                >
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

                        </div>
                        <div className={`${style["user-profile-form__content"]} ${editProfile ? style.hidden : style.vissible}`} >
                            <label htmlFor="confirmPassword">Подтвердить пароль:</label>
                            <div className={style["password-container-profile"]} >
                                <input type={isConfirmPassword ? "text" : "password"} {...register("confirmPassword")} id={style["confirm-password"]} />
                                <span className={`${style["toggle-password-profile"]} ${isConfirmPassword ? style['open-password'] : ''}`} onClick={() => setIsConfirmPassword(!isConfirmPassword)}>
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
                        </div>
                    </div>
                </div>
                <div className={style['container-btn']}>
                    {editProfile ?
                        <button className={style["user-profile-form__btn"]} type="button" id="edit-button" onClick={handleEditProfile}>Редактировать
                            профиль</button>
                        :
                        <button className={style["user-profile-form__btn"]} type="submit" id="edit-button-save"
                        >{loadingSave ? 'Сохранение изменений...' : 'Сохранить'}</button>
                    }
                    <button type='button' className={style["user-profile-form__btn"]} onClick={() => setVissibleMassage(true)}>Удалить аккаунт</button>
                </div>
            </form>
        </div>

    );
};

export default UserProfile;