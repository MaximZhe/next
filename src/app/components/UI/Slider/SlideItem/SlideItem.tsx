import { FC } from 'react';
import style from './SlideItem.module.scss';
import Link from 'next/link';
import Image from 'next/image';

interface IDataItem {
    data: {
        id: number,
        value: string,
        price: number,
        link: string,
        src: string,
    },
    className?: string
}

const SlideItem: FC<IDataItem> = ({ data, className }) => {
    return (
        <div className={`${style['slider-main']} `}>
            <Link
                href={`/find/${data.link}`}
                legacyBehavior>
                <div data-item={`${data.id}`} className={`${style['slider-main__item']} `}
                    role="button"
                    aria-label={`Перейти к ${data.value}`}
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            window.location.href = `/find/${data.link}`;
                        }
                    }}>
                    <div className={`${style['slider-main__content']} `}>
                        <p className={`${style['slider-main__name']} `}>{data.value}</p>
                        <p className={`${style['slider-main__price']} `}>от <span>{data.price} RUB</span></p>
                    </div>
                    <Image className={`${style['slider-main__img']} `} sizes="100vw"
                        style={{
                            width: '100%',
                            height: 'auto',
                        }} width={582} height={465} src={`${data.src}`} priority={true} alt={`автобус ${data.value}`} />
                </div>
            </Link>
        </div>
    );
};

export default SlideItem;