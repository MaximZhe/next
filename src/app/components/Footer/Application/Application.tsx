
import Link from 'next/link';
import style from './Application.module.scss'
const Application = () => {
    return (
        <div className={style.applications}>
            <div className={style['applications__container']}>
                <div className={style['applications__wrapper']}>
                    <p className={style['applications__title']}>
                        Путешествовать удобнее
                        с приложением <span>Intercars</span>
                    </p>
                </div>
                <div 
                 className={style['applications__img']} ></div>
                <div className={style['applications-links']}>
                    <Link href='https://apps.apple.com/by/app/intercars-билеты-на-автобус/id1525584784' className={style['applications-links__item']}
                    aria-label="Скачать приложение Intercars с App Store"></Link>
                    <Link href='https://play.google.com/store/apps/details?id=org.nativescript.Intercars&pcampaignid=web_share' className={style['applications-links__item']}
                    aria-label="Скачать приложение Intercars с Google Play"></Link>
                </div>
            </div>
        </div>
    );
};

export default Application;