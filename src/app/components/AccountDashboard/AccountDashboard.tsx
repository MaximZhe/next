'use client'

import React, { FC, useEffect, useState } from 'react';

import style from './AccountDashboard.module.scss';
import { useUserAccountContext } from '../../../contex/userAccount';
import Travel from '../Travel/Travel';
import UserProfile from '../UserProfile/UserProfile';
import BonusesCard from '../BonusesCard/BonusesCard';

interface IDataDashboard {
 data:any
}

const AccountDashboard:FC<IDataDashboard> = ({data}) => {
   
    const { accountData } = useUserAccountContext();
    const [objectUser, setObjectUser] = useState<any>(null);
    
    useEffect(() => {
        try {
            const jsonObject = data;
            setObjectUser(jsonObject);
        } catch (error) {
            console.error("Ошибка при парсинге JSON:", error);
        }
    }, [data]);
    
 
    return (
        <>
            <div className={style["dashboard__content-header"]}>
                <h1 className={style["dashboard__content-title"]}>{accountData.sectionName}</h1>
            </div>
            <div className={style["dashboard__content-body"]}>
                {
                    (() => {
                        switch (accountData.sectionName) {
                            case "Мои поездки":
                                return <Travel key="travel" dataUser={objectUser}/>;
                            case "Мой аккаунт":
                                return <UserProfile key="userProfile"/>;
                            case "Мои бонусы":
                                return <BonusesCard key="userBonuses"/>;
                            default:
                                return null;
                        }
                    })()
                }

            </div>
        </>
    );
};

export default AccountDashboard;