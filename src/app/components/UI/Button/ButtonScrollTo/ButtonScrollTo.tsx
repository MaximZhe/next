'use client'

import ArrowRight from '@/app/icons/svg/ArrowRight';
import style from './ButtonScrollTo.module.scss';
import { useEffect, useState } from 'react';
import Button from '../Button';
import { getWindowScrollY } from '@/app/utils/windowScrollY';
import { usePathname} from 'next/navigation';


interface IButtonRoutesProps {
  className: string;
  title: string;
  to: {
    pathname?: string,
    query?: {
      slug?: string,
      newsslug?: string,
      id?: number | string,
      niceUrl?: string
    }
  };
  state?: string;
  onClick?: () => void;

}

const ButtonRoutes = ({

}) => {

  const [scrollState, setScrollState] = useState(true);

  const patch = usePathname();

  useEffect(() => {

    const handleScroll = () => {
      const windowScrollY = getWindowScrollY();
      if (windowScrollY < 150) {
        setScrollState(true);
      } else {
        setScrollState(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  useEffect(() => {
    const windowScroll = getWindowScrollY();
    windowScroll < 150 ? setScrollState(true) : setScrollState(false);
  }, []);
  const scroll = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  //форматируем url для сео страницы убираем не нужные знаки
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentUrl = window.location.href;

      const url = new URL(currentUrl);
      const pathname = url.pathname;

      const normalizedPathname = pathname.replace(/\/{2,}/g, '/');

      if (pathname !== `/${normalizedPathname}`) {
        const normalizedUrl = `${url.origin}${normalizedPathname}${url.search}${url.hash}`;
        window.history.replaceState(null, '', normalizedUrl);
      }
    }
  }, []);
  return (
    (<Button
      className={`${style['scroll-button']} ${scrollState ? style['up'] : ''}`}
      onClick={scroll}>
      <ArrowRight className={style['scroll-button__icon']} />

    </Button>)
  );
};

export default ButtonRoutes;