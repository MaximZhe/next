'use client';


import ArrowRight from '@/app/icons/svg/ArrowRight';
import React, { FC, useEffect, useState } from 'react';
import style from '../NewsPage.module.scss';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import Button from '../../UI/Button/Button';
import { actionGetAction } from '@/app/api/actionGetAction';

interface IButtonMoreActionProps {
  className?: string,
}
const ButtonMoreAction: FC<IButtonMoreActionProps> = ({ }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const { replace } = useRouter();
  const [arrayLengthAction, setArrayLengthAction] = useState(30);
  const [countAction, setCountAction] = useState(6);
  const [startCount, setStartCount] = useState(1);
  const itemActionLength = 20
  useEffect(() => {
    const fetchActionArray = async () => {

      const result = await actionGetAction(itemActionLength);
      setArrayLengthAction(result.DataResult.Result.Collection.length);
    }
    fetchActionArray();
  },[])

  const RefreshPage = () => {

    const params = new URLSearchParams(searchParams);
    setCountAction(prevCountAction => prevCountAction + startCount);
    if (countAction) {
      params.set('query', `${countAction}`);
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
        className={`${style['news__btn']} ${arrayLengthAction < countAction ? style.disabled : ''}`}
      >
        <p className={style['news__btn-text']}>Показать еще</p>
        <ArrowRight className={style['news__icon']} />
      </Button>
    </>
  );
};


export default ButtonMoreAction;