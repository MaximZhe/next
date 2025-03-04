import style from './Manual.module.scss';

import Menu from '../components/Header/Menu/Menu';

import RouteItem from '../components/RouteItem/RouteItem';
import ButtonRoutes from '../components/UI/Button/ButtonRoutes/ButtonRoutes';


import Breadcrumbs from '../components/UI/Breadcrumbs/Breadcrumbs';

import Image from 'next/image';
import { routesSidebar } from '@/app/constant/constant';
import { Metadata } from 'next/types';


const links = [
    { label: 'Главная', href: '/' },
    { label: ' Инструкция - как купить билет на автобус', href: '/manualPay', active: true },
];


  export const metadata: Metadata = {
    title: 'Инструкция - как купить билет на автобус',
    description: 'Приобретение билета на автобус стало невероятно простым и удобным благодаря нашему онлайн-сервису на сайте intercars.ru.',
    openGraph: {
        title: 'Инструкция - как купить билет на автобус',
        description:'Приобретение билета на автобус стало невероятно простым и удобным благодаря нашему онлайн-сервису на сайте intercars.ru.',
        images: [
            {
                url: `https://intercars.ru/opengraph-image.png`,
            },
        ]
    }
}
const ManualPay = () => {
    return (
        <>
            <Menu className='menu__theme--blue' />
            <section className={style.manual}>
                <div className='container'>
                    <div className={style['manual__wrapper']}>
                        <div className={style['manual__content']}>
                            <Breadcrumbs links={links} />
                            <h1 className={style['manual__title']}>
                                Инструкция - как купить билет на автобус
                            </h1>
                            <div className={style['manual-info']}>
                                <h2 className={style['manual-info__main-title']}>
                                    Уважаемые клиенты!
                                </h2>
                                <h3 className={style['manual-info__main-subtitle']}>Приобретение билета на автобус стало невероятно простым и удобным благодаря нашему онлайн-сервису на сайте intercars.ru. Теперь вы можете забронировать свой билет в любое время суток, и мы расскажем вам, как это сделать.</h3>
                                <p className={style['manual-info__text']}>
                                    Первым шагом перейдите на главную страницу нашего сайта и укажите город отправления и прибытия, а также дату вашей поездки. Наша мощная поисковая система мгновенно предоставит вам список актуальных рейсов с доступными местами.
                                </p>
                                <Image className={style['manual-info__img']} src={'/screenSearch.webp'} width={554} height={50} alt='фото поиска' />
                                <p className={style['manual-info__text']}>
                                    Выберите удобное время отправления и прибытия, а также можете ознакомиться с подробной информацией о маршруте и остановках во вкладке "подробнее". Справа на странице будет указан перевозчик, и вы сможете ознакомиться с правилами перевозки пассажиров, включая информацию о перевозке животных.
                                </p>
                                <Image className={style['manual-info__img']} src={'/screenTickets.webp'} width={554} height={295} alt='фото карточки рейса' />
                                <p className={style['manual-info__text']}>
                                    Продолжая покупку, заполните данные пассажиров. Для каждого пассажира укажите ФИО, дату рождения и паспортные данные. Если у вас есть право на льготный тариф, наша система автоматически пересчитает стоимость билета. Укажите также тип и номер документа.
                                </p>
                                <Image className={style['manual-info__img']} src={'/screenForm.webp'} width={554} height={202} alt='фото формы бронирования' />
                                <p className={style['manual-info__text']}>
                                    Основной багаж бесплатно отправится в багажное отделение, но дополнительный багаж следует указать на этой стадии, обратите внимание, что правила перевозки багажа могут различаться у разных перевозчиков.
                                </p>
                                <Image className={style['manual-info__img']} src={'/screenBuggage.webp'} width={554} height={89} alt='фото дополнительного багажа' />
                                <p className={style['manual-info__text']}>
                                    Введите адрес электронной почты, на который мы отправим ваш билет, так же не забудьте указать ваш контактный телефон для связи. На большинстве маршрутов у вас будет возможность выбрать место в автобусе. Не забудьте ознакомиться с правилами перед продолжением.
                                </p>
                                <Image className={style['manual-info__img']} src={'/screenBus.webp'} width={554} height={273} alt='фото обязательных контактов' />
                                <p className={style['manual-info__text']}>
                                    И, наконец, перейдите к оплате. После нажатия на кнопку оплаты, вас перенаправит на страницу платежной системы, где вы сможете завершить процесс, введя необходимые реквизиты для оплаты.
                                </p>
                                <p className={style['manual-info__text']}>
                                    Таким образом, приобрести билет на автобус стало легким и быстрым процессом благодаря нашему удобному онлайн-сервису на сайте intercars.ru. Мы ценим ваш выбор и готовы предоставить вам лучший сервис для вашего комфортного путешествия!
                                </p>
                            </div>
                        </div>
                        <div className={style['manual__promo']}>
                            {routesSidebar.map((item) => (

                                <RouteItem key={item.id} data={item} className={`${style['manual-route__item']}`} />

                            ))}

                            {/* <ButtonRoutes to={{ pathname: '/404' }} title={'Другие популярные маршруты'} className={`${style['manual__more']}`} /> */}
                        </div>
                    </div>

                </div>
            </section>
        </>
    );
};

export default ManualPay;