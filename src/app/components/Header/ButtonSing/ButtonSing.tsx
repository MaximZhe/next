'use client'

import UserIcon from '@/app/icons/svg/UserIcon';
import style from '../Header.module.scss'
import { useSingFormVisibleContext } from '@/contex/index';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useUserAccountContext } from '@/contex/userAccount';
import { getTockenCookie } from '@/app/api/actionGetTockenCookie';


const ButtonSing = () => {
    const { isOpenSing, toggleVisibleForm } = useSingFormVisibleContext()
    const {accountData,toogleStateButton } = useUserAccountContext()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await getTockenCookie();
                if (token) {
                    toogleStateButton(true)
                }else{
                    toogleStateButton(false)
                }
            } catch (error) {
                console.log('Ошибка при получении данных:', error);
            }
        };

        fetchData();
    }, [accountData.stateButtonLogIn]);
   
    return (
        <>
            {accountData.stateButtonLogIn === false ?
                <div className={`${style.user}`} onClick={() => toggleVisibleForm(true)}>
                    <UserIcon className={style['user__icon']} />
                    <p className={style['user__text']}>Личный кабинет</p>
                </div>
                :
                <Link href='/account' className={style.user}>
                    <UserIcon className={style['user__icon']} />
                    <p className={style['user__text']}>Мой кабинет</p>
                </Link>
            }
        </>

    );
};

export default ButtonSing;