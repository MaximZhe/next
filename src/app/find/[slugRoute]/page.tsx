import React, { Suspense } from 'react';
import styles from './routeDescription.module.scss';
import dynamic from 'next/dynamic';

import { redirect } from 'next/navigation';
const Breadcrumbs = dynamic(() => import('@/app/components/UI/Breadcrumbs/Breadcrumbs'));
const SearchForm = dynamic(() => import('@/app/components/SearchForm/SearchForm'));
const Accordion = dynamic(() => import('@/app/components/HomePage/FAQ/FAQ'));
const Menu = dynamic(() => import('@/app/components/Header/Menu/Menu'));

const Reviews = dynamic(() => import('@/app/components/Reviews/Reviews'));
import { accordionItemsLeft, accordionItemsRight } from '@/app/constant/constant';

import { getRouteContent } from '@/app/api/actionGetRouteContent';

import { Metadata } from 'next';


import Loading from '@/app/loading';
import ButtonMoreRouteSeo from '@/app/components/ButtonMorePage/ButtonMoreRouteSeo/ButtonMoreRouteSeo';
import ContentSeoRoute from '@/app/components/ContentSeoRoute/ContentSeoRoute';
import { splitCityName } from '@/app/utils/splitCityNameSearch';
import RoutesAll from './RoutesAll/RoutesAll';

import { configSeoPage } from '@/app/config/configSchema';
import JsonLd from '@/app/components/Schema/Schema';

import { parseDatas } from "@/app/utils/parserContentSeoPageNew";
import ContentSeoRouteNew from "@/app/components/ContentSeoRoute/ContentSeoRouteNew";
import { IResultObject } from '@/app/types/types';

const splitParamsText = (text: string) => {
    const arr = text.split('-');
    return arr
}

const url = process.env.NEXT_PUBLIC_APY_URL
const fetchContent = async (cityDepart: number, cityArraval: number) => {
    try {
        const datas = {
            CityDeparture: cityDepart,
            CityArrival: cityArraval,
            SiteVersionId: 2,
            Lang: "RUS"
        }
        const response = await fetch(`${url}/api/v1/content/get`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datas),
            cache: 'no-store'
        })

        return response.json()
    }
    catch (error) {
        console.log(error)
    }
}
const redirectRoute = async (slugRoute: string) => {
    const slugArray = slugRoute.split('_');
    const newSlugRoute = `${slugArray[0]}-${slugArray[1]}`

    redirect(`/find/${newSlugRoute}`)
}
interface IParamsContent {
    slugRoute: string;
}


export async function generateMetadata(
    { params, searchParams }: any
): Promise<Metadata> {
    const querysss = searchParams?.query
    const schedules = searchParams?.schedules
    const nameCityRoutes = splitParamsText(params.slugRoute);
    const resultArrayCityss = await getRouteContent(nameCityRoutes[0], nameCityRoutes[1]);
    const contentMetaSeo = await fetchContent(resultArrayCityss?.cityIdDeparture, resultArrayCityss?.cityIdArrival);

    return {
        title: contentMetaSeo?.Result.Page?.MetaTitle,
        description: contentMetaSeo?.Result.Page?.MetaDescription,
        keywords: contentMetaSeo?.Result?.Page?.MetaKeywords,
        openGraph: {
            title: contentMetaSeo?.Result?.Page?.MetaTitle,
            description: contentMetaSeo?.Result?.Page?.MetaDescription,
            type: 'website',
            url : `https://intercars.ru/find/${nameCityRoutes[0]}-${nameCityRoutes[1]}`,
            images: [
                {
                    url: `https://intercars.ru/opengraph-image.png`,
                },
            ]
        },
        alternates: {
            canonical: `/find/${nameCityRoutes[0]}-${nameCityRoutes[1]}`,
        },
        robots: {
            index: nameCityRoutes.length > 2 || querysss > 0 || schedules > 0 ? false : true,
            follow: querysss > 0 || schedules > 0 ? false : true,
        }
    }
}


const RouteDescriptionPage = async ({ params, searchParams}: {
    params: IParamsContent, searchParams?: {
        query?: string;
        page?: string;
        schedules?:string;
    }
}) => {
    const links = [
        { label: 'Главная', href: '/' },
        { label: 'Маршрут', href: `/find/${params.slugRoute}`, active: true },
    ];

    if (params.slugRoute.includes('_')) {
        // Вызываем функцию redirectRoute
        await redirectRoute(params.slugRoute);
        return null; // Возвращаем null, чтобы прервать выполнение компонента
    }
    
    const querys = searchParams?.query || '3';
    const schedules = searchParams?.schedules || '20';
    const currentPage = Number(searchParams?.page) || 1;
    const nameCityRoute = splitParamsText(params.slugRoute);
    const resultArrayCitys = await getRouteContent(nameCityRoute[0], nameCityRoute[1]);
    const resultContent = await fetchContent(resultArrayCitys?.cityIdDeparture, resultArrayCitys?.cityIdArrival);
    const reviesData = {
        idDeparture: resultArrayCitys?.cityIdDeparture,
        idArrival: resultArrayCitys?.cityIdArrival,
        questionsData: resultContent?.Result?.Questions,

    }

    const resultsContentPage = parseDatas(resultContent?.Result?.Page?.Html);
    const fullHtml = resultContent?.Result?.Page?.Html;

    const cityDepartTitle = splitCityName(resultArrayCitys?.cityDepartNameSeo)
    const cityArravalTitle = splitCityName(resultArrayCitys?.cityArravalNameSeo)
	
	const stringPrice = resultsContentPage[1]['info-route-subtitle']?.[2]?.['info-route__subtitle'];
    const numberPrice = stringPrice ? parseInt(stringPrice.replace(/[^0-9]/g, ''), 10) : 0;
    const stringDistance = resultsContentPage[1]['info-route-subtitle']?.[0]?.['info-route__subtitle'];
    const numberDistance = stringDistance ? parseInt(stringDistance.replace(/[^0-9]/g, ''), 10) : 0;
  
    const schemaSeo = {
        cityDeparture: resultsContentPage[5]['route-stops-station']?.[0]?.['route-stops__station'],
        cityArrival: resultsContentPage[5]['route-stops-station']?.[resultsContentPage[5]?.['route-stops-station'].length - 1]?.['route-stops__station'],
        routesUrl:`https://intercars.ru/find/${resultsContentPage[5]['route-stops-station']?.[0]?.['route-stops__station']}-${resultsContentPage[5]['route-stops-station']?.[resultsContentPage[5]['route-stops-station'].length - 1]?.['route-stops__station']}`,
        routesStopsCity: {
          cityDeparture: resultsContentPage[5]['route-stops-station']?.[0]?.['route-stops__station'],
          cityArrival: resultsContentPage[5]['route-stops-station']?.[resultsContentPage[5]['route-stops-station'].length - 1]?.['route-stops__station']
        },
        routesStopsStation:{
          cityDeparture:resultsContentPage[6]['route-stops-desc']?.[0]?.['route-stops__desc'],
          cityArrival: resultsContentPage[6]['route-stops-desc']?.[resultsContentPage[6]['route-stops-desc'].length - 1]?.['route-stops__desc']
        },
        routesLength: numberDistance,
        routesPrice:numberPrice,
        ratingValue:resultContent?.Result.Page?.RatingValue,
        reviewCount:resultContent?.Result.Page?.ReviewCount,
      }
    const jsonLd = configSeoPage(schemaSeo)
	
    return (
        <>
            <Menu responsive={true} />
            <section className={styles.path}>
                <div className='container'>
                    <div className={styles.path__wrapper}>
                        <div className={styles.path__nav}>
                            <Breadcrumbs links={links} /> <Menu responsive={false} className={styles['path__menu']} backgroundWapper={styles['path__nav-wrapper']}/>
                        </div>
                        <Suspense>
                            <div className={styles['path__content']}>
                                <h1 className={styles['path__title']}>
                                    {resultContent.Result.Page?.H1Title ? resultContent.Result.Page?.H1Title : `Билеты на автобус ${cityDepartTitle[0]} — ${cityArravalTitle[0]}`}
                                </h1>
                                <SearchForm className={styles.path__form} citySeoRoute={resultArrayCitys} />
                            </div>
                        </Suspense>
                        <div className={styles['path__routes']}>
                            <Suspense fallback={<Loading />}>
                                {resultContent?.Result?.Routes !== null && resultContent?.Result?.Routes.length > 0 ? (
                                    <>
                                        <RoutesAll query={querys} datas={resultContent?.Result?.Routes} />
                                        <ButtonMoreRouteSeo lengthRoute={resultContent?.Result?.Routes.length} />
                                    </>
                                ) : (null)

                                }
                            </Suspense>

                        </div>
                        <Suspense fallback={<Loading />}>
                            {resultsContentPage !== null && resultsContentPage !== undefined ? (
                                <ContentSeoRouteNew resultsContentPage={resultsContentPage} resultArrayCitys={resultArrayCitys} resultContent={resultContent} schedules={schedules}/>
                            ) : null}
                            {resultsContentPage[0]['route-title'][0] === undefined && resultContent?.Result?.Page !== null ? <div dangerouslySetInnerHTML={{ __html: fullHtml }} /> : null}
                            {resultContent?.Result?.Page === null ? <div style={{ textAlign: 'center', fontSize: '30px' }}> Описание маршрута в разработке </div> : null}
                        </Suspense>
                        <div className={styles['path__box']}>
                            <Accordion className={[`${styles.path__accordion}`, `${styles.path__arrow}`]}
                                itemsLeft={accordionItemsLeft}
                                itemsRight={accordionItemsRight} />
                        </div>
                    </div>
                </div>
                <div className={styles['path__box']}>
                    <Reviews reviesData={reviesData} />
                </div>
            </section>
            {resultsContentPage[5]['route-stops-station']?.[0]?.['route-stops__station'] !== undefined ?
            <JsonLd data={jsonLd} /> : null}
        </>

    );
};

export default RouteDescriptionPage;