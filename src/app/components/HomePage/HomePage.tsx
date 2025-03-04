import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';



const Actions = dynamic(() => import('./Actions/Actions'));
const Info = dynamic(() => import('./Info/Info'));
const Advantages = dynamic(() => import('./Advantages/Advantages'));
const Accordion = dynamic(() => import('./FAQ/FAQ'));
import { configHomePage } from '@/app/config/configSchema';

import { accordionItemsLeft, accordionItemsRight } from '@/app/constant/constant';
const Slider = dynamic(() => import('../UI/Slider/Slider'));
// import Slider from '../UI/Slider/Slider';

const SearchForm = dynamic(() => import('../SearchForm/SearchForm'));
import style from './HomePage.module.scss';
import Loading from '@/app/loading';
import Menu from '../Header/Menu/Menu';


export const metadata: Metadata = {
    title:'Homepage',
    description:'This HomePage'
}



export default function Homepage()  {
  const jsonLd = configHomePage()
  const mainCityPage = {
    citySearchDeparture:'',
    citySearchArrival: '',
    dateSearch: ''
  }
  return (
    
    <div >
        <div className={style.offer}>
            <div className={style['offer__wrapper']}>
                <Menu />
                <div className='container'>
                    <div className={style['offer__inner']}>
                        <h1 className={style['offer__title']}>
                            Автобусные билеты по лучшим ценам
                        </h1>
                        <SearchForm className={style['offer__form']} mainCityPage={mainCityPage}/>
                    </div>
                </div>
            </div>
        </div>
        <Suspense>
            
        <Slider title={'Популярные маршруты'} className={`slider-routes`}/>
        </Suspense>
        <Suspense fallback={<Loading />}>
        <Actions />
        </Suspense>
        
        <Info />
        <Advantages />
        <Accordion
            itemsLeft={accordionItemsLeft}
            itemsRight={accordionItemsRight} />
			<script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
  />
        
    </div>
);
};
