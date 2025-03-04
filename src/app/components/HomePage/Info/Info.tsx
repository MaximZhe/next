import Image from 'next/image';
import BusImage from '../../../icons/image/Bus.webp';

import style from './Info.module.scss';
import Link from 'next/link';

const Info = () => {
    return (
        <section className={style.info}>
            <div className='container'>
                <div className={style['info__wrapper']}>
                    <Image src={BusImage} width={626} height={348} alt=''
                        className={style['info__img']} />
                    <div className={style['info__content']}>
                        <h2 className={style['info__title']}>
                            Путешествуйте с Intercars
                        </h2>
                        <p className={style['info__text']}>
                            Здесь вы можете купить билет на 
                            автобус, который довезет вас до 
                            нужного места. Делайте покупки 
                            по низким ценам.
                        </p>
                        <p className={style['info__text']}>
                            На сайте представлены тысячи 
                            маршрутов, периодически 
                            появляются уникальные предложения. Бронируйте места в автобусах и выкупайте их по низкой цене.
                        </p>
                        <Link href='#search-form' className={style['info__link']}>
                            Забронировать билет на автобус
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Info;