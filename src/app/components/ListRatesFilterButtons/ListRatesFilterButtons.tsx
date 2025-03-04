import { FC } from 'react';
import style from './ListRatesFilterButtons.module.scss';

import Button from '../UI/Button/Button';
import ArrowFilter from '@/app/icons/svg/ArrowFilter';

interface IButtonFilter{
    title: string,
    onClick?:() => void,
    isSort?:boolean
}
const ListRatesFilterButtons:FC<IButtonFilter> = ({ title, onClick,isSort}) => {

    return (
        <Button className={`${style['filter-button']} ${!isSort ? '' : style.active}`} onClick={onClick}>
            <span className={style['filter-button__text']}>
                {title}
            </span>
            <ArrowFilter className={style['filter-button__icon']} />
        </Button>
    );
};

export default ListRatesFilterButtons;