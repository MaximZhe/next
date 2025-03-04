

import style from './ContactPage.module.scss';


// import CustomBalloonLayout from '@/components/UI/CustomBalloonLayout/CustomBalloonLayout';

// import  MapCity  from '../../assets/icons/cityIcon.svg';
import Menu from '@/app/components/Header/Menu/Menu';
import PhoneContacts from '@/app/components/ContactsItemsLinks/PhoneContacts/PhoneContacts';
import EmailContacts from '@/app/components/ContactsItemsLinks/EmailContacts/EmailContacts';
import { routesSidebar, sliderRoutesInternational } from '@/app/constant/constant';
import RouteItem from '@/app/components/RouteItem/RouteItem';
import ButtonRoutes from '@/app/components/UI/Button/ButtonRoutes/ButtonRoutes';
import MapContact from '@/app/components/MapContact/MapContact';
import { Metadata } from 'next';

import Breadcrumbs from '@/app/components/UI/Breadcrumbs/Breadcrumbs';


export const metadata: Metadata = {
    title: 'Контакты',
    description: 'Контакты нашего офиса',
    openGraph: {
        title: 'Контакты',
        description: 'Контакты нашего офиса',
        images: [
            {
                url: `https://intercars.ru/opengraph-image.png`,
            },
        ]
    }
}
const links = [
    { label: 'Главная', href: '/' },
    { label: 'Контакты', href: '/pages/kontakts', active: true },
];
const ContactPage = () => {


    return (
        <>
            <Menu className='menu__theme--blue' />
            <section className={style.contacts}>
                <div className='container'>
                    <div className={style['contacts__wrapper']}>
                        <div className={style['contacts__content']}>
                            <Breadcrumbs links={links} />
                            <div className={style['contacts__container']}>
                                <h1 className={style['contacts__title']}>
                                    Контакты
                                </h1>
                                <div className={style['contacts-box']}>
                                    <h2 className={style['contacts-box__title-adress']}>
                                        Адрес
                                    </h2>
                                    <p className={style['contacts-box__text']}>
                                        125167, г. Москва, Пр-т Ленинградский, д. 37к3
                                    </p>
                                    <MapContact />
                                    <div className={style['contacts-box__wrapper']}>
                                        <ul className={style['contacts-box__list']}>
                                            <li className={style['contacts-box__item']}>
                                                <PhoneContacts className={`${style['contacts-box__phone']}`}
                                                    // eslint-disable-next-line react/no-children-prop
                                                    children={['+7 499 350 80 16', '+8 800 777 74 15']} />
                                            </li>
                                            <li className={style['contacts-box__item']}>
                                                <EmailContacts href={'mailto:direction@intercars.ru&body=Здравствуйте?subject=вопрос'}
                                                    // eslint-disable-next-line react/no-children-prop
                                                    className={'contacts-box__email'} children={'direction@intercars.ru'} />
                                            </li>
                                        </ul>
                                        <div className={style['contacts-box__company']}>
                                            ООО «БайерТранс» ОГРН 1037714005680 ИНН 7714294648 КПП 771401001
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={style['contacts__promo']}>
                            {routesSidebar.map((item) => (

                                <RouteItem key={item.id} data={item} className={`${style['contacts-route__item']}`} />

                            ))}
                            {/* <ButtonRoutes to={{ pathname: '/not-found', query: {slug:'Новости'} }} title={'Другие популярные маршруты'} className={`${style['contacts__more']}`} /> */}
                        </div>
                    </div>
                </div>
            </section>

        </>

    );
};

export default ContactPage;