import WalletIcon from '../../../icons/image/wallet-icon.svg';
import TicketIcon from '../../../icons/image/ticket-icon.svg';
import RoadIcon from '../../../icons/image/road-icon-blue.svg';
import ComfortIcon from '../../../icons/image/comfort-icon.svg';
import style from './Advantages.module.scss';
import Image from 'next/image';

const Advantages = () => {
    return (
        <section className={style.advantages}>
            <div className='container'>
                <div className={style['advantages__wrapper']}>
                    <div className={style['advantages__item']}>
                        <Image src={WalletIcon} width={40} height={40} alt='' />
                        <h3 className={style['advantages__title']}>
                            Самые низкие цены
                        </h3>
                        <p className={style['advantages__text']}>
                            Куда бы вы ни отправлялись, вы сможете найти
                            автобусные билет по самой низкой цене. Выбирайте
                            среди
                            тысяч направлений и рейсов, и вы найдете идеальный
                            вариант!
                        </p>
                    </div>
                    <div className={style['advantages__item']}>
                        <Image src={TicketIcon} width={40} height={40} alt='' />
                        <h3 className={style['advantages__title']}>
                            Без касс и очередей
                        </h3>
                        <p className={style['advantages__text']}>
                            Не потребуется тратить время на стояние в очередях.
                            Оформить сделку можно в любое время.
                            Воспользуйтесь удобным функционалом,
                            представленным на сайте.
                        </p>
                    </div>
                    <div className={style['advantages__item']}>
                        <Image src={RoadIcon} width={40} height={40} alt='' />
                        <h3 className={style['advantages__title']}>
                            Быстрые маршруты
                        </h3>
                        <p className={style['advantages__text']}>
                            При покупке билета выбирайте быстрые маршруты.
                            Добирайтесь в нужные места в определенные сроки и
                            экономьте время.
                            Это самый важный ресурс в наше время.
                        </p>
                    </div>
                    <div className={style['advantages__item']}>
                        <Image src={ComfortIcon} width={40} height={40} alt='' />
                        <h3 className={style['advantages__title']}>
                            Комфорт на протяжении всей поездки
                        </h3>
                        <p className={style['advantages__text']}>
                            Транспортные компании обеспечивают высокий уровень
                            комфорта в течение всей поездки.
                            Используется современный транспорт
                            с удобными сидениями.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Advantages;