'use client';

import SearchForm from '@/app/components/SearchForm/SearchForm';
import React, { Suspense } from 'react';


import Breadcrumbs from '@/app/components/UI/Breadcrumbs/Breadcrumbs';
import ListRatesFilterButtons from '@/app/components/ListRatesFilterButtons/ListRatesFilterButtons';
import Reviews from '@/app/components/Reviews/Reviews';
import styles from './routeDescription.module.scss';
import dynamic from 'next/dynamic';
import Menu from '@/app/components/Header/Menu/Menu';
import Accordion from '@/app/components/HomePage/FAQ/FAQ';
import { accordionItemsLeft, accordionItemsRight } from '@/app/constant/constant';
import GridLoader from 'react-spinners/GridLoader';

const Loading = () => {
    const links = [
        { label: 'Главная', href: '/' },
        { label: 'Маршрут', href: '/find', active: true },
    ];
    return (
        <>
            <Menu responsive={true} />
            <section className={styles.path}>
                <div className='container'>
                    <div className={styles.path__wrapper}>
                        <div className={styles.path__nav}>
                            <Breadcrumbs links={links} /> <Menu responsive={false} className={styles['path__menu']} backgroundWapper={styles['path__nav-wrapper']} />
                        </div>
                        <Suspense>
                            <div className={styles['path__content']}>
                                <h1 className={styles['path__title']}>
                                    {`Билеты на автобус`} <GridLoader color={'#FFFFFF'} loading={true} size={5} />
                                </h1>
                                <SearchForm className={styles.path__form} />
                            </div>
                        </Suspense>
                        <div className={styles['path__routes']} style={{minHeight: '300px', textAlign: 'center', fontSize: '30px' }}>
                          <div style={{marginTop:'25px', maxWidth: '1200px',width: '100%', height:'300px',margin: '25px auto 0',borderRadius: '12px',background: '#ffffff',alignItems:'center', justifyContent:'center',display: 'flex',padding: '24px'
                          }}>
                          <div className='loading-spiner'>
                                <GridLoader color={'#0243A6'} loading={true} size={10} />
                            </div>
                          </div>
                          <div style={{marginTop:'25px', maxWidth: '1200px',width: '100%', height:'300px',margin: '25px auto 0',alignItems:'center', justifyContent:'center', borderRadius: '12px',background: '#ffffff',display: 'flex',padding: '24px'
                          }}>
                          <div className='loading-spiner'>
                                <GridLoader color={'#0243A6'} loading={true} size={10} />
                            </div>
                          </div>
                          <div style={{ maxWidth: '1200px',width: '100%', height:'300px',margin: '25px auto 0',borderRadius: '12px',alignItems:'center', justifyContent:'center', background: '#ffffff',display: 'flex',padding: '24px'
                          }}>
                          <div className='loading-spiner'>
                                <GridLoader color={'#0243A6'} loading={true} size={10} />
                            </div>
                          </div>
                        </div>
                        
                        <div style={{borderRadius: '12px',flexDirection:'column', background: '#ffffff',maxWidth: '1200px',width: '100%', height:'300px',margin: '25px auto 0',display:'flex', alignItems:'center', justifyContent:'center'}}>
                            <div style={{ textAlign: 'center', fontSize: '30px' }}> Загрузка контента </div>
                            <div className='loading-spiner'>
                                <GridLoader color={'#0243A6'} loading={true} size={10} />
                            </div>
                        </div>


                        <div className={styles['path__box']}>
                            <Accordion className={[`${styles.path__accordion}`, `${styles.path__arrow}`]}
                                itemsLeft={accordionItemsLeft}
                                itemsRight={accordionItemsRight} />
                        </div>
                    </div>
                </div>
                <div className={styles['path__box']}
                style={{background: '#f6f6f6',height: '300px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <div className='loading-spiner'>
                                <GridLoader color={'#0243A6'} loading={true} size={10} />
                            </div>
                </div>
            </section>

        </>

    );
};

export default Loading;