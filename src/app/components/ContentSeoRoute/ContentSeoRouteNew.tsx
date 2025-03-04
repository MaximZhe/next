import React, { FC, Suspense } from 'react';
import TicketImg from '../../icons/image/ticket-icon.svg';
import dynamic from 'next/dynamic';
import RoadIcon from '../../icons/image/road-icon.svg';


import Image from 'next/image';
import style from './routeDescription.module.scss'
const MapRoute = dynamic(() => import('@/app/components/MapRoute/MapRoute'),{ssr:false});
// import MapRoute from '@/app/components/MapRoute/MapRoute';

import BenefitsIcons from '@/app/components/UI/Benefits-icons/Benefits-icons';
import Link from 'next/link';
import SliderSeo from '../UI/SliderSeo/SliderSeo';
import Loading from '@/app/loading';
import ScheduleAll from '@/app/find/[slugRoute]/ScheduleItems/ScheduleAll';
import ButtonMoreRouteSeo from '../ButtonMorePage/ButtonMoreRouteSeo/ButtonMoreRouteSeo';
import ButtonMoreScheduesSeo from '../ButtonMorePage/ButtonMoreRouteSeo/ButtonMoreScheduesSeo';
import { getPriceValidUntil } from '@/app/config/configSchema';
import ArrowRight from '@/app/icons/svg/ArrowRight';
import AllStopsList from '../AllStopsList/AllStopsList';



interface IParamsContent {
    resultsContentPage: any,
    resultArrayCitys?: any,
    resultContent: any,
    schedules?: any
}
const ContentSeoRoute: FC<IParamsContent> = ({ resultsContentPage, resultArrayCitys, resultContent, schedules }) => {

    /*убираем дублирующие значения времени рейсов*/
    const scheduleItems = resultsContentPage[3]['schedule-text'] !== undefined ? resultsContentPage[3]['schedule-text'] : [];
    const halfLength = scheduleItems.length / 2;
    const halfScheduleItems = scheduleItems.slice(0, halfLength);
    const r = resultsContentPage

    const arrayStopsCity = resultContent?.Result?.Routes !== null ? resultContent?.Result?.Routes[0]?.AllStops : [];
    const arrayReserveStops = resultsContentPage[5] ? resultsContentPage[5]['route-stops-station'].map((item: any) => item['route-stops__station']) : [];
    function extractTextWithoutList(content: string) {

        const cleanedContent = content ? content.replace(/<ul[^>]*>.*?<\/ul>/gs, '') : content;

        return cleanedContent?.trim();
    }
    const formatedText = extractTextWithoutList(resultsContentPage[7]?.['buy-ticket']?.[0]?.['buy-ticket']?.[0]?.['content']);




    // const replaceTextLink = replaceTextInBuyTicketText();

    const schemaLowPrice = resultsContentPage[1]?.['info-route-subtitle'][2]?.['info-route__subtitle']
    const priceMatch = schemaLowPrice ? schemaLowPrice.match(/\d+/) : 0;
    const priceValidUntil = getPriceValidUntil();
    const benefitsHTML = resultsContentPage[12]?.['benefits-wrapper']?.[0]?.['benefits__wrapper'];
    const cleanedHTML = benefitsHTML?.replace(/<div class="benefits__icons">.*?<\/div>/s, '');


    return (
        <>
            {resultContent.Result && resultContent.Result.Page && resultContent.Result.Page.Html && resultsContentPage[0]['route-title'][0]?.route__title ? (
                <>
                    <div className={style['path-description']} itemScope itemType="http://schema.org/Product">
                        <div className={style['path-description__wrapper']}>
                            <div className={style['path-description__content']}>
                                <h2 className={style['path-description__title']} itemProp="name">
                                    {resultsContentPage[0]['route-title'][0].route__title}
                                </h2>
                                <meta itemProp="image" content="https://intercars.ru/_next/static/media/bus2.4c2fdecc.jpg"></meta>
                                <div className={style['path-description-row']}>
                                    <div className={style['path-description-row__item']}>
                                        <p className={style['path-description-row__title']}>
                                            Расстояние
                                        </p>
                                        <p className={style['path-description-row__text']}>
                                            {resultsContentPage[1]['info-route-subtitle'][0]['info-route__subtitle']}
                                        </p>
                                    </div>
                                    <div className={style['path-description-row__line']}></div>
                                    <div className={style['path-description-row__item']}>
                                        <p className={style['path-description-row__title']}>
                                            Среднее время рейса в пути
                                        </p>
                                        <p className={style['path-description-row__text']}>
                                            {resultsContentPage[1]['info-route-subtitle'][1]['info-route__subtitle']}
                                        </p>
                                    </div>
                                    <div className={style['path-description-row__line']}></div>
                                    <div className={style['path-description-row__item']}>
                                        <p className={style['path-description-row__title']}>
                                            Цена билета на автобус
                                        </p>
                                        <p className={style['path-description-row__text']} itemProp="offers" itemScope itemType="https://schema.org/Offer">
                                            <link itemProp="availability" href="https://schema.org/InStock" />
                                            <meta itemProp="priceCurrency" content="RUB" />
                                            <meta itemProp="priceValidUntil" content={`${priceValidUntil}`} />
                                            <span itemProp="price" content={`${priceMatch !== null ? priceMatch?.[0] : ''}`}>
                                                {resultsContentPage[1]['info-route-subtitle'][2]['info-route__subtitle']}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                                <div className={`${style['path-description-schedule']} ${style['path-description-schedule--mobail']}`}>
                                    <div className={style['path-description-schedule__header']}>
                                        <p className={style['path-description-schedule__title']}>
                                            Отправление
                                        </p>
                                        <p className={style['path-description-schedule__title']}>
                                            Прибытие
                                        </p>
                                    </div>
                                    <Suspense fallback={<Loading />}>
                                        {halfScheduleItems !== null && halfScheduleItems.length > 1 ? (
                                            <>
                                                <ScheduleAll schedules={schedules} halfScheduleItems={halfScheduleItems} />
                                                <ButtonMoreScheduesSeo lengthRoute={halfScheduleItems.length} />
                                            </>
                                        ) : (null)

                                        }
                                    </Suspense>
                                </div>
                                {resultsContentPage[4]?.['route-content']?.[0]?.['route__content'].slice(0, 1).map((item: any, id: number) => {
                                    return (
                                        <p key={id} className={style['path-description__text']} itemProp="description" dangerouslySetInnerHTML={{ __html: item['content'] }} />
                                    )
                                })}
                                {resultsContentPage[17]?.['benefits__list-route-content'] !== undefined && resultsContentPage[17]?.['benefits__list-route-content'].some((obj: any) => Object.values(obj).includes(null)) ?
                                    (
                                        null
                                    )
                                    : (
                                        <ul className={style['path__list']}>
                                            {resultsContentPage[17]?.['benefits__list-route-content'] ? (
                                                resultsContentPage[17]['benefits__list-route-content'].map((item: any, id: number) => (
                                                    <li key={id} className={style['path__text']}>
                                                        {item[`li-${id}`]}
                                                    </li>
                                                ))
                                            ) : null}
                                        </ul>
                                    )}

                                {resultsContentPage[4]?.['route-content']?.[0]?.['route__content'].slice(1).map((item: any, id: number) => {
                                    return (
                                        <p key={id} className={style['path-description__text']} itemProp="description" dangerouslySetInnerHTML={{ __html: item['content'] }} />
                                    )
                                })}
                                <div className={style['path-description__map']}>
                                    <Suspense fallback={<Loading />}>
                                        <MapRoute arrayStopsCity={arrayStopsCity} arrayReserveStops={arrayReserveStops} />
                                    </Suspense>

                                </div>
                            </div>
                            <div className={style['path-description__info']}>
                                <div className={style['path-description-schedule']}>
                                    <div className={style['path-description-schedule__header']}>
                                        <p className={style['path-description-schedule__title']}>
                                            Отправление
                                        </p>
                                        <p className={style['path-description-schedule__title']}>
                                            Прибытие
                                        </p>
                                    </div>
                                    <Suspense fallback={<Loading />}>
                                        {halfScheduleItems !== null && halfScheduleItems.length > 1 ? (
                                            <>
                                                <ScheduleAll schedules={schedules} halfScheduleItems={halfScheduleItems} />
                                                <ButtonMoreScheduesSeo lengthRoute={halfScheduleItems.length} />
                                            </>
                                        ) : (null)

                                        }
                                    </Suspense>

                                </div>
                                {resultContent?.Result?.Routes !== null &&
                                    resultsContentPage ? (
                                    <>

                                        {resultsContentPage.length > 0 ? ( // Проверка на наличие данных
                                            <AllStopsList stopsList={resultContent} contentPage={r} />
                                        ) : (
                                            <div>No content available</div> // Сообщение, если данных нет
                                        )}
                                    </>
                                ) : (
                                    null
                                )

                                }


                            </div>
                        </div>
                    </div>
                    <div className={style['path-manual']}>
                        <div className={style['path-manual__col-left']}>
                            <Image className={style['path-manual__icon']} src={TicketImg} width={40} height={40} alt='' />
                            <h3 className={style['path-manual__title']}>
                                {resultsContentPage[14]['buy-ticket-title'][0]?.['buy-ticket__title']}
                            </h3>
                            <Link className={`${style['path-manual__link']}`} href={'/kak-kupit-bilet-na-avtobus'} target='_blank'>Инструкция</Link>
                        </div>
                        <div className={style['path-manual__col-right']}>
                            {resultsContentPage[7]?.['buy-ticket']?.[0]?.['buy-ticket'] ?
                                (
                                    <p className={style['path-manual__text']} dangerouslySetInnerHTML={{ __html: formatedText }} />
                                ) : null
                            }
                            {resultsContentPage[16]?.['benefits__list-ticket']
                                && resultsContentPage[16]?.['benefits__list-ticket'].some((obj: ArrayLike<unknown> | { [s: string]: unknown; }) => Object.values(obj).includes(null)) ? (

                                null
                            ) : (
                                <ul className={style['path__list']}>
                                    {resultsContentPage[16]?.['benefits__list-ticket'] !== undefined && resultsContentPage[16]?.['benefits__list-ticket'].map((item: any, id: number) => {
                                        if (item !== null) {
                                            return (
                                                <li key={id} className={style['path__text']}>
                                                    {item[`li-${id}`]}
                                                </li>
                                            );
                                        } else {
                                            (null);
                                        }
                                    })}
                                </ul>
                            )}
                            {resultsContentPage[7]?.['buy-ticket']?.[0]?.['buy-ticket']?.slice(1).map((item: any, id: number) => {
                                return (
                                    <p key={id} className={style['path-manual__text']} dangerouslySetInnerHTML={{ __html: item['content'] }} />
                                )
                            })}
                        </div>
                    </div>
                    <div className={style['path-benefits']}>
                        <div className={style['path-benefits__colum-left']}>
                            <>
                                {cleanedHTML !== null && cleanedHTML !== undefined ? (
                                    <div dangerouslySetInnerHTML={{ __html: cleanedHTML }} />
                                ) : null}

                            </>
                            <div className={style['path-benefits__icons']}>
                                <BenefitsIcons />
                            </div>

                        </div>
                        <div className={style['path-benefits__colum-right']}>
                            <SliderSeo className={''} />
                        </div>
                    </div>
                    <div className={style['path-roads']}>
                        <div className={style['path-roads__colum-left']}>
                            <Image className={style['path-roads__icon']}
                                src={RoadIcon} width={40} height={40} alt='' />
                            <h3 className={style['path-roads__title']}>
                                {resultsContentPage[8]['all-routes-title'][0]['all-routes__title']}
                            </h3>

                        </div>
                        <div className={style['path-roads__colum-right']}>
                            <ul className={style['path-roads-list']}>
                                {resultsContentPage[9]?.['all-routes-item']?.map((item: any, id: number) => {

                                    const link = resultsContentPage[10]?.['all-routes-link']?.[id]?.['all-routes__link'];
                                    if (link) {
                                        return (
                                            <li key={id} className={style['path-roads-list__item']}>
                                                <Link href={`/find/${link}`} className={style['path-roads-list__link']}>
                                                    {item['all-routes__item']}
                                                </Link>
                                            </li>
                                        );
                                    } else {
                                        return null;

                                    }
                                })}
                            </ul>
                        </div>
                    </div>
                </>
            ) : null}
        </>
    );
};

export default ContentSeoRoute;