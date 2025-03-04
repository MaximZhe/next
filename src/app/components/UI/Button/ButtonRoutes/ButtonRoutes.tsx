'use client'
import Link from 'next/link';
import ArrowRight from '@/app/icons/svg/ArrowRight';
import style from './ButtonRoutes.module.scss';
import { FC } from 'react';


interface IButtonRoutesProps {
  className: string;
  title: string;
  to: {
    pathname?: string,
    query?: {
      slug?: string,
      newsslug?:string,
      id?:number | string,
      niceUrl?:string
    }
  };
  state?: string;
  onClick?: () => void;

}

const ButtonRoutes: FC<IButtonRoutesProps> = ({
  className,
  title,
  to,
  state,
  onClick,
}) => {

  return (
    (<Link
      href={to}
      as={state}
      passHref
      className={`${style['button-more']} ${className}`}
      onClick={onClick}>

      {title}
      <ArrowRight className={style['button-more__icon']} />

    </Link>)
  );
};

export default ButtonRoutes;