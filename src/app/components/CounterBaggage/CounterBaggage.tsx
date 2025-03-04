'use client'
import  { FC, useEffect, useState } from 'react';
import DecrementIcon from '../../icons/image/decrement-icon.svg';
import IncrementIcon from '../../icons/image/increment-icon.svg';
import style from './Counter.module.scss';
import Image from 'next/image';


interface ICounterProps {
   className?: string;
   initialStateValue?: number,
   getCountValues?: (value: number) => void;
}
const CounterBaggage:FC <ICounterProps>= ({className, initialStateValue, getCountValues}) => {
    
    const [buggageCount, setBuggageCount] = useState(initialStateValue !== undefined ? initialStateValue :0);
    useEffect(() => {
        if (getCountValues) {
          getCountValues(buggageCount);
        }
      }, [buggageCount]);
    return (
        <div className={`${style.counter} ${className}`}>
            <button type='button' name='decrement'
                id='decrement'
                className={`${style['counter__btn']} ${buggageCount > 0  ? style.active : ''}`}
                onClick={() => { setBuggageCount((prev) => prev - 1)}}
                disabled={buggageCount === 0 ? true : false}
            >  
                <Image width={24} height={24}
                    className={style['counter__icon']}
                    src={DecrementIcon} alt=''
                />
            </button>
            <div className={style['counter__value']}>
              {initialStateValue === 0 ? buggageCount : buggageCount} 
            </div>
            <button type='button' name='increment' id='increment'
                className={`${style['counter__btn']} ${buggageCount > 2  ? style.disabled : ''}`}
                disabled={buggageCount > 2 ? true : false}
                onClick={() => {setBuggageCount((prev) => prev + 1)}}>
                <Image width={24} height={24}
                    className={style['counter__icon']}
                    src={IncrementIcon} alt=''
                />
            </button>
        </div>
    );
};

export default CounterBaggage;