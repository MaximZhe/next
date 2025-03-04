import { FC } from 'react';
import wifi from '../../icons/image/Wi-Fi.svg';
import air from '../../icons/image/Air-Cond.svg';
import usb from '../../icons/image/USB.svg';
import baggage from '../../icons/image/baggage.svg';
import foldingBacks from '../../icons/image/FoldingBacks.svg'
import animal from '../../icons/image/animal.svg';
import { IItemBusOptions } from '@/app/types/types';
import Image from 'next/image';
import style from '../ListRatesItem/ListRatesItem.module.scss'

interface IBusOptions {
  options: IItemBusOptions[]
}

const busOptionsName = [
{name:'IsAirConditioning',title:'Кондиционер'}, 
{name:'IsWiFi',title:'Wi-fi в автобусе'},
{name:'IsCharger',title:'Электрические розетки в автобусе'},
{name:'IsMorePlace',title:''},
{name:'IsSelectPlace',title:''},
{name:'IsFoldingBacks',title:'Сиденья откидываются'},
{name:'IsBaggage',title:'Место дополнительного багажа'}, 
{name:'HasAnimal',title:'Можно с животными'},
{name:'isUSB',title:'usb порт'},
];

const getIconSrc = (name: string): string => {
  switch (name) {
    case 'IsAirConditioning':
      return air;
    case 'IsWiFi':
      return wifi;
    case 'IsCharger':
      return usb;
    case 'IsFoldingBacks':
      return foldingBacks;
    case 'IsBaggage':
      return baggage;
      case 'HasAnimal':
      return animal;
    default:
      return '';
  }
};
const getIconTooltip = (name: string): any => {
  const icon = busOptionsName.find(option => option.name === name);
  return icon ? icon.title : '';
};
const ListitlemIcons: FC<IBusOptions> = ({ options }) => {
  return (
    <div className={style['list-item-icons']}>
      {options.map((option, index) => {
        if (option.IsEnabled && busOptionsName.some(item => item.name === option.Name)) {
          const iconSrc = getIconSrc(option.Name);
          const tooltip = getIconTooltip(option.Name);
          return (
            iconSrc !== '' ?
            <div key={index} className={style['list-item-icons__item']}>
              <Image width={24} height={24} src={iconSrc} alt={tooltip} title={tooltip} />
            </div>
            : null
          );
        }
        return null;
      })}
    </div>
  );
};

export default ListitlemIcons;