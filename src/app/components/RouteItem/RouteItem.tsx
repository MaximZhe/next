import { FC } from 'react';
import style from './RouteItem.module.scss';
import Link from 'next/link';
import Image from 'next/image';
interface IDataItem {
    data: {
        id: number,
        value: string,
        price: number
        link:string,
        src:string
    },
    className: string
}

const RouteItem: FC<IDataItem> = ({ data, className }) => {
    return (
        <div data-item={`${data.id}`} className={`${style['route-card']} ${className}`}>
            <Link
                href={`/find/${data.link}`}
                >
                <div  className={`${style['route-card__item']} ${className}`}>
                    <div className={`${style['route-card__content']} `}>
                        <p className={`${style['route-card__name']} `}>{data.value}</p>
                        <p className={`${style['route-card__price']} `}>от <span>{data.price} RUB</span></p>
                    </div>
                    <Image className={`${style['route-card__img']} `} width={200} height={200} src={`${data.src}`} alt={`автобус ${data.value}`}/>
                </div>
            </Link>
        </div>
    );
};

export default RouteItem;