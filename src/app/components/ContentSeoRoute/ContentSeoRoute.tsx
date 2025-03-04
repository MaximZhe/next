import React, { FC, Suspense } from 'react';
import TicketImg from '../../icons/image/ticket-icon.svg';

import RoadIcon from '../../icons/image/road-icon.svg';


import Image from 'next/image';
import style from './routeDescription.module.scss'
import MapRoute from '@/app/components/MapRoute/MapRoute';

import BenefitsIcons from '@/app/components/UI/Benefits-icons/Benefits-icons';
import Link from 'next/link';
import SliderSeo from '../UI/SliderSeo/SliderSeo';
import Loading from '@/app/loading';
import ScheduleAll from '@/app/find/[slugRoute]/ScheduleItems/ScheduleAll';
import ButtonMoreRouteSeo from '../ButtonMorePage/ButtonMoreRouteSeo/ButtonMoreRouteSeo';
import ButtonMoreScheduesSeo from '../ButtonMorePage/ButtonMoreRouteSeo/ButtonMoreScheduesSeo';
import { getPriceValidUntil } from '@/app/config/configSchema';



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

    const arrayStopsCity = resultContent.Result.Routes !== null ? resultContent.Result.Routes[0]?.AllStops : [];
    const arrayReserveStops = resultsContentPage[5] ? resultsContentPage[5]['route-stops-station'].map((item: any) => item['route-stops__station']) : [];


    function replaceTextInBuyTicketText() {
        const textToReplace = resultsContentPage[21]?.["buy-ticket-text-link"]?.[0]?.["buy-ticket__text-link"]?.['textLink'];
        const replacementText = resultsContentPage[21]?.["buy-ticket-text-link"]?.[0]?.["buy-ticket__text-link"]?.['link'];

        // Если текст для замены не найден, возвращаем пустой массив
        if (!textToReplace) {
            return [];
        }

        // Ищем только замененные тексты
        const updatedTexts = resultsContentPage[7]?.['buy-ticket-text']
            .map((item: any) => {
                if (item['buy-ticket__text'].includes(textToReplace)) {
                    return {
                        'buy-ticket__text': item['buy-ticket__text'].replace(textToReplace, replacementText)
                    };
                }
                return null; // Вернём null, если замены не произошло
            })
            .filter(Boolean); // Удаляем все значения null из массива

        return updatedTexts; // Возвращаем массив с заменёнными текстами
    }
    function changeTextListTitle() {
        const text = resultsContentPage[12]?.['benefits-list-title'][0]?.['benefits__list-title']
        const textEndSlice = resultsContentPage[18]?.['benefits__list-benefist-content']?.[0]?.['li-0']

        if (text) {
            const resultSlice = text.slice(0, text.indexOf(textEndSlice));
            return resultSlice
        }
    }
	
    function formatText(object1: any, object2: any) {

        const textToRemove = object2?.['benefits__list-ticket']?.flatMap((item: any) => Object.values(item));
        
        const originalText = object1?.['buy-ticket-text']?.[0]?.['buy-ticket__text'];
    
        let formattedText = originalText;
        textToRemove?.forEach((removeText: string) => {
            formattedText = formattedText?.replace(new RegExp(removeText, 'g'), '');
        });
        formattedText = formattedText?.replace(/\s+/g, ' ').trim();
        return formattedText;
    }
    const formatTextManual = formatText(resultsContentPage[7], resultsContentPage[16]);
    const replaceTextLink = replaceTextInBuyTicketText();
    const textSliceBenefits = changeTextListTitle()
    const schemaLowPrice = resultsContentPage[1]?.['info-route-subtitle'][2]?.['info-route__subtitle']
    const priceMatch = schemaLowPrice ? schemaLowPrice.match(/\d+/) : 0; 
    const priceValidUntil = getPriceValidUntil();
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
                                            <meta itemProp="priceCurrency" content="RUB"/>
                                            <meta itemProp="priceValidUntil" content={`${priceValidUntil}`}/>
                                            <span itemProp="price" content={`${priceMatch[0]}`}>
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
                                {resultsContentPage[4]['route-text'].slice(0, 1).map((item: any, id: number) => {
                                    return (
                                        <p key={id} className={style['path-description__text']} itemProp="description">
                                            {item['route__text']}
                                        </p>
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

                                {resultsContentPage[4]['route-text'].slice(1).map((item: any, id: number) => {
                                    return (
                                        <p key={id} className={style['path-description__text']} itemProp="description">
                                            {item['route__text']}
                                        </p>
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
                                <div className={style['path-description-list']}>
                                    <h4 className={style['path-description-list__title']}>
                                        {resultsContentPage[20]?.['route-stops-title']?.[0]?.[`route-stops__title`] ?
                                            resultsContentPage[20]?.['route-stops-title'][0][`route-stops__title`] : `Остановки по маршуту`}
                                    </h4>
                                    {resultContent.Result.Routes !== null && resultContent.Result.Routes[0]?.AllStops.map((item: any) => {
                                        return (
                                            <div key={item.Name} className={style['path-description-list__item']} itemScope itemType="http://schema.org/BusStop">
                                                <p className={style['path-description-list__city']} itemProp="name">
                                                    {item.City}
                                                </p>
                                                <p className={style['path-description-list__street']} itemProp="address">
                                                    {item.Name}
                                                </p>
												<meta itemProp='telephone' content='+7 499 350 80 16' />
                                            </div>
                                        );
                                    })}
                                    {resultContent.Result.Routes === null && resultsContentPage[5]['route-stops-station'].map((item: any, index: number) => {
                                        return (
                                            <div key={item['route-stops__station']} className={style['path-description-list__item']} itemScope itemType="http://schema.org/BusStop">
                                                <p className={style['path-description-list__city']} itemProp="name">
                                                    {item['route-stops__station']}
                                                </p>
                                                <p className={style['path-description-list__street']} itemProp="address">
                                                    {resultsContentPage[6]['route-stops-desc'][index] ? resultsContentPage[6]['route-stops-desc'][index]['route-stops__desc'] : null}
                                                </p>
												<meta itemProp='telephone' content='+7 499 350 80 16' />
                                            </div>
                                        );

                                    })}
                                </div>
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
                            {resultsContentPage[7] !== null && resultsContentPage[7]['buy-ticket-text']?.[0]?.['buy-ticket__text'] !== null && resultsContentPage[16]?.['benefits__list-ticket'] !== undefined ? (
                                <p className={style['path-manual__text']}>
                                {formatTextManual}
                               </p>
                            ) : (
                                <p className={style['path-manual__text']}>
                                    {resultsContentPage[7]['buy-ticket-text'][0]['buy-ticket__text']}
                                </p>
                            )
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
                            {/* {resultsContentPage[15] !== null && resultsContentPage[15]['buy-ticket-text']?.[0]?.['buy-ticket-text'] !== null && resultsContentPage[7] !== null && resultsContentPage[7]?.['buy-ticket-text'] !== undefined ? (
                                <p className={style['path-manual__text']}>
                                    {resultsContentPage[7]?.['buy-ticket-text'][1]?.['buy-ticket__text']}
                                </p>
                            ) : (null)
                            } */}
                            {
                                replaceTextLink && replaceTextLink !== undefined && resultsContentPage[21] !== undefined ? (
                                    replaceTextLink.map((item: any, index: any) => (
                                        <p key={index} className={style['path-manual__text']} dangerouslySetInnerHTML={{ __html: item['buy-ticket__text'] }} />
                                    ))
                                ) : (null)
                            }

                        </div>
                    </div>
                    <div className={style['path-benefits']}>
                        <div className={style['path-benefits__colum-left']}>
                            <h3 className={style['path-benefits__title']}>
                                {resultsContentPage[11] !== null && resultsContentPage[11]?.['benefits-title']
                                    ? resultsContentPage[11]?.['benefits-title'][0]?.['benefits__title'] :
                                    `Преимущества компании Intercars`
                                }
                            </h3>
                            {resultsContentPage[19]?.['benefits__list-benefist-link']?.length < 1 && resultsContentPage[18]['benefits__list-benefist-content']?.length > 1 ? (
                                <p className={style['path-benefits__content']}>
                                    {textSliceBenefits}
                                </p>
                            ) : (
                                resultsContentPage[12] !== null && resultsContentPage[12]?.['benefits-list-title'] !== undefined
                                    && resultsContentPage[12]['benefits-list-title']?.[0] !== undefined ? (
                                    <p className={style['path-benefits__content']}>
                                        {resultsContentPage[12]['benefits-list-title'][0]['benefits__list-title']}
                                    </p>
                                ) : (null)
                            )
                            }
                            {resultsContentPage[12] !== null && resultsContentPage[12]?.['benefits-list-title'] !== undefined
                                && resultsContentPage[12]['benefits-list-title']?.[1] !== undefined ? (

                                <p className={style['path-benefits__content']}>
                                    {resultsContentPage[12]['benefits-list-title'][1]['benefits__list-title']}
                                </p>

                            ) : (null)}

                            {
                                resultsContentPage[18] && resultsContentPage[18]['benefits__list-benefist-content']
                                    ? (
                                        resultsContentPage[19]['benefits__list-benefist-link'].length > 0 && !resultsContentPage[19]['benefits__list-benefist-link'].some((obj: any) => Object.values(obj).includes(null)) ? (
                                            <ul className={style['path__list']}>
                                                {resultsContentPage[18]['benefits__list-benefist-content'].map((item: any, id: number) => (
                                                    <li key={id} className={style['path__text']}>
                                                        <>
                                                            {`${item[`li-${id}`]}`}<Link href={`${resultsContentPage[19]['benefits__list-benefist-link'][`${id}`][`link-${id}`]}`}>{resultsContentPage[19]['benefits__list-benefist-link'][`${id}`][`nameLink-${id}`]}</Link>
                                                        </>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) :
                                            (!resultsContentPage[18]['benefits__list-benefist-content'].some((obj: { [s: string]: unknown; } | ArrayLike<unknown>) => Object.values(obj).includes(null)) ? (
                                                <ul className={style['path__list']}>
                                                    {resultsContentPage[18]['benefits__list-benefist-content'].map((item: any, id: number) => (
                                                        <li key={id} className={style['path__text']}>
                                                            <>
                                                                {`${item[`li-${id}`]}`}
                                                            </>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                null
                                            )

                                            )
                                    )
                                    : (null)
                            }
                            {resultsContentPage[12] !== null && resultsContentPage[12]?.['benefits-list-title'] !== undefined ? (resultsContentPage[12]['benefits-list-title'].slice(2).map((item: any, index: number) => (
                                <p key={index} className={style['path-benefits__content']}>
                                    {item?.['benefits__list-title']}
                                </p>
                            ))) : (null)}
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