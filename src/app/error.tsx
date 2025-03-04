
'use client'


import style from './page404/ErrorPage.module.scss'
import Menu from './components/Header/Menu/Menu';
import ErrorText from './icons/svg/ErrorText';
import Link from 'next/link';


const ErrorBoundary = ({
    error,
  }: {
    error: Error & { digest?: string }
  }) => {

    return (
        <>
            <Menu className={'menu_theme_blue'} />
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
                        <Link href={'/'} className={style['error-page__btn']}>Начать сначала</Link>
                    </div>
                </div>
            </section>
        </>

    );
};

export default ErrorBoundary;