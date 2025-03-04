'use client'
import  { FC, useEffect, useState } from 'react';
import DecrementIcon from '../../icons/image/decrement-icon.svg';
import IncrementIcon from '../../icons/image/increment-icon.svg';
import style from './Counter.module.scss';
import Image from 'next/image';


interface ICounterProps {
   className?: string;
   initialStateValue?: number,
   getCountValue?: (value: number) => void;
}
const Counter:FC <ICounterProps>= ({className, initialStateValue, getCountValue}) => {
    
    
    const [count, setCount] = useState(initialStateValue !== undefined ? initialStateValue :0);
    const [buggageCount, setBuggageCount] = useState(initialStateValue !== undefined ? initialStateValue :0);
    useEffect(() => {
        if (getCountValue) {
          getCountValue(count);
        }
      }, [count]);
    return (
        <div className={`${style.counter} ${className}`}>
            <button type='button' name='decrement'
                id='decrement'
                className={`${style['counter__btn']} ${count > 1  ? style.active : ''}`}
                onClick={() => {setCount((prev) => prev - 1), setBuggageCount((prev) => prev - 1)}}
                disabled={ buggageCount === 0 || count === 1 ? true : false}
            >  
                <Image width={24} height={24}
                    className={style['counter__icon']}
                    src={DecrementIcon} alt=''
                />
            </button>
            <div className={style['counter__value']}>
              {initialStateValue === 0 ? buggageCount : count} 
            </div>
            <button type='button' name='increment' id='increment'
            disabled={ count === 5 ? true : false}
                className={`${style['counter__btn']} ${count > 4  ? style.disabled : ''}`}
                onClick={() => {setCount((prev) => prev + 1),setBuggageCount((prev) => prev + 1)}}>
                <Image width={24} height={24}
                    className={style['counter__icon']}
                    src={IncrementIcon} alt=''
                />
            </button>
        </div>
    );
};

export default Counter;