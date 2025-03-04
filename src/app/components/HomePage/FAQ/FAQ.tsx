'use client';

import { useState } from 'react';
import style from './FAQ.module.scss';
import ArrowIcon from '@/app/icons/svg/ArrowIcon';
import { IAccordionItem } from '@/app/types/types';


interface AccordionProps {
    itemsLeft: IAccordionItem[];
    itemsRight: IAccordionItem[];
    className?:string[],
}

const Accordion: React.FC<AccordionProps> = ({ itemsLeft, itemsRight,className }) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    
    const toggleAccordionItem = (id: number) => {
        setActiveIndex((prevIndex) => (prevIndex === id ? null : id));
    };

    return (
        <div className={`${style.accordion} ${className && className[0]}`}>
            <div className='container-fluid'>
                <div className={style['accordion__box']}>
                    <p className={style['accordion__main-title']}>
                        Часто задаваемые вопросы
                    </p>
                    <div className={style['accordion-columns']}>
                        <div className={style['accordion-column__left']}>
                            {itemsLeft.map((item) => (
                                <div className={style['accordion__item']}
                                    key={item.id}
                                    onClick={() => toggleAccordionItem(item.id)}
                                >
                                    <div className={style['accordion__inner']}>
                                        <div aria-expanded={activeIndex === item.id} role='button' aria-label={item.title}
                                            className={`${style['accordion__wrapper']} ${className && className[1]}  ${activeIndex === item.id ? style.active : ''}`} >
                                            <ArrowIcon className={style['accordion__icon']} />
                                        </div>
                                        <p className={style['accordion__title']}>{item.title}</p>
                                    </div>

                                    {activeIndex === item.id ?
                                        <p
                                            className={`${style['accordion__text']} ${activeIndex === item.id ? style.active : ''}`}>
                                            {item.content}
                                        </p>
                                        : null
                                    }
                                </div>
                            ))}
                        </div>
                        <div className={style['accordion-column__right']}>
                            {itemsRight.map((item) => (
                                <div className={style['accordion__item']}
                                    key={item.id}
                                    onClick={() => toggleAccordionItem(item.id)}
                                >
                                    <div className={style['accordion__inner']}>
                                        <div aria-expanded={activeIndex === item.id} role='button' aria-label={item.title}
                                            className={`${style['accordion__wrapper']} ${className && className[1]} ${activeIndex === item.id ? style.active : ''}`} >
                                            <ArrowIcon className={style['accordion__icon']} />
                                        </div>
                                        <h3 className={style['accordion__title']}>{item.title}</h3>
                                    </div>

                                    {activeIndex === item.id ?
                                        <p
                                            className={`${style['accordion__text']} ${activeIndex === item.id ? style.active : ''}`}>
                                            {item.content}
                                        </p>
                                        : null
                                    }
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Accordion;