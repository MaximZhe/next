'use client'

import { FC } from "react";
interface ISliderTab {
    activeTab: string,
    handleClick: (name: string,) => void,
}
import style from './SliderTabsButtons.module.scss';

const SliderTabsButtons: FC<ISliderTab> = ({ activeTab, handleClick }) => {
    return (
        <div className={style['routes-tabs']}>
            <button className={`${style['routes-tabs__btn']}
                        ${activeTab === 'russia' ? style.active : ''}`}
                type='button'
                name='russia'
                onClick={() => handleClick('russia')}
                aria-label="Рейсы По России">
                По России
            </button>
            <button className={`${style['routes-tabs__btn']}
                        ${activeTab === 'international' ? style.active : ''}`}
                type='button'
                name='international'
                onClick={() => handleClick('international')}
                aria-label="Рейсы международные"
            >
                Международные
            </button>
        </div>
    );
};

export default SliderTabsButtons;