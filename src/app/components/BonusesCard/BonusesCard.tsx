'use client'
import React, { FC, useEffect, useState } from 'react';
import style from './BonusesCard.module.scss'
import { getInfoUser } from '@/app/api/actionGetProfileUser';
import { getTockenCookie } from '@/app/api/actionGetTockenCookie';
import LoadingBonuses from './loading';


const BonusesCard: FC = () => {
    const [dataUser, setDataUser] = useState<any>(null); // Состояние для хранения данных пользователя
    const [loading, setLoading] = useState(true); // Состояние для загрузки
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await getTockenCookie();
                if (token) {
                    const res = await getInfoUser(token.value);
                    setDataUser(res);
                }
            } catch (error) {
                console.log('Ошибка при получении данных:', error);
            } finally {
                setLoading(false); 
            }
        };

        fetchData();
    }, []);

    const ticketSale = dataUser?.Result?.BonusMaxValue - dataUser?.Result?.BonusTicketsCount 
    const requiredTrips = dataUser?.Result?.BonusMaxValue + 1;
    const ticket = dataUser?.Result?.BonusTicketsCount
 
    const createTicketsArray = () => {
        const ticketsArray = [];
        for (let i = 0; i < requiredTrips; i++) {
            ticketsArray.push(i);
        }
        return ticketsArray
    }
    const arrayBonusesTickets = createTicketsArray()
    const nameUser =  dataUser?.Result?.FirstName !== null ? dataUser?.Result?.FirstName : '';
    const lastNameUser =  dataUser?.Result?.LastName !== null ? dataUser?.Result?.LastName : '';
    const middleNameUser =  dataUser?.Result?.MiddleName !== null ? dataUser?.Result?.MiddleName : '';
    const userName = `${lastNameUser} ${nameUser} ${middleNameUser}`
    return (
        <div className={style["content-section"]}>
            <div className={style["user-bonuses"]}>
                <div className={style["user-bonuses__card"]}>
                    <h2 className={style["user-bonuses__card-title"]}>
                        Программа лояльности Intercars
                    </h2>
                    <p className={style["user-bonuses__card-text"]}>
                        {loading ? <LoadingBonuses color={'#FFFFFF'}/> : 
                        <>
                        {userName ? userName : 'Данные не заполненны'}
                        </>}
                    </p>
                    <div className={style["user-bonuses__card-info"]}>
                        <div className={style["user-bonuses__card-info-img"]}>
                            {dataUser?.Result?.BonusPercent === 10 ?
                                <svg width="127.000000" height="53.000000" viewBox="0 0 127 53" fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <desc>
                                        Created with Pixso.
                                    </desc>
                                    <defs />
                                    <path id="10%"
                                        d="M80.23 10.65L80.23 13.38C80.23 15.29 80.65 17.05 81.49 18.65C82.34 20.26 83.58 21.54 85.22 22.51C86.89 23.48 88.94 23.96 91.38 23.96C93.8 23.96 95.83 23.48 97.47 22.51C99.11 21.54 100.35 20.26 101.17 18.65C102.01 17.05 102.43 15.29 102.43 13.38L102.43 10.65C102.43 8.69 102.01 6.91 101.17 5.31Q100.8 4.6 100.33 3.97Q99.2 2.47 97.44 1.45C95.79 0.48 93.74 0 91.28 0Q87.69 0 85.22 1.45C83.58 2.41 82.34 3.7 81.49 5.31C80.65 6.91 80.23 8.69 80.23 10.65ZM73.47 21.98L73.47 30.9C73.47 34.77 73.06 38.11 72.24 40.92Q71.01 45.1 68.69 47.79C67.16 49.56 65.34 50.87 63.23 51.72C61.12 52.57 58.77 53 56.19 53C54.13 53 52.21 52.74 50.42 52.22C48.64 51.67 47.03 50.84 45.6 49.7Q43.49 48 41.94 45.42C40.93 43.67 40.16 41.59 39.62 39.19C39.08 36.78 38.81 34.02 38.81 30.9L38.81 21.98C38.81 18.11 39.22 14.79 40.04 12.03C40.89 9.25 42.07 6.97 43.6 5.2Q45.13 3.44 47.04 2.31L47.04 2.31Q48.01 1.72 49.08 1.31Q52.25 0.03 56.12 0.03Q59.22 0.03 61.86 0.84C63.64 1.36 65.25 2.18 66.68 3.29C68.11 4.4 69.33 5.82 70.34 7.57Q71.85 10.16 72.66 13.77C73.2 16.15 73.47 18.89 73.47 21.98ZM22.31 0.63L22.31 52.29L12.17 52.29L12.17 12.39L0 16.28L0 8.24L21.21 0.63L22.31 0.63ZM93.35 48.39L118.37 8.1L113.45 5.48L88.43 45.77L93.35 48.39ZM86.95 13.38L86.95 10.65C86.95 9.78 87.1 8.98 87.41 8.24C87.73 7.49 88.23 6.89 88.88 6.44C89.54 5.97 90.34 5.73 91.28 5.73C92.29 5.73 93.11 5.97 93.74 6.44C94.4 6.89 94.88 7.49 95.18 8.24C95.51 8.98 95.68 9.78 95.68 10.65L95.68 13.38C95.68 14.2 95.52 14.99 95.22 15.75C94.91 16.48 94.44 17.08 93.81 17.56C93.18 18 92.36 18.23 91.35 18.23C90.39 18.23 89.56 18 88.88 17.56C88.23 17.08 87.73 16.48 87.41 15.75C87.1 14.99 86.95 14.2 86.95 13.38ZM63.3 32.25L63.3 20.6C63.3 18.74 63.2 17.11 62.98 15.71C62.8 14.32 62.5 13.14 62.11 12.17C61.71 11.18 61.21 10.38 60.63 9.77C60.04 9.15 59.37 8.7 58.62 8.42C57.87 8.14 57.04 8 56.12 8Q54.4 8 53.06 8.67C52.19 9.12 51.45 9.84 50.84 10.83C50.23 11.8 49.77 13.09 49.44 14.72C49.13 16.33 48.98 18.29 48.98 20.6L48.98 32.25C48.98 34.11 49.07 35.75 49.26 37.17C49.47 38.59 49.78 39.8 50.18 40.82C50.6 41.81 51.09 42.62 51.65 43.26C52.24 43.87 52.91 44.32 53.66 44.6C54.43 44.89 55.28 45.03 56.19 45.03C57.32 45.03 58.32 44.8 59.18 44.36C60.08 43.88 60.83 43.15 61.44 42.16C62.07 41.15 62.54 39.82 62.84 38.2C63.15 36.57 63.3 34.58 63.3 32.25ZM104.72 39.65L104.72 42.37Q104.72 44.63 105.49 46.59Q105.71 47.15 105.99 47.68C106.86 49.29 108.12 50.58 109.79 51.54C111.45 52.51 113.51 53 115.95 53C118.36 53 120.39 52.51 122.03 51.54C123.68 50.58 124.91 49.29 125.73 47.68Q126.01 47.15 126.23 46.59Q127 44.63 127 42.37L127 39.65C127 37.71 126.57 35.94 125.73 34.34C124.88 32.73 123.64 31.45 122 30.48C120.36 29.51 118.32 29.03 115.88 29.03C113.46 29.03 111.42 29.51 109.75 30.48C108.11 31.45 106.86 32.73 105.99 34.34C105.14 35.94 104.72 37.71 104.72 39.65ZM111.48 42.37L111.48 39.65C111.48 38.8 111.64 38.01 111.97 37.28C112.3 36.52 112.78 35.92 113.41 35.47C114.07 35 114.89 34.76 115.88 34.76C116.86 34.76 117.67 35 118.3 35.47C118.96 35.92 119.45 36.52 119.78 37.28C120.11 38.01 120.27 38.8 120.27 39.65L120.27 42.37C120.27 43.22 120.15 44.03 119.89 44.78C119.65 45.54 119.22 46.14 118.59 46.59C117.95 47.04 117.07 47.26 115.95 47.26C115.05 47.26 114.27 47.04 113.59 46.59C112.93 46.14 112.42 45.54 112.04 44.78C111.66 44.03 111.48 43.22 111.48 42.37Z"
                                        fill="#FFFFFF" fillOpacity="0.300000" fillRule="evenodd" />
                                </svg>
                                : null
                            }
                        </div>
                        <p className={`${style["user-bonuses__card-info-text"]}`}>
                            {dataUser?.Result?.NumberBonusCard ?
                                dataUser?.Result?.NumberBonusCard :
                                '0000 0000 0000 0000'
                            }
                        </p>
                    </div>
                </div>
                <div className={style["user-bonuses__sale"]}>
                    <p className={style["user-bonuses__sale-text"]}>
                        Ваша скидка
                    </p>
                    <p className={style["user-bonuses__sale-percent"]}>
                        {dataUser?.Result?.BonusPercent ?
                            `${dataUser?.Result?.BonusPercent}%` :
                            '0%'
                        }
                    </p>
                </div>
                <div className={style["user-bonuses__sale"]}>
                    <p className={style["user-bonuses__sale-text"]}>
                        Поездок до бесплатного билета
                    </p>
                    <p className={style["user-bonuses__sale-percent"]}>
                        {dataUser?.Result?.BonusTicketsCount ?
                            ticketSale :
                            dataUser?.Result?.BonusMaxValue
                        }
                    </p>
                </div>
                <div className={style["user-bonuses-tickets"]}>
                    <>
                        {arrayBonusesTickets.length > 0 ? (
                            arrayBonusesTickets.map((item, index) => (
                                <>
                                    {index < ticket ? (
                                        <div
                                            key={index}
                                            className={`${style["user-bonuses-tickets__item"]} ${style["user-bonuses-tickets__item--active"]}`}
                                        >
                                        </div>
                                    ) : (
                                        <div
                                            key={index}
                                            className={`${style["user-bonuses-tickets__item"]} ${index === arrayBonusesTickets.length - 1 ? style["user-bonuses-tickets__item--finaled"] : ""}
                                            ${ticket === requiredTrips -1 ? style["user-bonuses-tickets__item--sale"] : ''}`}
                                        >
                                            {index === arrayBonusesTickets.length - 1 ? '100%' : ''}
                                        </div>
                                    )}
                                </>
                            ))
                        ) : null}
                    </>
                </div>
            </div>
            <div className={style["user-active-bonuses"]}>
                <p className={style["user-active-bonuses__title"]}>
                Чтобы принять участие в Программе Лояльности для постоянных клиентов Intercars купите 1 билет с пометкой "Рейс бонусной программы" по полной стоимости.
                </p>
                <a href="/" className={style["user-active-bonuses__btn"]}>
                    К поиску билетов
                </a>
            </div>
        </div>
    );
};

export default BonusesCard;