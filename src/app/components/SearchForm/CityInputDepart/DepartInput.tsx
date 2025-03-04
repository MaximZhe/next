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
    }
    mainCityPage?:{
        citySearchDeparture: string,
        citySearchArrival: string,
        dateSearch: string | null
    }
}

const DepartureInput: FC<ICityInputDepartProps> = ({ cityArray, searchProps, citySeoRoute, mainCityPage }) => {

    const { citySelectionData, setIsSelectedChange, setCityArrivalValueContext, setCityDepartureValueContext, setIArrivalSelect, setIDepartureSelect, setCityDepartureData, setIsAnimatedArrow } = useCitySelectionContext();
    const [cityDepartSearch, setCityDepartSearch] = useState([]);

    const refDepartureSelect = useRef<HTMLDivElement | null>(null);

    const pathname = usePathname()
    
    useEffect(() => {
        if( pathname === '/'){
            setCityDepartureValueContext(mainCityPage?.citySearchDeparture)
        }
    },[mainCityPage])

    useEffect(() => {
        if (searchProps && searchProps?.citySearchDeparture.length > 0) {
            setCityDepartureValueContext(searchProps?.citySearchDeparture[0])
        }
    }, [searchProps])

    useEffect(() => {
        if (citySeoRoute && citySeoRoute.cityDepartNameSeo.length > 0) {
            const newCityNameDepart = splitCityName(citySeoRoute.cityDepartNameSeo);
            setCityDepartureValueContext(newCityNameDepart[0])
        }
    }, [citySeoRoute])
    const handleClickOutside = (event: MouseEvent) => {
        if (refDepartureSelect.current && !refDepartureSelect.current.contains(event.target as Node)) {
            setIDepartureSelect({ isCurrent: false, name: '' });
        }
    };
    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const animatedIcon = setTimeout(() => {
            setIsAnimatedArrow(false);
        }, 300);

        return () => {
            clearTimeout(animatedIcon);
        }
    }, [citySelectionData.isAnimatedArrow])

    const debbounceDeparture = citySelectionData.cityDepartureValueContext !== undefined ? useDebounce(citySelectionData.cityDepartureValueContext, 0) : ''
    const handleDepartureChangeFilter = (inputVal: string) => {
        const inputValue = inputVal.toLowerCase();

        if (inputValue && inputValue.length > 0) {

            const filteredCities: any = cityArray.filter((city: any) =>
                city.Name && city.Name.toLowerCase().startsWith(inputValue)
            );
            if (filteredCities && filteredCities.length > 0) {
                setCityDepartSearch(filteredCities);

            } else {
                console.log('Город не найден')
            }

        }
    };
    useEffect(() => {
        const fetchCityDepartureData: any = async (cityDepart: string) => {
            const resultDepart = await fetchCityDeparture(cityDepart);
            setCityDepartureData(resultDepart);

        }
        if (debbounceDeparture && debbounceDeparture.length > 0) {
            if (citySelectionData.isSelectedChange === true) {
                handleDepartureChangeFilter(debbounceDeparture);
                setIDepartureSelect({
                    isCurrent: true,
                    name: ''
                });
                setIArrivalSelect({
                    isCurrent: false,
                    name: ''
                });

            } else {

            }

            if (debbounceDeparture === defaultCityForm.Minsk || debbounceDeparture === defaultCityForm.Mosсow) {
                setIDepartureSelect({
                    isCurrent: false,
                    name: ''
                });
            }
        }
        if (debbounceDeparture && debbounceDeparture.length === 0) {
            setIDepartureSelect({
                isCurrent: false,
                name: ''
            });
        }
        if (debbounceDeparture === citySelectionData.IDepartureSelect.name) {
            setIDepartureSelect({
                isCurrent: false,
                name: ''
            });
        }
        if (debbounceDeparture && debbounceDeparture.length > 0) {
            fetchCityDepartureData(debbounceDeparture);
        }


    }, [debbounceDeparture])

    const updateDataDepartCity = (city: IDataCity) => {
        const newCityNameDepart = splitCityName(city.Name);

        setCityDepartureValueContext(newCityNameDepart[0]);
        setCityDepartSearch([]);
        setIsSelectedChange(false);
        setIDepartureSelect({
            isCurrent: false,
            name: newCityNameDepart[0]
        });
    }

    const handleArrowClick = () => {
        setCityDepartureValueContext(citySelectionData.cityArrivalValueContext);
        setCityArrivalValueContext(citySelectionData.cityDepartureValueContext);
        setIsAnimatedArrow(true);
        setIsSelectedChange(false)
    };
    return (
        <>
            <label className={styles['form-search__label']} htmlFor='departure'>Откуда</label>
            <div className={styles['form-search__container']}>
                <input spellCheck={true} className={styles['form-search__input']}
                    id="departure"
                    name='departure'
                    type="text"
                    value={citySelectionData.cityDepartureValueContext}
                    onChange={(e) => { setCityDepartureValueContext(e.target.value), setIsSelectedChange(true) }}
                    placeholder='Пункт отправления'
                    required={true}
                    aria-label="Пункт отправления"
                />
                <div ref={refDepartureSelect} className={`${styles['form-search__select']} ${citySelectionData.IDepartureSelect.isCurrent === true ? styles.active : ''}`}>
                    {cityDepartSearch.map((city: any) => {
                        const [cityName, cityDetails] = splitCityName(city.Name);
                        return (
                            <button type='button' key={city.Id} onClick={() => updateDataDepartCity(city)}>
                                {cityName}
                                <span className={styles['form-search__details']}>{cityDetails ? `(${cityDetails})` : null}</span>
                            </button>
                        );
                    })}

                </div>
                <ArrowForm className={`${styles['form-search__image']} ${citySelectionData.isAnimatedArrow ? styles.clicked : ''}`} onClick={handleArrowClick}
                />
            </div>
            <div className={styles['form-search__sample']}>
                <p className={styles['form-search__text']}>Например:</p>
                <button className={styles['form-search__btn']} type='button'
                    onClick={() => {
                        setCityDepartureValueContext(defaultCityForm.Minsk);
                        setCityDepartSearch([]);
                    }}
                >
                    {defaultCityForm.Minsk}
                </button>
                <button className={styles['form-search__btn']} type='button'
                    onClick={() => {
                        setCityDepartureValueContext(defaultCityForm.Mosсow);
                        setCityDepartSearch([]);
                    }}>{defaultCityForm.Mosсow}
                </button>
            </div>
        </>
    );
};

export default DepartureInput;

