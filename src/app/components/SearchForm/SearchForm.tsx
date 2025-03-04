"use client"

import React, { FC, useEffect, useRef, useState } from 'react';
import moment from 'moment';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from './SearchForm.module.scss';

import { setDataRoute } from '@/redux/slice/getRoutesSlice';
import { setCityDepartureName } from '@/redux/slice/cityDepartureSlice';
import { useAppDispatch } from '@/app/hooks/redux';
import { usePathname, useRouter } from 'next/navigation';
import ArrowForm from '@/app/icons/svg/ArrowForm';
import CalendarIcon from '@/app/icons/svg/CalendarIcon';
import { defaultCityForm, defaultDateForm } from '@/app/constant/constant';
import { persistor } from '../../../redux/store/store';
import { formatedDateFetch } from '@/app/utils/formatedDateFetch';
import { getServerSideProps } from '@/app/api/actionCity';
import { useDebounce } from '@/app/hooks/useDebounce';
import { setCityArrivalName } from '@/redux/slice/cityArrivalSlice';
import { getCalendarPrice } from '@/app/api/actionGetCalendarPrice';
import { splitCityName } from '@/app/utils/splitCityNameSearch';
import { formatedCalendarData } from '@/app/utils/formatedCalendarData';
import { fetchCityDeparture } from '@/app/api/actionFetchDepart';
import { fetchCityArrival } from '@/app/api/actionFetchArraval';
import { fetchRoutes } from '@/app/api/actionFetchRoutes';
import { IDataCity, TicketPrice } from '@/app/types/types';
import DepartureInput from './CityInputDepart/DepartInput';
import ArrivalInput from './CityInputArrival/ArrivalInput';
import { CitySelectionContext, useCitySelectionContext } from '@/contex/formSearch';

const initialStateResultCity = {
    Id: 0,
    Name: '',
    NameHttp: '',
    Coordinates: {
        Latitude: '',
        Longitude: ''
    }
}


interface ISearchForm {
    className: string,
    searchProps?: {
        citySearchDeparture: string[],
        citySearchArrival: string[],
        dateSearch: string | null
    },
    citySeoRoute?: any,
    arrayValueCity?: any,
    mainCityPage?: {
        citySearchDeparture: string,
        citySearchArrival: string,
        dateSearch: string | null
    }

}

const SearchForm: FC<ISearchForm> = ({ className, searchProps, citySeoRoute, arrayValueCity, mainCityPage }) => {


    const router = useRouter();

    const handleSuccess = (cityNameDeparture: string, cityNameArrival: string, valueDate: string) => {
        const actualCityDeparture = splitCityName(cityNameDeparture);
        const actualCityArrival = splitCityName(cityNameArrival);
        router.push(`/find/route/${actualCityDeparture[0]}-${actualCityArrival[0]}?date=${valueDate}`, undefined);
    };

    const dispatch = useAppDispatch();
    const [cityArray, setCityArray] = useState([]);
    //Состояние кнопки поиска
    const [isLoadingForm, setIsLoadingForm] = useState(false);


    //Цены календаря
    const [ticketPrices, setTicketPrices] = useState<TicketPrice[]>([]);




    useEffect(() => {
        if (window) {
            localStorage.removeItem('timer');
        }
    })

    const tileContent = ({ date, view }: { date: Date; view: string }) => {
        if (view === 'month') {
            const formattedDate = formatedDateFetch(date);
            const ticketData = ticketPrices.find((item) => item.DateDeparture === formattedDate);
            if (ticketData && ticketData.Price) {
                return <span key={ticketData.DateDeparture} className={ticketData.IsActive === true ? 'price-ticket' : 'price-old'}>{`${ticketData.Price} ₽`} </span>;
            } else if (ticketData && !ticketData.Price) {
                return <span> </span>;
            }
        }
        return null;
    };
    const TodayDate = new Date();
    const defaultDate = moment(TodayDate).format('DD.MM.YYYY');
    const defaultNextDate = moment(TodayDate).add(1, 'd').format('DD.MM.YYYY');

    const [date, setDate] = useState<any>(defaultDate);
    const [updateDate, setUpdateDate] = useState<any>((new Date()));
    const [isCalendarShow, setCalendarShow] = useState(false)
    const [isButtonClicked, setButtonClicked] = useState(false);
    const { citySelectionData, setIArrivalSelect } = useCitySelectionContext();
    const { setIDepartureSelect } = useCitySelectionContext();
    const { setCityArrivalValueContext, setCityDepartureValueContext } = useCitySelectionContext();
    const closeSelect = () => {
        setCalendarShow(prevState => !prevState)
        setIArrivalSelect({
            isCurrent: false,
            name: ''
        });
        setIDepartureSelect({
            isCurrent: false,
            name: ''
        });
    }
    useEffect(() => {
        async function getCalendarPriceSearch(cityIdStart: number, cityIdEnd: number) {
            const startDateFetch = formatedDateFetch(defaultDate);
            const datas = {
                CityDeparture: cityIdStart,
                CityArrival: cityIdEnd,
                Days: 155,
                DateStart: startDateFetch,
                CurrencyId: 4,
            }
            const resultCalendar = await getCalendarPrice(datas);

            if (resultCalendar) {

                const formattedData = formatedCalendarData(resultCalendar.Result.data)
                setTicketPrices(formattedData)
            }
        }
        if (isCalendarShow && citySelectionData.cityDepartureData?.Result[0]?.Id &&
            citySelectionData.cityDepartureData?.Result[0]?.Id !== 0 &&
            citySelectionData.cityArrivalData?.Result[0]?.Id &&
            citySelectionData.cityArrivalData?.Result[0]?.Id !== 0) {
            getCalendarPriceSearch(citySelectionData.cityDepartureData?.Result[0]?.Id, citySelectionData.cityArrivalData?.Result[0]?.Id);

        } else if (isCalendarShow && arrayValueCity && arrayValueCity.cityIdDeparture && arrayValueCity.cityIdArrival) {
            getCalendarPriceSearch(arrayValueCity.cityIdDeparture, arrayValueCity.cityIdArrival);
        }
        else {
            setTicketPrices([])

        }

    }, [isCalendarShow, arrayValueCity, citySelectionData.cityDepartureData.Result[0]?.Id, citySelectionData.cityArrivalData.Result[0]?.Id])
    useEffect(() => {
        if (citySeoRoute) {
            setDate('Дата выезда')
        }
    }, [citySeoRoute]);

    //дата для поиска лист
    useEffect(() => {
        if (searchProps && searchProps.dateSearch) {
            const formattedDate = moment(searchProps.dateSearch, 'DD.MM.YYYY').toDate();
            const dateObject = new Date(formattedDate);
            setUpdateDate(dateObject);
            setDate(searchProps.dateSearch);
        }
    }, [searchProps]);
    mainCityPage

    useEffect(() => {
        if (mainCityPage && mainCityPage.dateSearch) {
            const formattedDate = moment(mainCityPage.dateSearch, 'DD.MM.YYYY').toDate();
            const dateObject = new Date(formattedDate);
            setUpdateDate(dateObject);
            setDate(mainCityPage.dateSearch);
        }
    }, [mainCityPage]);
    useEffect(() => {
        const isFirstVisit = localStorage.getItem('isFirstVisit');

        if (isFirstVisit) {
            // Если это первое посещение, очищаем данные
            persistor.purge()
                .then(() => {
                    console.log("Persisted data cleared on first visit");
                    // Устанавливаем флаг, чтобы не очищать данные в будущем

                })
                .catch((error) => {
                    console.error("Error clearing persisted data", error);
                });
        } else {
            localStorage.setItem('isFirstVisit', 'true');
        }
    }, []);
    // useEffect(() => {

    //     if (arrayValueCity?.cityDepartNameSeo && arrayValueCity?.cityArravalNameSeo
    //         && arrayValueCity?.cityDepartNameSeo !== '' && arrayValueCity?.cityArravalNameSeo !== ''
    //     ) {
    //         const splitNameDep = splitCityName(arrayValueCity?.cityDepartNameSeo);
    //         setCityDepartureValue(splitNameDep[0]);
    //         const splitName = splitCityName(arrayValueCity?.cityArravalNameSeo);
    //         setCityArrivalValue(splitName[0]);
    //     }
    // }, [arrayValueCity])


    //выбор даты в календаре
    const handleDateChange = (selectedDate: any) => {
        const newDate = moment(selectedDate).format('DD.MM.YYYY');
        setUpdateDate(selectedDate);
        setDate(newDate);
        setCalendarShow(prevState => !prevState);
        // dispatch(setCityDepartureName(debbounceDeparture));
        // dispatch(setCityArrivalName(debbounceArrival));
    };
    //список городов
    useEffect(() => {
        const fetchCityArray = async () => {
            const result = await getServerSideProps();
            const resultCity = result.Result.Cities;

            setCityArray(resultCity);
            sessionStorage.setItem('cityArray', JSON.stringify(resultCity)); // Сохраняем данные в sessionStorage
        };

        if (cityArray.length === 0) {
            const savedDataCity = sessionStorage.getItem('cityArray');
            if (savedDataCity) {
                const parseSavedDataCity = JSON.parse(savedDataCity);
                setCityArray(parseSavedDataCity); // Если данные есть в sessionStorage, загружаем их
            } else {
                fetchCityArray();
            }
        }
    }, []);



    useEffect(() => {

        const fetchRouteData = async () => {
            const newDateFormated = formatedDateFetch(date);
            try {
                const resultFetchRoutes = await fetchRoutes(citySelectionData.cityDepartureData.Result[0].Id, citySelectionData.cityArrivalData.Result[0].Id, newDateFormated);

                dispatch(setDataRoute(resultFetchRoutes));
                setIsLoadingForm(false)
                handleSuccess(citySelectionData.cityDepartureData.Result[0].NameHttp.toLowerCase(), citySelectionData.cityArrivalData.Result[0].NameHttp.toLowerCase(), date);


            } catch (error) {
                console.error('Ошибка при отправке данных на сервер:', error);
            } finally {
                setCityDepartureValueContext('');
                setCityArrivalValueContext('');
                setDate('');
            }
        }
        if (isButtonClicked) {
            if (citySelectionData.cityDepartureData.Result.length > 0 && citySelectionData.cityArrivalData.Result.length > 0) {
                setIsLoadingForm(true);
                if (citySelectionData.cityDepartureData.Result[0].Id !== 0 && citySelectionData.cityArrivalData.Result[0].Id !== 0) {

                    fetchRouteData();
                    setButtonClicked(false);
                    // dispatch(setCityDepartureName(debbounceDeparture));
                    // dispatch(setCityArrivalName(debbounceArrival));

                    setDate(date);
                } else {

                    console.log('loading...');
                }
            } else {
                if (citySelectionData.cityDepartureData.Result.length < 1) {
                    console.log('Выберите другой город отправления');
                } else if (citySelectionData.cityArrivalData.Result.length < 1) {
                    console.log('Выберите другой город прибытия');
                } else {
                    console.log('данных нет');
                }
                setIsLoadingForm(false)
            }
        }

    }, [citySelectionData.cityArrivalData.Result, citySelectionData.cityDepartureData.Result, isButtonClicked]);

    const handleSubmit = () => {
        setButtonClicked(true);

    };

    return (
        <>


            <form id='search-form' autoComplete='off' className={`${styles['form-search']} ${className}`}>
                <div className={styles['form-search__wrapper']}>
                    <DepartureInput cityArray={cityArray} searchProps={searchProps} citySeoRoute={citySeoRoute} mainCityPage={mainCityPage} />
                </div>
                <div className={styles['form-search__wrapper']}>
                    <ArrivalInput cityArray={cityArray} searchProps={searchProps} citySeoRoute={citySeoRoute} mainCityPage={mainCityPage} />
                </div>
                <div className={styles['form-search__wrapper']}>
                    <label className={styles['form-search__label']} htmlFor="date">Когда</label>
                    <div className={styles['form-search__container']}>
                        <input
                            className={styles['form-search__input']}
                            id="date"
                            name='date'
                            type="text"
                            value={date}
                            readOnly
                            onClick={() => setCalendarShow(true)}
                            aria-label="Выберите дату"
                        />
                        <div className={styles['form-search__icon-wrapper']}
                            onClick={closeSelect}
                            aria-label="Кнопка календаря"
                            role='button'>
                            <CalendarIcon
                                className={`${styles['form-search__icon']} ${isCalendarShow ? styles.active : ''}`}
                            />
                        </div>
                    </div>
                    <div className={styles['form-search__sample']}>
                        <p className={styles['form-search__text']}>Например:</p>
                        <button className={styles['form-search__btn']} type='button' onClick={() => setDate(defaultDate)}>{defaultDateForm.Today}</button>
                        <button className={styles['form-search__btn']} type='button' onClick={() => setDate(defaultNextDate)}>{defaultDateForm.Tomorrow}</button>
                    </div>
                    {isCalendarShow ?
                        <div className={styles['form-search__calendar']}>
                            <Calendar
                                onChange={handleDateChange}
                                value={updateDate}
                                // tileDisabled={tileDisabled}
                                tileContent={tileContent}
                                minDate={new Date()}
                            />
                        </div>
                        : null}
                </div>
                <div className={styles['form-search__wrapper']}>
                    <button className={styles['form-search__btn-submit']} type='button' onClick={() => { handleSubmit(), setIsLoadingForm(true) }}
                        aria-label="Найти билеты">{isLoadingForm ? 'Идет поиск...' : 'Найти билеты'}
                    </button>
                </div>
            </form>

        </>
    );
};

export default SearchForm;