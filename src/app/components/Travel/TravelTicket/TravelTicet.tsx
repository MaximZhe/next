'use client'

import React, { FC, useState } from 'react';

import style from './TravelTicket.module.scss'
import { IDetailTicket } from '../Travel';
import moment from 'moment';
import { fetchGetTicket } from '@/app/api/actionFetchDownloadTicket';
import { decoderTicketsBlob } from '@/app/utils/decoderBloobTicket';
import saveAs from 'file-saver';
import { useUserAccountContext } from '@/contex/userAccount';
interface ITravelTicetProps {
    dataTicket: IDetailTicket
}

const TravelTicet: FC<ITravelTicetProps> = ({ dataTicket }) => {
    const { accountData, toggleValueTicketDetail } = useUserAccountContext();
    const [loadingTickets, setLoadingTickets] = useState(false)
    const loadingTicket = async (ticketNumber: string) => {
        setLoadingTickets(true)
        const datas = {
            orderId:'',
            TicketNumbers: [
                ticketNumber
            ],
            SiteVersionId: 2,
            Lang: "RUS"
        }
        try {
            const res = await fetchGetTicket(datas)
            if (res.Result !== null) {
                const urlTicket = decoderTicketsBlob(res.Result?.InterCarsTickets);
                saveAs(urlTicket, 'ticketIntercars.pdf');
                setLoadingTickets(false)
            }

        }
        catch (error) {
            console.error('Ошибка скачивания билета:', error);
            setLoadingTickets(false)
        }
    }
    console.log(dataTicket)
    return (
        <section className={`${style["ticket-item"]} ${!accountData.valueTicketDetail ? style["ticket-item--hidden"] : ''} scroll-hidden`}>
            <div className="container">
                <div className={style["ticket-item__wrapper"]}>
                    <button type="button" className={style["ticket-item__close"]} onClick={() => toggleValueTicketDetail(false)}>
                        <svg width="24.000000" height="24.000000" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <desc>
                                Created with Pixso.
                            </desc>
                            <defs />
                            <rect id="close" width="23.000000" height="23.000000" transform="translate(0.500000 0.500000)"
                                fill="#FFFFFF" fillOpacity="0" />
                            <path id="Vector"
                                d="M13.41 12L17.71 7.71C17.9 7.52 18 7.27 18 7C18 6.73 17.9 6.48 17.71 6.29C17.52 6.1 17.27 6 17 6C16.73 6 16.48 6.1 16.29 6.29L12 10.59L7.71 6.29C7.52 6.1 7.27 6 7 6C6.73 6 6.48 6.1 6.29 6.29C6.1 6.48 6 6.73 6 7C6 7.27 6.1 7.52 6.29 7.71L10.59 12L6.29 16.29C6.2 16.38 6.12 16.49 6.07 16.61C6.02 16.74 6 16.87 6 17C6 17.13 6.02 17.26 6.07 17.38C6.12 17.51 6.2 17.62 6.29 17.71C6.38 17.8 6.49 17.88 6.62 17.93C6.74 17.98 6.87 18.01 7 18.01C7.13 18.01 7.26 17.98 7.39 17.93C7.51 17.88 7.62 17.8 7.71 17.71L12 13.41L16.29 17.71C16.38 17.8 16.49 17.88 16.62 17.93C16.74 17.98 16.87 18.01 17 18.01C17.13 18.01 17.26 17.98 17.39 17.93C17.51 17.88 17.62 17.8 17.71 17.71C17.8 17.62 17.88 17.51 17.93 17.38C17.98 17.26 18.01 17.13 18.01 17C18.01 16.87 17.98 16.74 17.93 16.61C17.88 16.49 17.8 16.38 17.71 16.29L13.41 12Z"
                                fill="#00468E" fillOpacity="1.000000" fillRule="nonzero" />
                        </svg>
                    </button>
                    <div className={style["ticket-info"]}>
                        <h1 className={style["ticket-info__title"]}>Информация о поездке</h1>
                        <div className={style["ticket-info__wrapper"]}>
                            <span>Номер билета:</span>
                            <span id={style["ticket-number"]}>{dataTicket.Result.TicketNumber}</span>

                            <span>Статус поездки:</span>
                            <span id={style["ticket-status"]}>{dataTicket.Result.Condition}</span>

                            <span>Дата поездки:</span>
                            <span id={style["ticket-date"]}>{dataTicket.Result.DateDepart}</span>

                            <span>Наименование маршрута:</span>
                            <span id={style["ticket-route"]}>{`${dataTicket.Result.CityDepart} - ${dataTicket.Result.CityArrive}`}</span>

                            <span>Время отправления:</span>
                            <span id={style["ticket-time"]}>{dataTicket.Result.RouteDepart.DepartTime.slice(0, 5)}</span>

                            <span>Время прибытия:</span>
                            <span id={style["ticket-time-arrival"]}>{dataTicket.Result.RouteDepart.ArriveTime.slice(0, 5)}</span>

                            <span>Цена:</span>
                            <span id={style["ticket-price"]}>{dataTicket.Result.PriceTicket}</span>

                            <span>Валюта:</span>
                            <span id={style["ticket-currency"]}>{dataTicket.Result.CurrencyName}</span>

                            <span>Наименование тарифа:</span>
                            <span id={style["ticket-fare"]}>{dataTicket.Result.TarifName}</span>

                            <span>Место в автобусе:</span>
                            <span id={style["ticket-seat"]}>{dataTicket.Result.PlaceDepart}</span>

                            <span>Перевозчик:</span>
                            <span id={style["ticket-carrier"]}>{dataTicket.Result.CurrentCarrierName}</span>

                            <span>Пункт отправления:</span>
                            <span className={style["ticket-info__address"]} id={style["ticket-address-departure"]}>
                                {`${dataTicket.Result.CityDepart}, (${dataTicket.Result.RouteDepart.DepartPoint.Name})`}
                            </span>
                            <span>Пункт прибытия:</span>
                            <span className={style["ticket-info__address"]} id={style["ticket-address-arrival"]}>
                                {`${dataTicket.Result.CityArrive}, (${dataTicket.Result.RouteDepart.ArrivePoint.Name})`}
                            </span>

                            <span>ФИО пассажира:</span>
                            <span id={style["passenger-name"]}>
                                {dataTicket.Result.ClientName}
                            </span>

                            <span>Дата рождения:</span>
                            <span id={style["passenger-birthdate"]}>
                                {moment(dataTicket.Result.ClientDateOfBirthDay).format("DD.MM.YYYY")}
                            </span>

                            <span>Номер паспорта:</span>
                            <span id={style["passport-number"]}>
                                {dataTicket.Result.ClientPasport}
                            </span>

                            <span>Контактный номер:</span>
                            <span id={style["contact-number"]}>
                                {dataTicket.Result.PhoneNumber}
                            </span>
                            <span>Дополнительный номер:</span>
                            <span id={style["contact-number"]}>
                                {dataTicket.Result.PhoneNumberTwo}
                            </span>
                            <span>Примечание:</span>
                            <span id={style["ticket-notes"]}>
                                {dataTicket.Result.Description}
                            </span>
                        </div>
                    </div>

                    <div className={style["btn-container"]}>
                        <button type="button" onClick={() => loadingTicket(dataTicket.Result.TicketNumber)}>
                            {loadingTickets ? 'Загрузка билета...' : 'Скачать билет'}
                        </button>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default TravelTicet;