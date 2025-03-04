'use client';

import SearchForm from '@/app/components/SearchForm/SearchForm';
import React from 'react';
import { GridLoader } from 'react-spinners';
import style from '../../../components/ListRates/ListRates.module.scss';
import Breadcrumbs from '@/app/components/UI/Breadcrumbs/Breadcrumbs';
import ListRatesFilterButtons from '@/app/components/ListRatesFilterButtons/ListRatesFilterButtons';


const Loading = () => {
    const links = [
        { label: 'Главная', href: '/' },
        { label: 'Поиск билетов', href: '/find', active: true },
    ];
    return (
        <div className="container">
            <SearchForm className={style['rates__form']} />
            <div className={style['rates__wrapper']} >
                <div className={style['rates__header']} >
                    <Breadcrumbs links={links} />
                    <div className={style['rates__filter']} >
                        <ListRatesFilterButtons title={'Время отправления '} />
                        <ListRatesFilterButtons title={'Время прибытия'} />
                        <ListRatesFilterButtons title={'Время в пути'} />
                        <ListRatesFilterButtons title={'Стоимость'} />
                    </div>
                </div>
                <GridLoader className='loading-spiner' color={'#0243A6'} loading={true} size={10} />
            </div>        
        </div>
    );
};

export default Loading;