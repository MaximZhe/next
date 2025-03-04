import { cookies } from 'next/headers';
import { redirect } from 'next/navigation'
import React from 'react';
import style from './Account.module.scss';
import AccountSidebar from '../components/AccountSidebar/AccountSidebar';
import AccountDashboard from '../components/AccountDashboard/AccountDashboard';
import Menu from '../components/Header/Menu/Menu';

import { getInfoProfile } from '../api/getProfile';



const pageAccount = async () => {
   
    const dataProfile =  await getInfoProfile()

    const cookie = cookies();
    const tockenCookie = cookie.get('token')
    if(!tockenCookie){
        redirect('/')
    }else{

        console.log('succses token')
    }
    return (
        <>
            {tockenCookie ?
                <section className={style.dashboard}>
                    <Menu className='menu__theme--blue' />
                    <div className="container">
                    
                        <div className={style["dashboard__wrapper"]}>
                            <AccountSidebar data={dataProfile}/>
                            <div className={style["dashboard__content"]}>
                                <AccountDashboard  data={dataProfile}/>
                            </div>
                        </div>
                    </div>
                </section> : null}
        </>


    );
};

export default pageAccount;