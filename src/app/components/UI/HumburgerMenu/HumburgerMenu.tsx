'use client'

import { FC } from 'react';
import style from './HumburgerMenu.module.scss';

import { setIsStateMenuMobail } from '@/redux/slice/menuMobileStateSlice';
import { useAppDispatch, useAppSelector } from '@/app/hooks/redux';

const HumburgerMenu: FC = () => {
    const { isShow } = useAppSelector((state: { stateMobileMenuReduser: any; }) => state.stateMobileMenuReduser);
    const dispatch = useAppDispatch();
    return (
      <div className={`${style['menu-humburger']} ${isShow === true ? style.open : ""}`} onClick={() => dispatch(setIsStateMenuMobail(!isShow))}>
        <div className={style['menu-humburger-line']}></div>
        <div className={style['menu-humburger-line']}></div>
        <div className={style['menu-humburger-line']}></div>
      </div>
    );
};

export default HumburgerMenu;