import logo from '../../icons/image/Logo.svg'


import style from './Header.module.scss'
import LanguagePanel from './LanguagePanel/LanguagePanel';


import Image from 'next/image';
import UserIcon from '@/app/icons/svg/UserIcon';
import Link from 'next/link';
import SupportIcon from '@/app/icons/svg/SupportIcon';
import HumburgerMenu from '../UI/HumburgerMenu/HumburgerMenu';
import ButtonSing from './ButtonSing/ButtonSing';

const Header = () => {
    return (
        <header className={style.header} >
            <div className='container-fluid'>
                <div className={style['header__wrapper']}>
                    <Link href='/'  legacyBehavior>
                        <Image className={style['header-logo']} src={logo} width={225} height={32} alt='Интеркарс' />
                    </Link>
                    {/* <ButtonSing/> */}
                    <div className={style.support}>
                        <SupportIcon className={style['support__icon']} />
                        <div className={style['support__content']}>
                            <p className={style['support__title']}>
                                Служба поддержки
                            </p>
                            <p className={style['support__text']}> С 9:00 до 22:00</p>
                        </div>
                        <div className={style['support__content']}>
                            <Link href="tel:+74993508016" className={style['support__phone']}>
                                +7 499 350 80 16
                            </Link>
                            <Link href="tel:+78007777415" className={style['support__phone']}>
                                +7 800 777 74 15
                            </Link>
                        </div>
                    </div>
                    <HumburgerMenu/>
                </div>
            </div>
        </header>
    );
};

export default Header;