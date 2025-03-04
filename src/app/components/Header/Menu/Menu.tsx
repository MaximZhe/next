'use client'


import style from './Menu.module.scss'
import { FC, useEffect, useState } from 'react';

import Link from 'next/link';
import ArrowIcon from '@/app/icons/svg/ArrowIcon';
import UserIcon from '@/app/icons/svg/UserIcon';
import { useAppDispatch, useAppSelector } from '@/app/hooks/redux';
import { setLanguageValue } from '@/redux/slice/languageSlice';
import { setIsStateMenuMobail } from '@/redux/slice/menuMobileStateSlice';
import { getTockenCookie } from '@/app/api/actionGetTockenCookie';
import { useSingFormVisibleContext } from '@/contex';
import { useUserAccountContext } from '@/contex/userAccount';
interface IMenuProps {
    className?: string,
    responsive?: boolean,
    backgroundWapper?:string
}

// eslint-disable-next-line react/display-name
const Menu: FC<IMenuProps> = ({ className, responsive, backgroundWapper }) => {

    const [isOpenDropdown, setIsOpenDropdown] = useState(false);
    const { language } = useAppSelector((state: { languageReduser: any; }) => state.languageReduser);
    const { isShow } = useAppSelector((state: { stateMobileMenuReduser: any; }) => state.stateMobileMenuReduser);
    const { isOpenSing, toggleVisibleForm } = useSingFormVisibleContext()
    const { accountData, toogleStateButton } = useUserAccountContext()
    const [token, setToken] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await getTockenCookie();
                if (token) {
                    toogleStateButton(true)
                } else {
                    toogleStateButton(false)
                }
            } catch (error) {
                console.log('Ошибка при получении данных:', error);
            }
        };

        fetchData();
    }, [accountData.stateButtonLogIn]);


    const dispatch = useAppDispatch();
    return (
        <div className={`${className ? className : ''} ${style.nav} ${!isShow ? style.hide : style.show}  ${responsive ? style.responsive : ''} `}>
            <div className='container'>

                {/* <>
                    {accountData.stateButtonLogIn === false ?
                        <div className={`${style.user} ${style['user--mobail']}`} onClick={() => { toggleVisibleForm(true); dispatch(setIsStateMenuMobail(!isShow)) }}>
                            <UserIcon className={style['user__icon']} />
                            <p className={style['user__text']}>Личный кабинет</p>
                        </div>
                        :
                        <Link href='/account' className={`${style.user} ${style['user--mobail']}`}
                            onClick={() => dispatch(setIsStateMenuMobail(!isShow))}>
                            <UserIcon className={style['user__icon']} />
                            <p className={style['user__text']}>Мой кабинет</p>
                        </Link>
                    }
                </> */}

                <nav className={style.menu}>
                    <div className={`${backgroundWapper ? backgroundWapper : ''} ${style['menu__wrapper']} ${isOpenDropdown ? style.active : ''}`}>
                        <button className={`${style['menu__item']} ${isOpenDropdown ? style.active : ''}`}
                            type='button'
                            onMouseEnter={() => setIsOpenDropdown(true)}
                            onMouseLeave={() => setIsOpenDropdown(false)}>Акции и новости
                            <ArrowIcon className={style['menu__icon']} />
                        </button>
                        <div className={style['menu-dropdown']}
                            onMouseEnter={() => setIsOpenDropdown(true)}
                            onMouseLeave={() => setIsOpenDropdown(false)}>
                            <Link href='/akcii'
                                className={style['menu-dropdown__link']}
                                onClick={() => dispatch(setIsStateMenuMobail(!isShow))}>
                                Акции
                            </Link>
                            <Link href='/novosti'
                                className={style['menu-dropdown__link']}
                                onClick={() => dispatch(setIsStateMenuMobail(!isShow))}>
                                Новости
                            </Link>
                            <Link href='/pages/programma-loyalnosti'
                                className={style['menu-dropdown__link']}
                                onClick={() => dispatch(setIsStateMenuMobail(!isShow))}>
                                Программа лояльности
                            </Link>
                        </div>
                    </div>
                    <Link className={style['menu__item']} href='/pages/agents'
                        onClick={() => dispatch(setIsStateMenuMobail(!isShow))}>Сотрудничество</Link>
                    <Link className={style['menu__item']} href='/pages/oplata'
                        onClick={() => dispatch(setIsStateMenuMobail(!isShow))}>Оплата</Link>
                    <Link className={style['menu__item']} href='/pages/agreement'
                        onClick={() => dispatch(setIsStateMenuMobail(!isShow))} >Правила</Link>
                </nav>

                <div className={`${style['dropdown-menu']} ${style['dropdown-menu--mobail']}`}>
                    <button type='button'
                        className={`${style['dropdown-item']} ${language === 'RUS' ? 'active' : ''}`}
                        onClick={() => dispatch(setLanguageValue('RUS'))}>
                        RUS
                    </button>
                    <button type='button'
                        className={`${style['dropdown-item']}  ${language === 'EN' ? 'active' : ''}`}
                        onClick={() => dispatch(setLanguageValue('EN'))}>
                        EN
                    </button>
                    <button type='button'
                        className={`${style['dropdown-item']} ${language === 'PL' ? 'active' : ''}`}
                        onClick={() => dispatch(setLanguageValue('PL'))}>
                        PL
                    </button>
                </div>
            </div>

        </div>
    );
};

export default Menu;