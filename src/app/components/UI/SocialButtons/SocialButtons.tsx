import { FC } from 'react';
import style from './SocialButtons.module.scss';
import TelegramIcon from '@/app/icons/svg/TelegramIcon';
import TwitterIcon from '@/app/icons/svg/TwitterIcon';
import VKIcon from '@/app/icons/svg/VKIcon';
import TikTokIcon from '@/app/icons/svg/TikTokIcon';
import Link from 'next/link';
import WhatsAppIcon from '@/app/icons/svg/WhatsApp';

interface ISocial {
  className: string,
  telegram: string,
  twitter: string,
  vk: string,
  tik:string,
  whats:string,
}

const SocialButtons: FC<ISocial> = ({ className, telegram, twitter, vk, tik,whats }) => {


  return (
    <div className={`${style['social-buttons']} ${className}`}>
      <h4 className={style['social-buttons__title']}>
        Мы в социальных сетях
      </h4>
      <div className={style['social-buttons__wrapper']}>
        <Link target='_blank' href={telegram}
          aria-label="Перейти в Telegram Intercars"
          className={style['social-buttons__btn']}>
          <TelegramIcon className={style['social-buttons__icon' ]}/>
        </Link>
        <Link target='_blank' href={whats}
          className={style['social-buttons__btn']}
          aria-label="Перейти в WhatsApp Intercars"
        >
          <WhatsAppIcon className={style['social-buttons__icon' ]}/>
        </Link>
        <Link href={vk} target='_blank'
          className={style['social-buttons__btn']}
          aria-label="Перейти в VK Intercars"
        >
          <VKIcon className={style['social-buttons__icon' ]} />
        </Link>
        <Link href={tik} target='_blank'
          className={style['social-buttons__btn']}
          aria-label="Перейти в TikTok Intercars"
        >
          <TikTokIcon className={style['social-buttons__icon' ]} />
        </Link>
      </div>
    </div>
  );
};

export default SocialButtons;