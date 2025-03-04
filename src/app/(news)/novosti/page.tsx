
import style from './NewsPage.module.scss';
import { Suspense } from 'react';
import Breadcrumbs from '@/app/components/UI/Breadcrumbs/Breadcrumbs';
import Menu from '@/app/components/Header/Menu/Menu';
import { routesSidebar } from '@/app/constant/constant';
import RouteItem from '@/app/components/RouteItem/RouteItem';
import ButtonRoutes from '@/app/components/UI/Button/ButtonRoutes/ButtonRoutes';
import ButtonMorePage from '@/app/components/ButtonMorePage/ButtonMorePage';
import NewsAll from './NewsAll/NewsAll';
import Loading from './loading';


const links = [
    { label: 'Главная', href: '/' },
    { label: 'Новости', href: '/novosti', active: true },
];

const NewsPage = ({
    searchParams,
}: {
    searchParams?: {
        query?: string;
        page?: string;
    };
}) => {

    const query = searchParams?.query || '3';
    const currentPage = Number(searchParams?.page) || 1;
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
                            <Suspense key={query} fallback={<Loading />} >
                                <NewsAll query={query} />
                            </Suspense>
                            <ButtonMorePage />
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

export default NewsPage;