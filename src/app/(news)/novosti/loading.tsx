'use client';
import Menu from '@/app/components/Header/Menu/Menu';
import React from 'react';
import { GridLoader } from 'react-spinners';
import style from './NewsPage.module.scss'
import Breadcrumbs from '@/app/components/UI/Breadcrumbs/Breadcrumbs';
import { routesSidebar } from '@/app/constant/constant';
import RouteItem from '@/app/components/RouteItem/RouteItem';
const Loading = () => {
    const links = [
        { label: 'Главная', href: '/' },
        { label: 'Новости', href: '/novosti', active: true },
    ];
    return (

        <>
            <Menu className='menu__theme--blue' />
            <section className={style.news}>
                <div className='container'>
                    <div className={style['news__wrapper']}>
                        <div className={style['news__content']}>
                            <Breadcrumbs links={links} />
                            <h1 className={style['news__title']}>
                                Новости
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
                        <div className={style['news__promo']}>
                            {routesSidebar.map((item) => (

                                <RouteItem key={item.id} data={item} className={`${style['news-route__item']}`} />

                            ))}
                            {/* <ButtonRoutes to={{ pathname: '/404' }} title={'Другие популярные маршруты'} className={`${style['news__more']}`} /> */}
                        </div>
                    </div>

                </div>
            </section>
        </>

    );
};

export default Loading;