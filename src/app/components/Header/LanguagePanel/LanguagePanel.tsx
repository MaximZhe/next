'use client'
import { useAppDispatch, useAppSelector } from "@/app/hooks/redux";
import { setIsToggleMenu, setLanguageValue } from "@/redux/slice/languageSlice";
import style from '../Header.module.scss'

const LanguagePanel = () => {

    const { language, isOpen } = useAppSelector((state:{languageReduser:any}) => state.languageReduser);
    const dispatch = useAppDispatch();
    const toggleDropdown = () => {
        dispatch(setIsToggleMenu(true))
    };
    const handleButtonClick = (value:string) => {
        dispatch(setLanguageValue(value));
        dispatch(setIsToggleMenu(false));
    }
    return (
        <div className={style['header__dropdown']}>
            <div className={`${style.dropdown} ${isOpen ? style.open : ''}`}>
                <div className={style['dropdown__language']} onClick={toggleDropdown}>
                    {language}
                </div>
                {isOpen && (
                    <div className={style['dropdown-menu']}>
                        <button type='button'
                            className={`${style['dropdown-item']} ${language === 'RUS' ? style.active : ''}`}
                            onClick={() => handleButtonClick('RUS')}>
                            Русский
                        </button>
                        <button type='button'
                            className={`${style['dropdown-item']} ${language === 'EN' ? style.active : ''}`}
                            onClick={() => handleButtonClick('EN')}>
                            English
                        </button>
                        <button type='button'
                            className={`${style['dropdown-item']} ${language === 'PL' ? style.active : ''}`}
                            onClick={() => handleButtonClick('PL')}>
                            Polski
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LanguagePanel;