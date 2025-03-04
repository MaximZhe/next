import { FC } from 'react';

import style from './ActionCardItem.module.scss';
import Link from 'next/link';

interface IDataItem {
    data: {
        id: number,
        title: string,
        content: string,
    },
    className: string
}

const ActionCardItem: FC<IDataItem> = ({ data, className }) => {
    return (
        <div className={`${style['action-item-card']} ${className}`}>
            <h2 className={`${style['action-item-card__title']} ${className}__title`}>
                {data.title}
            </h2>
            <p className={`${style['action-item-card__text']} ${className}__text`}>
                {data.content}
            </p>
            <Link href='/404' className={`${style['action-item-card__link']} ${className}__link`} data-item={`${data.id}`} >
                <span>Узнать подробности</span>
            </Link>
        </div>

    );
};

export default ActionCardItem;