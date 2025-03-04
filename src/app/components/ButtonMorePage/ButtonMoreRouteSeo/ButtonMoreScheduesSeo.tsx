'use client';

import ArrowRight from '@/app/icons/svg/ArrowRight';
import React, { FC, useEffect, useState } from 'react';
import style from './ButtonSeoSchedues.module.scss';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import Button from '../../UI/Button/Button';


interface IButtonMorePageProps {
  className?: string,
  lengthRoute?: number
}
const ButtonMoreScheduesSeo: FC<IButtonMorePageProps> = ({lengthRoute }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const { replace } = useRouter();
  const [arrayLengthNews, setArrayLengthNews] = useState(30);
  const [countNews, setCountNews] = useState(26);
  const [startCount, setStartCount] = useState(6);
  const itemNewsLength = 20
  useEffect(() => {
    if(lengthRoute){
      setArrayLengthNews(lengthRoute);
    }
      
    
    
  },[lengthRoute])

  const RefreshPage = () => {

    const params = new URLSearchParams(searchParams);
    setCountNews(prevCountNews => prevCountNews + startCount);
    if (countNews) {
      params.set('schedules', `${countNews}`);
    } else {
      params.delete('schedules');
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }
  return (

    <>
      <Button
        onClick={RefreshPage}
        type='button'
        className={`${style['more-route__btn']} ${arrayLengthNews < countNews ? `${style['more-route__disabled']}` : ''}`}
      >
        <p className={style['more-route__btn-text']}>Показать еще</p>
        <ArrowRight className={style['more-route__icon']} />
      </Button>
    </>
  );
};


export default ButtonMoreScheduesSeo;