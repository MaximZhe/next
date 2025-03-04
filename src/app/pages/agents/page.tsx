import style from './Cooperation.module.scss';

import Menu from '../../components/Header/Menu/Menu';
import { routesSidebar } from '../../constant/constant';
import RouteItem from '../../components/RouteItem/RouteItem';
import ButtonRoutes from '../../components/UI/Button/ButtonRoutes/ButtonRoutes';


import Breadcrumbs from '../../components/UI/Breadcrumbs/Breadcrumbs';
import { Metadata } from 'next/types';


const links = [
    { label: 'Главная', href: '/' },
    { label: 'Сотрудничество', href: '/pages/agents', active: true },
];
export const metadata: Metadata = {
    title: 'Агентам, перевозчикам, агрегаторам - сотрудничество по размещению рейсов в продажу на intercars.ru',
    description: 'Компания ООО "БайерТранс" открыта для сотрудничества в области пассажирских перевозок и размещения рейсов в продажу от других ведущих транспортных компаний',
    openGraph: {
        title: 'Агентам, перевозчикам, агрегаторам - сотрудничество по размещению рейсов в продажу на intercars.ru',
        description: 'Компания ООО "БайерТранс" открыта для сотрудничества в области пассажирских перевозок и размещения рейсов в продажу от других ведущих транспортных компаний',
        images: [
            {
                url: `https://intercars.ru/opengraph-image.png`,
            },
        ]
    }
}
const CooperationPage = () => {

    return (
        <>
            <Menu className='menu__theme--blue' />
            <section className={style.сooperation}>
                <div className='container'>
                    <div className={style['сooperation__wrapper']}>
                        <div className={style['сooperation__content']}>
                            <Breadcrumbs links={links} />
                            <h1 className={style['сooperation__title']}>
                                Сотрудничество
                            </h1>
                            <div className={style['cooperation-info']}>
                                <h2 className={style['cooperation-info__main-title']}>
                                    Агентам
                                </h2>
                                <p className={style['cooperation-info__text']}>
                                    Приглашаем к сотрудничеству Агентов, автовокзалы, кассы, агрегаторы по продаже билетов на автобусы!
                                    Транспортная компания ООО &quot;БайерТранс&quot; будет рада видет вас в лице надежного партнера.
                                </p>
                                <p className={style['cooperation-info__text']}>
                                    Отправить запрос на подключение и запросить Агентский договор можно по почте <a href='mailto:direction@intercars.ru&body=Здравствуйте' className='rules-list-item__link'>direction@intercars.ru</a>.
                                </p>
                            </div>



                        </div>
                        <div className={style['сooperation__promo']}>
                            {routesSidebar.map((item) => (

                                <RouteItem key={item.id} data={item} className={`${style['сooperation-route__item']}`} />

                            ))}
                            {/* <ButtonRoutes to={{ pathname: '/404' }} title={'Другие популярные маршруты'} className={`${style['сooperation__more']}`} /> */}
                        </div>
                    </div>

                </div>
            </section>
        </>
    );
};

export default CooperationPage;