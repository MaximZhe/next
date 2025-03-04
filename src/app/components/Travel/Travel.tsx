import React, { FC, useEffect, useRef, useState } from 'react';

import style from './Travel.module.scss'
import { getTicketsUser } from '@/app/api/actionGetUserTikets';
import Loading from '@/app/loading';
import { fetchDetailTicket } from '@/app/api/actionGetDetailTicket';
import TravelTicet from './TravelTicket/TravelTicet';
import { useUserAccountContext } from '@/contex/userAccount';
import { fetchGetTicket } from '@/app/api/actionFetchDownloadTicket';
import { decoderTicketsBlob } from '@/app/utils/decoderBloobTicket';
import saveAs from 'file-saver';
import Download from './loading';

interface ITravel {
    dataUser: any
}
interface DownloadTickets {
    [ticketNumber: string]: boolean;
}
export interface IDetailTicket {
    Result: {
        ClientName: string,
        PhoneNumber: string,
        Email: string,
        TicketNumber: string,
        RouteNumber: null | string | number,
        CityDepart: string,
        CityArrive: string,
        RouteName: string,
        RouteReturnName: null,
        DateDepart: string,
        DateReturn: null,
        Condition: string,
        CurrencyName: string,
        DateOperation: string,
        PriceTicket: number,
        TotalReturn: null | string,
        CarrierName: string,
        Link: null | string,
        Id: number,
        RouteDepart: {
            DepartTime: string,
            ArriveTime: string,
            ArriveDate: string,
            DepartDate: string,
            DepartPoint: {
                Latitude: null,
                Longitude: null,
                Name: string
            },
            ArrivePoint: {
                Latitude: null,
                Longitude: null,
                Name: string
            }
        },
        RouteReturn: null,
        TarifName: string,
        TarifId: number,
        CurrencyId: number,
        Type: number,
        HasBonus: boolean,
        IsArrive: boolean,
        PlaceDepart: number,
        PlaceReturn: null,
        HasBlocked: boolean,
        HasAbilityChangeDate: boolean,
        ClientDateOfBirthDay: string
        ClientCitizenship: string,
        ClientPasport: string,
        Description: null,
        Route: string,
        PhoneNumberTwo: null | string,
        CurrentCarrierName: string,
        RealCarrierName: null | string
    },
    Error: null | string

}
const Travel: FC<ITravel> = ({ dataUser }) => {
    const { toggleValueTicketDetail } = useUserAccountContext();
    const [userId, setUserId] = useState('')
    const [currentTicket, setCurrentTicket] = useState({
        active: '',
        completed: '',
        canceled: ''
    })
    const [arrayTickets, setArrayTickets] = useState<any>({
        active: [],
        completed: [],
        canceled: []
    })
    const [activeButton, setActiveButton] = useState<string>("Актуальные поездки");
    const [currentPage, setCurrentPage] = useState(1);
    const [clickButton, setClickButton] = useState(1)
    const [loadingTickets, setLoadingTickets] = useState(false)
    const [vissibleScrollBtn, setVissibleScrollBtn] = useState(false)
    const [detailTicket, setDetailTicket] = useState<IDetailTicket>({
        Result: {
            ClientName: '',
            PhoneNumber: '',
            Email: '',
            TicketNumber: '',
            RouteNumber: null,
            CityDepart: '',
            CityArrive: '',
            RouteName: '',
            RouteReturnName: null,
            DateDepart: '',
            DateReturn: null,
            Condition: '',
            CurrencyName: '',
            DateOperation: '',
            PriceTicket: 0,
            TotalReturn: null,
            CarrierName: '',
            Link: null,
            Id: 0,
            RouteDepart: {
                DepartTime: '',
                ArriveTime: '',
                ArriveDate: '',
                DepartDate: '',
                DepartPoint: {
                    Latitude: null,
                    Longitude: null,
                    Name: ''
                },
                ArrivePoint: {
                    Latitude: null,
                    Longitude: null,
                    Name: ''
                }
            },
            RouteReturn: null,
            TarifName: '',
            TarifId: 0,
            CurrencyId: 0,
            Type: 0,
            HasBonus: false,
            IsArrive: false,
            PlaceDepart: 0,
            PlaceReturn: null,
            HasBlocked: false,
            HasAbilityChangeDate: false,
            ClientDateOfBirthDay: '',
            ClientCitizenship: '',
            ClientPasport: '',
            Description: null,
            Route: '',
            PhoneNumberTwo: null,
            CurrentCarrierName: '',
            RealCarrierName: null
        },
        Error: null
    })
    const [downloadTickets, setDownloadTickets] = useState<DownloadTickets>({})

    useEffect(() => {
        setUserId(dataUser?.Result?.UserId)
    }, [dataUser?.Result?.UserId])


    const getTikets = async (status: number, page: number) => {
        const data = {
            UserId: userId,
            Status: status,
            Page: page
        }
        setLoadingTickets(true)
        setVissibleScrollBtn(false)
        try {
            const dat = await getTicketsUser(data)
            
            if (dat?.Result?.Status === 1) {
                setCurrentTicket((prev) => ({ ...prev, active: dat?.Result?.Count.toString() }))
                setArrayTickets((prev: any) => ({ ...prev, active: dat?.Result?.Collections }))
                setCurrentPage(dat?.Result?.Count)
                if(dat?.Result?.Count > 0){
                    setVissibleScrollBtn(true)
                }
            }
            if (dat?.Result?.Status === 2) {
                setCurrentTicket((prev) => ({ ...prev, completed: dat?.Result?.Count.toString() }))
                setArrayTickets((prev: any) => ({ ...prev, completed: dat?.Result?.Collections }))
                setCurrentPage(dat?.Result?.Count)
                if(dat?.Result?.Count > 0){
                    setVissibleScrollBtn(true)
                }
            }
            if (dat?.Result?.Status === 3) {
                setCurrentTicket((prev) => ({ ...prev, canceled: dat?.Result?.Count.toString() }))
                setArrayTickets((prev: any) => ({ ...prev, canceled: dat?.Result?.Collections }))
                setCurrentPage(dat?.Result?.Count)
                if(dat?.Result?.Count > 0){
                    setVissibleScrollBtn(true)
                }
            }
        }
        catch (error) {
            console.log(`Ошибка получения билетов пользователя ${error}`)
        }
        finally {
            setLoadingTickets(false)
        }
    }
    const handleButtonClick = (buttonName: string, status: number, page: number) => {
        setActiveButton(buttonName);
        getTikets(status, page)
    }
    useEffect(() => {
        getTikets(1, 0)
    }, [])

    const getDetail = async (id: string) => {
        try {
            const res = await fetchDetailTicket(id)
            setDetailTicket(res)
            if (res.Result.TicketNumber !== '') {
                toggleValueTicketDetail(true)
            }
        }
        catch (error) {
            console.log(`Ошибка получения деталей билета ${error}`)
        }
    }
    const pagesTickets = (page: number) => {
        if (activeButton === 'Актуальные поездки') {
            getTikets(1, page - 1)

        }
        if (activeButton === 'Завершенные поездки') {
            getTikets(2, page - 1)
        }
        if (activeButton === 'Отмененные поездки') {
            getTikets(3, page - 1 )
        }
        setClickButton(page)
    }
    const pages = currentPage < 10 ? 1 : currentPage / 10

    const arrayPages = Array.from({ length: pages }, (_, index) => index + 1);

    const loadingTicket = async (ticketNumber: string) => {
        setDownloadTickets((prev) => ({ ...prev, [ticketNumber]: true }));
        const datas = {
            orderId: '',
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

            }

        }
        catch (error) {
            console.error('Ошибка скачивания билета:', error);

        }
        finally {
            setDownloadTickets((prev) => ({ ...prev, [ticketNumber]: false }));
        }
    }
    const tableContainerRef = useRef<HTMLDivElement>(null); 

    const scrollRight = () => {
        if (tableContainerRef.current) {
            tableContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };
    return (
        <div className={style["content-section"]}>
            <div className={`${style["filter-button-group"]} `}>
                <button className={`${style["filter-button"]} ${activeButton === 'Актуальные поездки' ? style["filter-button--active"] : ''}`} data-filter="active"
                    onClick={() => handleButtonClick('Актуальные поездки', 1, 0)}>
                    Актуальные поездки <span>
                        {currentTicket.active}
                    </span>
                </button>
                <button className={`${style["filter-button"]} ${activeButton === 'Завершенные поездки' ? style["filter-button--active"] : ''}`} data-filter="completed"
                    onClick={() => handleButtonClick('Завершенные поездки', 2, 0)}>
                    Завершенные поездки
                    <span> {currentTicket.completed}</span>
                </button>
                <button className={`${style["filter-button"]} ${activeButton === 'Отмененные поездки' ? style["filter-button--active"] : ''}`} data-filter="canceled"
                    onClick={() => handleButtonClick('Отмененные поездки', 3, 0)}>
                    Отмененные поездки
                    <span> {currentTicket.canceled}</span>
                </button>
            </div>
            {vissibleScrollBtn ?
            <div className={style["scroll-arrow"]} onClick={scrollRight}>
            ➔
            </div> : null}
            {activeButton === 'Актуальные поездки' ?
                <div className={style["trip-table"]} ref={tableContainerRef}>
                    {loadingTickets ? <Loading /> :
                        <>
                            {arrayTickets.active.length > 0 ? (
                                <>
                                    {arrayTickets.active.map((item: any, index: number) => (
                                        <div className={style["table-row"]}>
                                            <div className={style["table-cell"]}>{index + 1}</div>
                                            <div className={style["table-cell"]}>{item?.TicketNumber}</div>
                                            <div className={style["table-cell"]}>{`${item?.CityDeparture}-${item?.CityArrival}`}</div>
                                            <div className={style["table-cell"]}>{item?.DeteDeparture}</div>
                                            <div className={style["table-cell"]}>{`${item?.Price} ${item?.Currency}`}</div>
                                            <div className={style["table-cell"]}>
                                                <button type="button" className={style["detail-button"]} onClick={() => getDetail(item?.TicketNumber)}>Подробнее</button>
                                            </div>
                                            <div className={style["table-cell"]}>
                                                <button type="button" className={style["get-button-file"]} title="Скачать"
                                                    onClick={() => loadingTicket(item?.TicketNumber)}>
                                                    {downloadTickets[item?.TicketNumber] ? <Download /> :
                                                        <svg width="14.444336" height="16.000000" viewBox="0 0 14.4443 16" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <desc>
                                                                Created with Pixso.
                                                            </desc>
                                                            <defs />
                                                            <path id="Rectangle 1"
                                                                d="M8.26 1C8.62 1 8.8 1 8.97 1.05C9.13 1.11 9.26 1.23 9.52 1.45L12.92 4.43C13.18 4.65 13.3 4.77 13.37 4.91C13.44 5.05 13.44 5.21 13.44 5.53L13.44 11.88C13.44 13.35 13.44 14.08 12.92 14.54C12.4 15 11.56 15 9.88 15L4.55 15C2.87 15 2.04 15 1.52 14.54C1 14.08 1 13.35 1 11.88L1 4.11C1 2.64 1 1.91 1.52 1.45C2.04 1 2.87 1 4.55 1L8.26 1Z"
                                                                stroke="#00468E" strokeOpacity="1.000000" strokeWidth="2.000000" />
                                                            <path id="Rectangle 2"
                                                                d="M8.11 1L8.11 4.11C8.11 4.84 8.11 5.21 8.37 5.43C8.63 5.66 9.05 5.66 9.88 5.66L13.44 5.66"
                                                                stroke="#00468E" strokeOpacity="1.000000" strokeWidth="2.000000" />
                                                        </svg>
                                                    }

                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </>
                            ) : (<p className={style['trip-table__massege']}>Билеты отсутствуют</p>)

                            }
                        </>}

                </div> : null
            }
            {activeButton === 'Завершенные поездки' ?
                <div className={style["trip-table"]} ref={tableContainerRef}>
                    {loadingTickets ? <Loading /> :
                        <>
                            {arrayTickets.completed.length > 0 ? (
                                <>
                                    {arrayTickets.completed.map((item: any, index: number) => (
                                        <div className={style["table-row"]}>
                                            <div className={style["table-cell"]}>{index + 1}</div>
                                            <div className={style["table-cell"]}>{item?.TicketNumber}</div>
                                            <div className={style["table-cell"]}>{`${item?.CityDeparture}-${item?.CityArrival}`}</div>
                                            <div className={style["table-cell"]}>{item?.DeteDeparture}</div>
                                            <div className={style["table-cell"]}>{`${item?.Price} ${item?.Currency}`}</div>
                                            <div className={style["table-cell"]}>
                                                <button type="button" className={style["detail-button"]} onClick={() => getDetail(item?.TicketNumber)}>Подробнее</button>
                                            </div>
                                            <div className={style["table-cell"]}>
                                                <button type="button" className={style["get-button-file"]} title="Скачать"
                                                    onClick={() => loadingTicket(item?.TicketNumber)}>
                                                    {downloadTickets[item?.TicketNumber] ? <Download /> :
                                                        <svg width="14.444336" height="16.000000" viewBox="0 0 14.4443 16" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <desc>
                                                                Created with Pixso.
                                                            </desc>
                                                            <defs />
                                                            <path id="Rectangle 1"
                                                                d="M8.26 1C8.62 1 8.8 1 8.97 1.05C9.13 1.11 9.26 1.23 9.52 1.45L12.92 4.43C13.18 4.65 13.3 4.77 13.37 4.91C13.44 5.05 13.44 5.21 13.44 5.53L13.44 11.88C13.44 13.35 13.44 14.08 12.92 14.54C12.4 15 11.56 15 9.88 15L4.55 15C2.87 15 2.04 15 1.52 14.54C1 14.08 1 13.35 1 11.88L1 4.11C1 2.64 1 1.91 1.52 1.45C2.04 1 2.87 1 4.55 1L8.26 1Z"
                                                                stroke="#00468E" strokeOpacity="1.000000" strokeWidth="2.000000" />
                                                            <path id="Rectangle 2"
                                                                d="M8.11 1L8.11 4.11C8.11 4.84 8.11 5.21 8.37 5.43C8.63 5.66 9.05 5.66 9.88 5.66L13.44 5.66"
                                                                stroke="#00468E" strokeOpacity="1.000000" strokeWidth="2.000000" />
                                                        </svg>
                                                    }

                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </>
                            ) : (<p className={style['trip-table__massege']}>Билеты отсутствуют</p>)

                            }
                        </>}

                </div> : null
            }
            {activeButton === 'Отмененные поездки' ?
                <div className={style["trip-table"]} ref={tableContainerRef}>
                    {loadingTickets ? <Loading /> :
                        <>
                            {arrayTickets.canceled.length > 0 ? (
                                <>
                                    {arrayTickets.canceled.map((item: any, index: number) => (
                                        <div className={style["table-row"]}>
                                            <div className={style["table-cell"]}>{index + 1}</div>
                                            <div className={style["table-cell"]}>{item?.TicketNumber}</div>
                                            <div className={style["table-cell"]}>{`${item?.CityDeparture}-${item?.CityArrival}`}</div>
                                            <div className={style["table-cell"]}>{item?.DeteDeparture}</div>
                                            <div className={style["table-cell"]}>{`${item?.Price} ${item?.Currency}`}</div>
                                            <div className={style["table-cell"]}>
                                                <button type="button" className={style["detail-button"]} onClick={() => getDetail(item?.TicketNumber)}>Подробнее</button>
                                            </div>
                                            <div className={style["table-cell"]}>
                                                <button type="button" className={style["get-button-file"]} title="Скачать"
                                                    onClick={() => loadingTicket(item?.TicketNumber)}>
                                                    {downloadTickets[item?.TicketNumber] ? <Download /> :
                                                        <svg width="14.444336" height="16.000000" viewBox="0 0 14.4443 16" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <desc>
                                                                Created with Pixso.
                                                            </desc>
                                                            <defs />
                                                            <path id="Rectangle 1"
                                                                d="M8.26 1C8.62 1 8.8 1 8.97 1.05C9.13 1.11 9.26 1.23 9.52 1.45L12.92 4.43C13.18 4.65 13.3 4.77 13.37 4.91C13.44 5.05 13.44 5.21 13.44 5.53L13.44 11.88C13.44 13.35 13.44 14.08 12.92 14.54C12.4 15 11.56 15 9.88 15L4.55 15C2.87 15 2.04 15 1.52 14.54C1 14.08 1 13.35 1 11.88L1 4.11C1 2.64 1 1.91 1.52 1.45C2.04 1 2.87 1 4.55 1L8.26 1Z"
                                                                stroke="#00468E" strokeOpacity="1.000000" strokeWidth="2.000000" />
                                                            <path id="Rectangle 2"
                                                                d="M8.11 1L8.11 4.11C8.11 4.84 8.11 5.21 8.37 5.43C8.63 5.66 9.05 5.66 9.88 5.66L13.44 5.66"
                                                                stroke="#00468E" strokeOpacity="1.000000" strokeWidth="2.000000" />
                                                        </svg>
                                                    }

                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </>
                            ) : (<p className={style['trip-table__massege']}>Билеты отсутствуют</p>)

                            }
                        </>
                    }

                </div> : null
            }
            <div className={style.pagination}>
                <span className={style["pagination-numbers"]}>
                    {arrayPages.map(item => (
                        <button className={`${style["pagination-number"]} ${clickButton === item || arrayPages.length === 1 ? style["pagination-number--active"] : ''}`}
                            onClick={() => pagesTickets(item)}>{item}</button>
                    ))}
                </span>
            </div>
            {detailTicket.Result.TicketNumber !== '' ?
                <TravelTicet dataTicket={detailTicket} />
                :
                null}
        </div>

    );
};

export default Travel;