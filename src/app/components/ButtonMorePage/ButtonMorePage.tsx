'use client';

import ArrowRight from '@/app/icons/svg/ArrowRight';
import React, { FC, useEffect, useState } from 'react';
import Button from '../UI/Button/Button';
import style from '../../(news)/novosti/NewsPage.module.scss';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { getServerSideProps } from '@/app/api/actionNews';

interface IButtonMorePageProps {
  className?: string,
}
const ButtonMorePage: FC<IButtonMorePageProps> = ({ }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const { replace } = useRouter();
  const [arrayLengthNews, setArrayLengthNews] = useState(30);
  const [countNews, setCountNews] = useState(6);
  const [startCount, setStartCount] = useState(2);
  const itemNewsLength = 20
  useEffect(() => {
    const fetchNewsArray = async () => {

      const result = await getServerSideProps(itemNewsLength);
      setArrayLengthNews(result.DataResult.Result.Collection.length);
    }
    fetchNewsArray();
  },[])

  const RefreshPage = () => {

    const params = new URLSearchParams(searchParams);
    setCountNews(prevCountNews => prevCountNews + startCount);
    if (countNews) {
      params.set('query', `${countNews}`);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }
  return (

    <>
      <Button
        onClick={RefreshPage}
        type='button'
        className={`${style['news__btn']} ${arrayLengthNews < countNews ? style.disabled : ''}`}
      >
        <p className={style['news__btn-text']}>Показать еще</p>
        <ArrowRight className={style['news__icon']} />
      </Button>
    </>
  );
};


export default ButtonMorePage;