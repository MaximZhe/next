'use client';

import React ,{ FC, useEffect, useState }from 'react';

import style from './AccountSidebar.module.scss';
import {useUserAccountContext } from '@/contex/userAccount';
import { useRouter } from 'next/navigation';

interface IDataSidebar {
    data:any
   }
const AccountSidebar: FC<IDataSidebar>= ({data}) => {
   

    const {toggleSectionContent} = useUserAccountContext();
    const {toogleStateButton } = useUserAccountContext()
    const [activeSection, setActiveSection] = useState<string>("Мои поездки");
    const router = useRouter();
    const handleLogouts = async () => {
        try{
            const res = await fetch('/api/auth/logout', { method: 'GET' });
            if(res.ok){
                toogleStateButton(false)
                router.push('/')
            }
        }   
        catch(error) {
            console.log(error)
        }
    
    };
    useEffect(() => {
        sessionStorage.setItem('userId', data?.Result?.UserId);
    },[data])

    const handleLogout = () => {
        handleLogouts();
        
    };

    const handleButtonClick = (section: string) => {
        setActiveSection(section); 
        toggleSectionContent(section); 
    };

    
    const nameUser =  data?.Result?.FirstName !== null ? data?.Result?.FirstName : '';
    const lastNameUser =  data?.Result?.LastName !== null ? data?.Result?.LastName : '';
    const middleNameUser =  data?.Result?.MiddleName !== null ? data?.Result?.MiddleName : '';
    const userName = `${lastNameUser} ${nameUser} ${middleNameUser}`
   
    return (
        <aside className={style["dashboard__sidebar"]}>
            <div className={style["dashboard__sidebar-header"]}>
                {/* <Image src="" alt="Лебедева Жанна Эдуардовна" className={style["dashboard__sidebar-avatar"]} /> */}
                <div className={style["dashboard__sidebar-user"]}>
                    <h1 className={style["dashboard__sidebar-title"]}>{userName}</h1>
                    <p className={style["dashboard__sidebar-subtitle"]}>{data?.Result?.Phone}</p>
                    <button type="button" className={style["dashboard__sidebar-btn"]}
                    onClick={handleLogout}>Выйти</button>
                </div>
            </div>
            <div className={style["dashboard__sidebar-body"]}>
                <ul className={style["dashboard__sidebar-list"]}>
                    <li className={`${style["dashboard__sidebar-item"]} ${activeSection === "Мои поездки" ? style["dashboard__sidebar-item--active"] : ''}`}>
                        <button type="button" className={style["dashboard__sidebar-link"]} onClick= {() => handleButtonClick("Мои поездки")}>Мои
                            поездки</button>
                    </li>
                    <li className={`${style["dashboard__sidebar-item"]} ${activeSection === "Мой аккаунт" ? style["dashboard__sidebar-item--active"] : ''}`}>
                        <button type="button" className={style["dashboard__sidebar-link"]} onClick= {() => handleButtonClick("Мой аккаунт")}>Мой
                            аккаунт</button>
                    </li>

                    <li className={`${style["dashboard__sidebar-item"]} ${activeSection === "Мои бонусы" ? style["dashboard__sidebar-item--active"] : ''} `} >
                        <button type="button" className={style["dashboard__sidebar-link"]} onClick= {() => handleButtonClick("Мои бонусы")}>Мои
                            бонусы</button>
                    </li>
                    <li className={`${style["dashboard__sidebar-item"]} ${activeSection === "Правила" ? style["dashboard__sidebar-item--active"] : ''} `}>
                        <button type="button" className={style["dashboard__sidebar-link"]} onClick={() => router.push('/pages/agreement')}>Правила
                           
                        </button>
                    </li>
                </ul>
            </div>
        </aside>
    );
};

export default AccountSidebar;