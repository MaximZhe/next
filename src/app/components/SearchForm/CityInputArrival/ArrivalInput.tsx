'use client'

import React, { FC, useEffect, useRef, useState } from 'react';
import styles from '../SearchForm.module.scss';
import { splitCityName } from '@/app/utils/splitCityNameSearch';
import ArrowForm from '@/app/icons/svg/ArrowForm';
import { useDebounce } from '@/app/hooks/useDebounce';
import { defaultCityForm } from '@/app/constant/constant';
import { initialStateResultCity } from '@/app/constant/searchForm';
import { ICityDataProps, IDataCity } from '@/app/types/types';
import { fetchCityDeparture } from '@/app/api/actionFetchDepart';
import { fetchCityArrival } from '@/app/api/actionFetchArraval';
import { useCitySelectionContext } from '@/contex/formSearch';
import { usePathname } from 'next/navigation';

interface ICityInputDepartProps {
    cityArray: string[],
    searchProps?: {
        citySearchDeparture: string[],
        citySearchArrival: string[],
        dateSearch: string | null
    },
    citySeoRoute?: {
        cityDepartName: string;
        cityArravalName: string;
        cityDepartNameSeo: string;
        cityArravalNameSeo: string;
        cityIdDeparture: number;
        cityIdArrival: number;
    },
    mainCityPage?:{
        citySearchDeparture: string,
        citySearchArrival: string,
        dateSearch: string | null
    }
}

const ArrivalInput: FC<ICityInputDepartProps> = ({ cityArray, searchProps, citySeoRoute, mainCityPage }) => {
    const {citySelectionData, setIArrivalSelect,setIDepartureSelect, setCityArrivalData,setCityArrivalValueContext } = useCitySelectionContext();
    
    const [isSelectedChange, setIsSelectedChange] = useState(false);
    const [citySearchArrival, setCitySearchArrival] = useState([]);
    const pathname = usePathname()

    useEffect(() => {
        if( pathname === '/'){
            setCityArrivalValueContext(mainCityPage?.citySearchArrival)
        }
    },[mainCityPage])

    const refArrivalSelect = useRef<HTMLDivElement | null>(null);
    const handleClickOutside = (event: MouseEvent) => {
        if (refArrivalSelect.current && !refArrivalSelect.current.contains(event.target as Node)) {
            setIArrivalSelect({ isCurrent: false, name: '' });
        }

    };
    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
    const debbounceArrival = useDebounce(citySelectionData.cityArrivalValueContext, 0);
    const handleArrivalChangeFilter = (inputVal: string) => {
        const inputValue = inputVal.toLowerCase();
        if (inputValue && inputValue.length > 0) {
            const filteredCities:any = cityArray.filter((city: any) =>
                city.Name && city.Name.toLowerCase().startsWith(inputValue)
            );
            if (filteredCities.length > 0) {
                setCitySearchArrival(filteredCities);
            } else {
                console.log('Город не найден')
            }
        }
    };
    useEffect(() => {
        const fetchCityArrivalData = async (cityArrival: string) => {
            const resultArrival = await fetchCityArrival(cityArrival);
            setCityArrivalData(resultArrival);

        }

        if (debbounceArrival && debbounceArrival.length > 0) {
            if (isSelectedChange === true) {
                handleArrivalChangeFilter(debbounceArrival);
                setIArrivalSelect({
                    isCurrent: true,
                    name: ''
                });
                setIDepartureSelect({
                    isCurrent: false,
                    name: ''
                });
            } else {

            }

            if (debbounceArrival === defaultCityForm.Minsk || debbounceArrival === defaultCityForm.Mosсow) {
                setIArrivalSelect({
                    isCurrent: false,
                    name: ''
                });
            }
        }
        if (debbounceArrival && debbounceArrival.length === 0) {
            setIArrivalSelect({
                isCurrent: false,
                name: ''
            });
        }
        if (debbounceArrival === citySelectionData.IArrivalSelect.name) {
            setIArrivalSelect({
                isCurrent: false,
                name: ''
            });
        }
        if (debbounceArrival && debbounceArrival.length > 0) {
            fetchCityArrivalData(debbounceArrival);

        }
    }, [debbounceArrival])

    const updateDataArrivalCity = (city: IDataCity) => {
        const newCityNameArrival = splitCityName(city.Name);
        setCityArrivalValueContext(newCityNameArrival[0]);
        setCitySearchArrival([]);
        setIsSelectedChange(false);
        setIArrivalSelect({
            isCurrent: false,
            name: newCityNameArrival[0]
        });
    }
    useEffect(() => {
       if(searchProps && searchProps?.citySearchArrival.length > 0){
        console.log(citySelectionData.cityArrivalValueContext)
        setCityArrivalValueContext(searchProps?.citySearchArrival[0])
    } 
    },[searchProps])

    useEffect(() => {
        if (citySeoRoute && citySeoRoute.cityArravalNameSeo.length > 0) {
            const newCityNameArrival = splitCityName(citySeoRoute.cityArravalNameSeo);
            setCityArrivalValueContext(newCityNameArrival[0])
        }
    }, [citySeoRoute])

    return (
        <>
            <label className={styles['form-search__label']} htmlFor="arrival">Куда</label>
            <div className={styles['form-search__container']}>
                <input spellCheck={true}
                    className={styles['form-search__input']}
                    id="arrival"
                    name='arrival'
                    type="text"
                    value={citySelectionData.cityArrivalValueContext}
                    onChange={(e) => {setCityArrivalValueContext(e.target.value), setIsSelectedChange(true) }}
                    placeholder='Пункт назначения'
                    required={true}
                    aria-label="Выберите пункт назначения"
                />
                <div ref={refArrivalSelect} className={`${styles['form-search__select']} ${citySelectionData.IArrivalSelect.isCurrent === true ? styles.active : ''}`}>
                    {citySearchArrival.map((city: any) => {
                        const [cityNameArrival, cityDetailsArrival] = splitCityName(city.Name);
                        return (
                            <button type='button' key={city.Id} onClick={() => updateDataArrivalCity(city)}>
                                {cityNameArrival}
                                <span className={styles['form-search__details']}>
                                    {cityDetailsArrival ? `(${cityDetailsArrival})` : null}
                                </span>
                            </button>
                        )
                    })}
                </div>
            </div>
            <div className={styles['form-search__sample']}>
                <p className={styles['form-search__text']}>Например:</p>
                <button className={styles['form-search__btn']} type='button' onClick={() => { setCityArrivalValueContext(defaultCityForm.Minsk); setCitySearchArrival([]); }}>{defaultCityForm.Minsk}</button>
                <button className={styles['form-search__btn']} type='button' onClick={() => { setCityArrivalValueContext(defaultCityForm.Mosсow); setCitySearchArrival([]); }}>{defaultCityForm.Mosсow}</button>
            </div>
        </>
    );
};

export default ArrivalInput;

