'use client';
import React from 'react';
import { GridLoader } from 'react-spinners';
import RouteItem from '../components/RouteItem/RouteItem';
import { routesSidebar } from '../constant/constant';
import Breadcrumbs from '../components/UI/Breadcrumbs/Breadcrumbs';
import Menu from '../components/Header/Menu/Menu';
import style from './SalesPage.module.scss'
const Loading = () => {
    const links = [
        { label: 'Главная', href: '/' },
        { label: 'Акции', href: '/akcii', active: true },
    ];
    return (
        <>
            <Menu className='menu__theme--blue' />
            <section className={style.sales}>
                <div className='container'>
                    <div className={style['sales__wrapper']}>
                        <div className={style['sales__content']}>
                            <Breadcrumbs links={links} />
                            <h1 className={style['sales__title']}>
                                Выгодные предложения Intercars
                            </h1>
                            <div style={{ marginTop: '24px', padding: '24px', background: '#fff', borderRadius: '12px', width: '100%', height: '160px' }}>
                                <div className='loading-spiner'>
                                    <GridLoader color={'#0243A6'} loading={true} size={10} />
                                </div>
                            </div>
                            <div style={{ marginTop: '24px', padding: '24px', background: '#fff', borderRadius: '12px', width: '100%', height: '160px' }}>
                                <div className='loading-spiner'>
                                    <GridLoader color={'#0243A6'} loading={true} size={10} />
                                </div>
                            </div>
                            <div style={{ marginTop: '24px', padding: '24px', background: '#fff', borderRadius: '12px', width: '100%', height: '160px' }}>
                                <div className='loading-spiner'>
                                    <GridLoader color={'#0243A6'} loading={true} size={10} />
                                </div>
                            </div>
                        </div>
                        <div className={style['sales__promo']}>
                            {routesSidebar.map((item) => (

                                <RouteItem key={item.id} data={item} className={`${style['sales-route__item']}`} />

                            ))}
                            {/* <ButtonRoutes to={{ pathname: '' }} title={'Другие популярные маршруты'} className={`${style['sales__more']}`} /> */}
                        </div>
                    </div>

                </div>
            </section>
        </>
    );
};

export default Loading;