import Link from 'next/link';

import style from './page404/ErrorPage.module.scss'
import ErrorText from './icons/svg/ErrorText';
import Menu from './components/Header/Menu/Menu';


const NotFound = () => {
    return (
        <>
            <Menu className='menu__theme--blue' />
            <section className={style['error-page']}>
                <div className='container'>
                    <div className={style['error-page__content']}>
                        <div className={style['error-page__title']}>
                            <ErrorText className={style['error-page__title-icon']} />
                        </div>
                        <h2 className={style['error-page__subtitle']}>
                            К сожалению, страница не найдена
                        </h2>
                        <p className={style['error-page__info']}>
                            Эта страница была удалена, или вовсе не существовала на сайте.
                        </p>
                        <Link href={'/'} className={style['error-page__btn']}>
                            Начать сначала
                        </Link>
                    </div>
                </div>
            </section>
        </>

    );
};

export default NotFound;