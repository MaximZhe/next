'use client'

import React, { FC, useState } from 'react';
import style from './AllStops.module.scss';
import ArrowRight from '@/app/icons/svg/ArrowRight';

type GenericObject = {
    [key: string]: string;
};

type NestedArray = {
    [key: string]: GenericObject[];
};

type GenericData = NestedArray[];

interface IAllStopsList {
    stopsList: any;
    contentPage: GenericData
}

const AllStopsList: FC<IAllStopsList> = ({ stopsList, contentPage }) => {


    const [showAllStops, setShowAllStops] = useState(false);

    const getStopText = (count: number): string => {
        if (count === 1) {
            return ' остановка';
        } else if (count < 5) {
            return ' остановки';
        } else {
            return ' остановок';
        }
    };

    const stopCount = contentPage[5]['route-stops-station'].length - 4;
    const stopCountRouteStop = stopsList?.Result.Routes[0]?.AllStops.length - 4;
    return (
        <>
            <div className={style['path-description-list']}>
                <h3 className={style['path-description-list__title']}>
                    {contentPage?.[20]?.['route-stops-title']?.[0]?.[`route-stops__title`] ?
                        contentPage?.[20]?.['route-stops-title']?.[0]?.[`route-stops__title`] : `Остановки по маршуту`}
                </h3>


                {stopsList?.Result?.Routes !== null && contentPage?.[5]?.['route-stops-station'].length > 5 ? (
                    <>
                        {/* Первые два видимых элемента */}
                        {contentPage[5]['route-stops-station'].length > 5 && (
                            <>
                                {contentPage[5]['route-stops-station'].slice(0, 2).map((item: any, index: number) => (
                                    <div key={item['route-stops__station']} className={style['path-description-list__item']} itemScope itemType="http://schema.org/BusStop">
                                        <p className={style['path-description-list__city']} itemProp="name">
                                            {item['route-stops__station']}
                                        </p>
                                        <p className={style['path-description-list__street']} itemProp="address">
                                            {contentPage?.[6]?.['route-stops-desc'][index] ? contentPage[6]['route-stops-desc'][index]['route-stops__desc'] : null}
                                        </p>
                                        <meta itemProp='telephone' content='+7 499 350 80 16' />
                                    </div>
                                ))}
                            </>
                        )}

                        {/* Блок со скрытыми остановками */}
{contentPage[5]['route-stops-station'].length > 5 && (
    <div>
        <div className={`${!showAllStops ? style['hidden-stops'] : style['show-stops']}`}>
            {contentPage[5]['route-stops-station'].slice(2, -2).map((item: any, index: number) => (
                <div
                    key={item['route-stops__station']}
                    className={`${style['path-description-list__item']} ${showAllStops ? style.show : ''}`}
                    style={{ animationDelay: `${index * 0.3}s` }} // Задержка анимации для каждого элемента
                    itemScope
                    itemType="http://schema.org/BusStop"
                >
                    <p className={style['path-description-list__city']} itemProp="name">
                        {item['route-stops__station']}
                    </p>
                    <p className={style['path-description-list__street']} itemProp="address">
                        {contentPage?.[6]?.['route-stops-desc'][index] ? contentPage[6]['route-stops-desc'][index]['route-stops__desc'] : null}
                    </p>
                    <meta itemProp='telephone' content='+7 499 350 80 16' />
                </div>
            ))}
        </div>
        {!showAllStops && (
            <p className={style['path-description-list__stops']}>
                {contentPage[5]['route-stops-station'].length - 4}
                {getStopText(stopCount)}
            </p>
        )}
    </div>
)}

                        {/* Последние два видимых элемента */}
                        {contentPage[5]['route-stops-station'].length > 5 && (
                            <>
                                {contentPage[5]['route-stops-station'].slice(-2).map((item: any, index: number) => (
                                    <div key={item['route-stops__station']} className={style['path-description-list__item']} itemScope itemType="http://schema.org/BusStop">
                                        <p className={style['path-description-list__city']} itemProp="name">
                                            {item['route-stops__station']}
                                        </p>
                                        <p className={style['path-description-list__street']} itemProp="address">
                                            {contentPage?.[6]?.['route-stops-desc'][index] ? contentPage[6]['route-stops-desc'][index]['route-stops__desc'] : null}
                                        </p>
                                        <meta itemProp='telephone' content='+7 499 350 80 16' />
                                    </div>
                                ))}
                            </>
                        )}
                    </>
                ) : (
                    <>
                        {stopsList?.Result.Routes !== null && contentPage?.[5]?.['route-stops-station'].map((item: any, index: number) => {
                            return (
                                <div key={item['route-stops__station']} className={style['path-description-list__item']} itemScope itemType="http://schema.org/BusStop">
                                    <p className={style['path-description-list__city']} itemProp="name">
                                        {item['route-stops__station']}
                                    </p>
                                    <p className={style['path-description-list__street']} itemProp="address">
                                        {contentPage?.[6]?.['route-stops-desc'][index] ? contentPage?.[6]?.['route-stops-desc'][index]?.['route-stops__desc'] : null}
                                    </p>
                                    <meta itemProp='telephone' content='+7 499 350 80 16' />
                                </div>
                            );

                        })}
                    </>
                )}
                {contentPage?.[5]?.['route-stops-station'] === null && stopsList?.Result?.Routes !== null && (
                    <>
                        {/* Первые два видимых элемента */}
                        {stopsList?.Result.Routes[0]?.AllStops.length > 0 && (
                            <>
                                {stopsList?.Result.Routes[0]?.AllStops.slice(0, 2).map((item: any) => (
                                    <div key={item.Name} className={style['path-description-list__item']} itemScope itemType="http://schema.org/BusStop">
                                        <p className={style['path-description-list__city']} itemProp="name">
                                            {item.City}
                                        </p>
                                        <p className={style['path-description-list__street']} itemProp="address">
                                            {item.Name}
                                        </p>
                                        <meta itemProp='telephone' content='+7 499 350 80 16' />
                                    </div>
                                ))}
                            </>
                        )}

                        {/* Блок со скрытыми остановками */}
                        {stopsList?.Result.Routes[0]?.AllStops.length > 5 && (
                            <div>
                                <div className={`${!showAllStops ? style['hidden-stops'] : style['show-stops']}`}>
                                    {stopsList?.Result.Routes[0]?.AllStops.slice(2, -2).map((item: any) => (
                                        <div key={item.Name} className={`${style['path-description-list__item']} ${!showAllStops ? style.hidden : ''}`} itemScope itemType="http://schema.org/BusStop">
                                            <p className={style['path-description-list__city']} itemProp="name">
                                                {item.City}
                                            </p>
                                            <p className={style['path-description-list__street']} itemProp="address">
                                                {item.Name}
                                            </p>
                                            <meta itemProp='telephone' content='+7 499 350 80 16' />
                                        </div>
                                    ))}
                                </div>
                                {!showAllStops ? (
                                    <p className={style['path-description-list__stops']}>
                                        {stopsList?.Result.Routes[0]?.AllStops.length - 5}
                                        {getStopText(stopCountRouteStop)}
                                    </p>
                                )
                                    : null}

                            </div>
                        )}

                        {/* Последние два видимых элемента */}
                        {stopsList?.Result.Routes[0]?.AllStops.length > 2 && (
                            <>
                                {stopsList?.Result.Routes[0]?.AllStops.slice(-2).map((item: any) => (
                                    <div key={item.Name} className={style['path-description-list__item']} itemScope itemType="http://schema.org/BusStop">
                                        <p className={style['path-description-list__city']} itemProp="name">
                                            {item.City}
                                        </p>
                                        <p className={style['path-description-list__street']} itemProp="address">
                                            {item.Name}
                                        </p>
                                        <meta itemProp='telephone' content='+7 499 350 80 16' />
                                    </div>
                                ))}
                            </>
                        )}
                    </>
                )}
            </div>
            {stopsList?.Result.Routes[0]?.AllStops.length > 5 || stopsList?.Result?.Routes[0]?.AllStops.length > 5 || contentPage?.[5]?.['route-stops-station'].length > 5 ? (
                <button type='button' className={style['path-description-list__btn']} onClick={() => setShowAllStops(!showAllStops)}>
                    <ArrowRight className={`${style['path-description-list__icon']} ${showAllStops ? style['path-description-list__icon--active'] : ''}`} />
                    {showAllStops ? 'Скрыть остановки' : 'Все остановки'}
                </button>
            ) : (null)}
        </>


    );
};

export default AllStopsList;