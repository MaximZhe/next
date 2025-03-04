
import style from './SalesPage.module.scss';
import { Suspense } from 'react';
import Menu from '../components/Header/Menu/Menu';
import { routesSidebar} from '../constant/constant';
import RouteItem from '../components/RouteItem/RouteItem';
import ButtonRoutes from '../components/UI/Button/ButtonRoutes/ButtonRoutes';
import Breadcrumbs from '../components/UI/Breadcrumbs/Breadcrumbs';
import ActionAll from './ActionAll/ActionAll';
import ButtonMoreAction from '../components/ButtonMorePage/ButtonMoreAction/ButtonMoreAction';
import Loading from '../loading';


const links = [
    { label: 'Главная', href: '/' },
    { label: 'Акции', href: '/akcii', active: true },
];

const transferRoutes = () => {

}
const SalesPage = ({
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
            <section className={style.sales}>
                <div className='container'>
                    <div className={style['sales__wrapper']}>
                        <div className={style['sales__content']}>
                            <Breadcrumbs links={links} />
                            <h1 className={style['sales__title']}>
                                Выгодные предложения Intercars
                            </h1>
                            <Suspense key={query} fallback={<Loading />} >
                                <ActionAll query={query} />
                            </Suspense>
                            <ButtonMoreAction />
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

export default SalesPage;