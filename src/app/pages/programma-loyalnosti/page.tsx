import style from './Bonuses.module.scss';

import Menu from '../../components/Header/Menu/Menu';
import { routesSidebar } from '../../constant/constant';
import RouteItem from '../../components/RouteItem/RouteItem';
import ButtonRoutes from '../../components/UI/Button/ButtonRoutes/ButtonRoutes';


import Breadcrumbs from '../../components/UI/Breadcrumbs/Breadcrumbs';
import Link from 'next/link';
import type { Metadata } from 'next';


const links = [
    { label: 'Главная', href: '/' },
    { label: 'Программа лояльности', href: '/pages/programma-loyalnosti', active: true },
];


export const metadata: Metadata = {
    title: 'Программа лояльности',
    description: 'Условия программы лояльности',
    openGraph: {
        title: 'Программа лояльности',
        description: 'Условия программы лояльности',
        images: [
            {
                url: `https://intercars.ru/opengraph-image.png`,
            },
        ]
    }
}
const BonusesPage = () => {

    return (
        <>
            <Menu className='menu__theme--blue' />
            <section className={style.bonuses}>
                <div className='container'>
                    <div className={style['bonuses__wrapper']}>
                        <div className={style['bonuses__content']}>
                            <Breadcrumbs links={links} />
                            <h1 className={style['bonuses__title']}>
                                Программа лояльности в приложении
                            </h1>
                            <div className={style['bonuses-info']}>
                                <p className={style['bonuses-info__subtitle']}>Для постоянных клиентов компании была разработана Бонусная программа.</p>
                                <div className={style['bonuses-info__important']}>
                                    <p className={style['bonuses-info__text']}>
                                        Принять участие в программе лояльности для постоянных клиентов можно только при приобретении билетов перевозчиков ИП/ООО «БайерТранс»
                                        в мобильном приложении:
                                        (<Link href='https://play.google.com/store/apps/details?id=org.nativescript.Intercars&referrer=utm_source%3Dintercarsrur%26utm_medium%3Dpravila%26utm_campaign%3Dssylka-v-pravilah%26anid%3Dadmob' target='__blank'>Android</Link>,
                                        <Link href='https://apps.apple.com/by/app/intercars-билеты-на-автобус/id1525584784' target='__blank'>IOS</Link>) и приобретая билеты на рейсы перевозчика  ИП  «Киров».
                                    </p>
                                </div>

                                <h3 className={style['bonuses-list-title']}>
                                    Участие в программе лояльности даёт право на:
                                </h3>
                                <ul className={style['bonuses-list']}>
                                    <li className={style['bonuses-list__item']}>
                                        В приложении вы можете приобрести любой билет на рейсы перевозчиков ИП/ООО «БайерТранс», ИП «Киров» с скидкой 10%, после того, как приобрели первый билет в приложении по полной стоимости.
                                    </li>
                                    <li className={style['bonuses-list__item']}>
                                        Каждая 7-я поездка, оформленная в приложении будет бесплатной. Скидка программы лояльности не суммируется с другими скидками, акциями и льготными тарифами.
                                    </li>
                                    <li className={style['bonuses-list__item']}>
                                        Данная скидка не применяется при покупке билетов с датой отправления в дни государственных праздников и праздничных дней, установленных и объявленных Президентом Российской Федерации нерабочими.
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className={style['bonuses__promo']}>
                            {routesSidebar.map((item) => (

                                <RouteItem key={item.id} data={item} className={`${style['bonuses-route__item']}`} />

                            ))}
                            {/* <ButtonRoutes to={{ pathname: '/404' }} title={'Другие популярные маршруты'} className={`${style['bonuses__more']}`} /> */}
                        </div>
                    </div>

                </div>
            </section>
        </>
    );
};

export default BonusesPage;