
import Image from 'next/image';
import Menu from '../../components/Header/Menu/Menu';
import { listImagesRoutes } from '../../constant/imagesRoute';
import style from './SingleSalesPage.module.scss';
import styles from '../SalesPage.module.scss'
import { salesSingleListInfo, sliderRoutesInternational } from '../../constant/constant';
import RouteItem from '../../components/RouteItem/RouteItem';
import ButtonRoutes from '../../components/UI/Button/ButtonRoutes/ButtonRoutes';
import { FC, Suspense } from 'react';
import Breadcrumbs from '@/app/components/UI/Breadcrumbs/Breadcrumbs';
import { Metadata } from 'next';
import { getFetchActionItem } from '@/app/api/actionGetActionItem';

import { parserActionData } from '@/app/utils/parserActionData';
import Link from 'next/link';
import { generateStaticParamsAction } from '@/app/api/getUrlAction';
import Loading from '../ActionAll/loading';
import { notFound } from 'next/navigation';
// import { useParams } from 'react-router-dom';

interface ISingleSalesProps {
    params: {
        slug: string,

    }

}

async function fetchActionItem(id: string) {
    const res = await getFetchActionItem(id);
    const data = res.Result
    return data
}

const splitKeywords = (keywordsAction: any) => {
    return keywordsAction.split(',');
}

export async function generateMetadata(
    { params }: ISingleSalesProps
): Promise<Metadata> {
    const resultParams = await generateStaticParamsAction()

    function findIdByNiceUrl(resultArray: any[], params: any) {
        const niceUrl = params.slug;
        const foundObject = resultArray.find((item) => item.params.slug === niceUrl);
        if (foundObject) {
            return foundObject.params.id;
        } else {
            return foundObject;
        }
    }
    const id = findIdByNiceUrl(resultParams, params);
    const action = await fetchActionItem(id)
    const keywordsAction = action;
   
    return {
        title: action.SeoTitle,
        description: action.SeoDescription,
        keywords: keywordsAction.SeoKeyword ? splitKeywords(keywordsAction.SeoKeyword) : '',
        openGraph: {
            title: action.SeoTitle,
            description: action.SeoDescription,
            images: [
                {
                    url: `https://intercars.ru/opengraph-image.png`,
                },
            ],
        },

    }
}
const SingleSalesPage: FC<ISingleSalesProps> = async ({ params }) => {

    const resultParamsAction = await generateStaticParamsAction()

    function findIdByNiceUrl(resultArray: any[], params: any) {
        const slug = params.slug;
        const foundObject = resultArray.find((item) => item.params.slug === slug);
        if (foundObject) {
            return foundObject.params.id;
        } else {
            return foundObject;
        }
    }
    const id = findIdByNiceUrl(resultParamsAction, params);
    const resultsActionItem = await fetchActionItem(id)
    const resultsContentPage = parserActionData(resultsActionItem.Content);
    const fullHtml = resultsActionItem.Content;


    const targetPhrase = resultsContentPage[2] &&
        resultsContentPage[2]['sales-single-value'] &&
        resultsContentPage[2]['sales-single-value'][0] &&
        resultsContentPage[2]['sales-single-value'][0]['sales-single__value']
        ? resultsContentPage[2]['sales-single-value'][0]['sales-single__value']
        : null;
    const targetPromoCode = resultsContentPage[7] &&
        resultsContentPage[7]['sales-single-promo-name'] &&
        resultsContentPage[7]['sales-single-promo-name'][0] &&
        resultsContentPage[7]['sales-single-promo-name'][0]['sales-single-promo__name']
        ? resultsContentPage[7]['sales-single-promo-name'][0]['sales-single-promo__name']
        : null;

    const links = [
        { label: 'Главная', href: '/' },
        { label: 'Акции', href: '/akcii' },
        { label: resultsActionItem.Name, active: true }
    ];

    return (
        <>
            <Menu className='menu__theme--blue' />
            <section className={style['sales-single']}>
                <div className='container'>
                    <div className={style['sales-single__wrapper']}>
                        <div className={style['sales-single__content']}>
                            <Breadcrumbs links={links} />
                            <Suspense fallback={<Loading />}>
                                {resultsContentPage !== null && resultsContentPage !== undefined && resultsContentPage[0]['sales-single-main'][0] && resultsContentPage[2]['sales-single-value'][0] ? (
                                    <>
                                        <div className={style['sales-single__item']}>
                                            <p className={style['sales-single__subject']}>
                                                Акция
                                            </p>
                                            <h1 className={style['sales-single__main-title']}>
                                                {resultsContentPage[0]['sales-single-main'][0]['sales-single__main-title']}
                                            </h1>

                                            {resultsContentPage[11]['sales-single-img'][0]['imgSrc'] !== ' ' &&
                                                resultsContentPage[11]['sales-single-img'][0]['imgSrc'] !== 'путь картинки'
                                                ? <Image src={resultsContentPage[11]['sales-single-img'][0]['imgSrc']}
                                                    className={style['sales-single__img']}
                                                    alt={resultsContentPage[11]['sales-single-img'][0]['imgAlt']}
                                                    width={400}
                                                    height={300} />
                                                : null}

                                            {resultsContentPage[1]['sales-single-text'].map((item: any, index: number) => (
                                                <p key={index} className={style['sales-single__text']}>
                                                    {item['sales-single__text'].split(targetPhrase).map((part: any, i: number) => (
                                                        i === 0 ? part : (
                                                            <>
                                                                <span className={style['sales-single__value']}>{targetPhrase}</span>
                                                                {part}
                                                            </>
                                                        )
                                                    ))}
                                                </p>
                                            ))}

                                            <h2 className={style['sales-single__title-list']}>
                                                Рейсы, участвующие в акции:
                                            </h2>
                                            <ul className={style['sales-single-list']}>
                                                {resultsContentPage[4]['sales-single-list-item'].map((item: any, index: number) => (
                                                    <li key={index} className={style['sales-single-list__item']}>
                                                        {item['sales-single-list__item']}
                                                    </li>
                                                ))}

                                            </ul>
                                            {resultsContentPage[5]['sales-single-company'].map((item: any, index: number) => (
                                                <p key={index} className={style['sales-single__company']}>
                                                    {item['sales-single__company']}
                                                </p>
                                            ))}

                                            <div className={style['sales-single-promo']}>
                                                <h3 className={style['sales-single-promo__title']}>
                                                    {resultsContentPage[6]['sales-single-promo-title'][0]['sales-single-promo__title'].split(targetPromoCode).map((part: any, i: number) => (
                                                        i === 0 ? part : (
                                                            <>
                                                                <span className={style['sales-single-promo__name']}>{targetPromoCode}</span>
                                                                {part}
                                                            </>
                                                        )
                                                    ))}
                                                </h3>
                                                <ul className={style['sales-single-promo__list']}>
                                                    {resultsContentPage[8]['sales-single-promo-item'].map((item: any, index: number) => (
                                                        <li key={index} className={style['sales-single-promo__item']}>
                                                            {item['sales-single-promo__item']}
                                                        </li>
                                                    ))}
                                                </ul>

                                            </div>
                                            {resultsContentPage[9]['sales-single-info'].map((item: any, index: number) => (
                                                <p key={index} className={style['sales-single__info']}>
                                                    {item['sales-single__info']}
                                                </p>
                                            ))}
                                            <h3 className={style['sales-single__title-list']}>
                                                Условия акции и других спецпредложений:
                                            </h3>
                                            <ul className={style['sales-single-list-info']}>
                                                {salesSingleListInfo.map((item, index) => (
                                                    <li key={index} className={style['sales-single-list-info__item']}>
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <Link href={`/find/${resultsActionItem.ActionUrl}`} className={style['sales-single__btn']}>
                                            Перейти к поиску билета
                                        </Link>
                                    </>
                                ) : null}
                                {resultsContentPage[2]['sales-single-value'][0] === undefined && resultsActionItem.Content !== null ? <div dangerouslySetInnerHTML={{ __html: fullHtml }} /> : null}
                               
                            </Suspense>

                        </div>
                        <div className={style['sales-single__promo']}>
                            {sliderRoutesInternational.slice(0, 2).map((item) => (
                                <RouteItem key={item.id} data={item} className={`${styles['sales-route__item']}`} />
                            ))}
                            {/* <ButtonRoutes to={{ pathname: '/' }} title={'Другие популярные маршруты'} className={`${style['sales__more']}`} /> */}
                        </div>
                    </div>

                </div>
            </section>
        </>
    );
};

export default SingleSalesPage;