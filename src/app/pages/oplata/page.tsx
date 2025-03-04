import style from './Payment.module.scss';

import Menu from '../../components/Header/Menu/Menu';

import RouteItem from '../../components/RouteItem/RouteItem';
import AfphaImg from '../../../../public/AlfaBank.png'

import Breadcrumbs from '../../components/UI/Breadcrumbs/Breadcrumbs';
import Link from 'next/link';
import Image from 'next/image';
import { routesSidebar } from '@/app/constant/constant';
import type { Metadata } from 'next'


const links = [
    { label: 'Главная', href: '/' },
    { label: 'Оплата', href: '/pages/oplata', active: true },
];

 
export const metadata: Metadata = {
    title: 'Способы оплаты и конфиденциальность платежей сайта intercars.ru',
    description: 'Правила оплаты и безопасность платежей, конфиденциальность информации сайта intercars.ru',
    openGraph: {
        title: 'Способы оплаты и конфиденциальность платежей сайта intercars.ru',
        description: 'Правила оплаты и безопасность платежей, конфиденциальность информации сайта intercars.ru',
        images: [
            {
                url: `https://intercars.ru/opengraph-image.png`,
            },
        ]
    }
}

const PaymentPage = () => {
    return (
        <>
            <Menu className='menu__theme--blue' />
            <section className={style.payment}>
                <div className='container'>
                    <div className={style['payment__wrapper']}>
                        <div className={style['payment__content']}>
                            <Breadcrumbs links={links} />
                            <h1 className={style['payment__title']}>
                                Способы оплаты
                            </h1>
                            <div className={style['payment-info']}>
                                <h2 className={style['payment-info__main-title']}>
                                    Способы оплаты и конфиденциальность платежей сайта
                                </h2>
                                <Image className={style['payment-info__img']} src={AfphaImg} width={342} height={109} alt='Alpha Bank' />
                                <p className={style['payment-info__text']}>
                                Оплата банковскими картами осуществляется через АО «АЛЬФА-БАНК».
                                </p>
                                <p className={style['payment-info__text']}>
                                К оплате принимаются карты VISA, MasterCard, МИР.
                                </p>
                                <p className={style['payment-info__text']}>
                                Услуга оплаты через интернет осуществляется в соответствии с Правилами международных платежных систем Visa, MasterCard и Платежной системы МИР на принципах соблюдения конфиденциальности и безопасности совершения платежа, для чего используются самые современные методы проверки, шифрования и передачи данных по закрытым каналам связи. Ввод данных банковской карты осуществляется на защищенной платежной странице АО «АЛЬФА-БАНК».
                                </p>
                                <p className={style['payment-info__text']}>
                                На странице для ввода данных банковской карты потребуется ввести данные банковской карты: номер карты, имя владельца карты, срок действия карты, трёхзначный код безопасности (CVV2 для VISA, CVC2 для MasterCard, Код Дополнительной Идентификации для МИР). Все необходимые данные пропечатаны на самой карте. Трёхзначный код безопасности — это три цифры, находящиеся на обратной стороне карты.
                                </p>
                                <p className={style['payment-info__text']}>
                                Далее вы будете перенаправлены на страницу Вашего банка для ввода кода безопасности, который придет к Вам в СМС. Если код безопасности к Вам не пришел, то следует обратиться в банк выдавший Вам карту.
                                </p>
                                <h3 className={style['payment-list-title']}>
                                    Случаи отказа в совершении платежа:
                                </h3>
                                <ul className={style['payment-list']}>
                                    <li className={style['payment-list__item']}>
                                    банковская карта не предназначена для совершения платежей через интернет, о чем можно узнать, обратившись в Ваш Банк;
                                    </li>
                                    <li className={style['payment-list__item']}>
                                    недостаточно средств для оплаты на банковской карте. Подробнее о наличии средств на банковской карте Вы можете узнать, обратившись в банк, выпустивший банковскую карту;
                                    </li>
                                    <li className={style['payment-list__item']}>
                                    данные банковской карты введены неверно;
                                    </li>
                                    <li className={style['payment-list__item']}>
                                    истек срок действия банковской карты. Срок действия карты, как правило, указан на лицевой стороне карты (это месяц и год, до которого действительна карта). Подробнее о сроке действия карты Вы можете узнать, обратившись в банк, выпустивший банковскую карту.
                                    </li>
                                </ul>

                                <p className={style['payment-info__text']}>
                                По вопросам оплаты с помощью банковской карты и иным вопросам, связанным с работой сайта, Вы можете обращаться по следующим телефонам: +7 499 704 55 95
                                </p>
                                <p className={style['payment-info__text']}>
                                    Условия возврата по билетам описаны в наших <Link href='/pages/agreement'>правилах</Link>.
                                </p>
                                <p className={style['payment-info__text']}>
                                Обращаем ваше внимание, что предоставляемая вами персональная информация (имя, адрес, телефон, e-mail, номер банковской карты) является конфиденциальной и не подлежит разглашению. Данные вашей кредитной карты передаются только в зашифрованном виде и не сохраняются на нашем Web-сервере.
                                </p>
                            </div>



                        </div>
                        <div className={style['payment__promo']}>
                            {routesSidebar.map((item) => (

                                <RouteItem key={item.id} data={item} className={`${style['payment-route__item']}`} />

                            ))}

                            {/* <ButtonRoutes to={{ pathname: '/404' }} title={'Другие популярные маршруты'} className={`${style['payment__more']}`} /> */}
                        </div>
                    </div>

                </div>
            </section>
        </>
    );
};

export default PaymentPage;