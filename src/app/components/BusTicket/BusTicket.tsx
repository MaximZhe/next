'use client'

import { FC, useEffect, useState } from 'react';
import style from './BusTicket.module.scss'
import BusDriver from '../../icons/image/driver-bus.svg';
import Image from 'next/image';
import { useAppSelector } from '@/app/hooks/redux';

import { useModalPlaceContext } from '@/contex/modal';
import ModalPlace from '../UI/ModalPlace/ModalPlace';
import CounterBaggage from '../CounterBaggage/CounterBaggage';
import { fetchStatusTicket, fetchStatusTicketRemove } from '@/app/api/actionCheckTicketStatus';
import Loading from '@/app/loading';

interface IBusPlace {
  Col: number,
  Floor: number,
  IsFree: boolean,
  Row: number,
  Seat: number
}
export interface IPlaces {
  places: IBusPlace[][],
  maxCol: any,
  handlePlaceSelection: (selectedPlace: any) => void,
  countUser: number,
  selectedPlaces: any[],
  handleBaggage: (baggageCount: number) => void;
  newSearchId: string | null
}
interface ISelectePlace {
  NumberPlace: number,
  RouteId: string,
  SearchId: string,
  Lang: string,
  placeSelected:any
}
const BusTicket: FC<IPlaces> = ({ places, handlePlaceSelection, selectedPlaces, handleBaggage, countUser, newSearchId }) => {
  const { Route } = useAppSelector((state: any) => state.singleRouteReduser);
  const { dataRoute } = useAppSelector((state: any) => state.dataRouteReduser);
  const [isBook, setIsBook] = useState(true)
  const [countBaggage, setCountBaggage] = useState(0)
  const [numberPlace, setNumberPlace] = useState(0)
  const { isOpenModalPlace, setIsOpenModalPlace } = useModalPlaceContext();
  const [isStatusLoading, setIsStatusLoading] = useState(false);
  console.log(Route)
  const selectedPlace = async (placeDataFetch: ISelectePlace) => {
    const dataFetch ={
      NumberPlace: placeDataFetch.NumberPlace,
      RouteId: placeDataFetch.RouteId,
      SearchId: placeDataFetch.SearchId,
      Lang: placeDataFetch.Lang
    }
	setIsStatusLoading(true);
    const responce = await fetchStatusTicket(dataFetch)
    if (responce.Result === null || responce.Result === false) {
      // console.log('статус брони', responce)
      setIsOpenModalPlace(true);
      setNumberPlace(placeDataFetch.NumberPlace);
	  setIsStatusLoading(false);
    }else{
      handlePlaceSelection(placeDataFetch.placeSelected);
	  setIsStatusLoading(false);
      //console.log('статус брони удачный',responce)
    }
  }
  const removePlace = async (placeData: ISelectePlace) => {
    const dataFetch ={
      NumberPlace: placeData.NumberPlace,
      RouteId: placeData.RouteId,
      SearchId: placeData.SearchId,
      Lang: placeData.Lang
    }
	setIsStatusLoading(true);
    const responce = await fetchStatusTicketRemove(dataFetch)
    if (responce.Result === null || responce.Result === false) {
		setIsStatusLoading(false);
      // console.log('статус отмены брони', responce)
    }else{
		setIsStatusLoading(false);
      handlePlaceSelection(placeData.placeSelected);
      //console.log('статус отмены брони удачной', responce)
    }
  }

  const handleSeatClick = (place: IBusPlace) => {
    if (place.IsFree) {
      if (Route?.Result?.Route?.CarrierName === 'Intercars') {
        const isSelected = selectedPlaces.some(seat => seat.Seat === place.Seat);

        if (isSelected) {
          const removedData = { NumberPlace: place.Seat, RouteId: Route?.Result?.Route?.Id, SearchId: dataRoute?.Result?.Id ? dataRoute?.Result?.Id : newSearchId, Lang: 'RU', placeSelected: place };
          removePlace(removedData);
        } else {
          const selectedData = { NumberPlace: place.Seat, RouteId: Route?.Result?.Route?.Id, SearchId: dataRoute?.Result?.Id ? dataRoute?.Result?.Id : newSearchId, Lang: 'RU', placeSelected: place };
          selectedPlace(selectedData);
          
          if (isOpenModalPlace) {
            setIsBook(prev => !prev);
          }
        }
      } else {
        handlePlaceSelection(place);
       
      }
    } else {
      console.log('место занято');
    }
    
  };
 
  const handleGetCountBaggage = (value: number) => {
    setCountBaggage(value);
  };
  useEffect(() => {
    handleBaggage(countBaggage)
  }, [countBaggage])
  const floor1Array = places.filter(array => array.some(place => place.Floor === 1));
  const floor2Array = places.filter(array => array.some(place => place.Floor === 2));


  return (
    <div className={style['bus-ticket']}>
	  {isStatusLoading ?
        <div className={style['bus-ticket__loading']}>
          <p>Идет проверка места в автобусе</p>
          <Loading />
        </div>
        : null
      }
      <ModalPlace isOpen={isOpenModalPlace}>
        <h1>Место № {numberPlace} занято</h1>
      </ModalPlace>
      <h2 className={style['bus-ticket__title']}>
        Выберите места в автобусе
      </h2>
      <div className={style['bus-ticket__wrapper']}>
        <div className={style['bus-ticket-info']}>
          <div className={style['bus-ticket-info__item']}>
            <p>Свободно</p>
          </div>
          <div className={style['bus-ticket-info__item']}>
            <p>Выбрано</p>
          </div>
          <div className={style['bus-ticket-info__item']}>
            <p>Недоступно</p>
          </div>
        </div>
        <div className={style['bus-places']}>
          {floor2Array.length > 0 ? (<div className={style['bus-places__floor-wrapper']}>
            <p className={style['bus-places__floor-title']}>2 этаж</p>
            <div className={style['bus-places__wrapper']}>
              <Image width={40} height={66} src={BusDriver} className={style['bus-places__icon']} alt='' />
              <div className={style['bus-component']}>
                {floor2Array.map((array, index) => {
                  const maxCol = Math.max(...array.map(place => place.Col));
                  const sortedArray = array.sort((a, b) => a.Col - b.Col);

                  return (
                    <div className={style.row} key={index}>
                      {Array.from({ length: maxCol + 1 }).map((_, placeIndex) => {
                        const place = sortedArray.find(item => item.Col === placeIndex && item.Floor === 2);

                        if (!place) {
                          return (
                            <div className={`${style.seat} ${style.invisible} `} key={placeIndex} data-col={placeIndex} />
                          );
                        }

                        const colClass = place.Floor === 2 ? 'floor2' : 'floor1';
                        const seatClass = place.IsFree ? `${style.free}` : `${style.occupied}`;

                        return (
                          <div className={`${style.seat} ${colClass} ${seatClass} ${selectedPlaces.includes(place) && place.IsFree ? style.choose : ''} ${selectedPlaces.length === countUser ? style.disabled : ''}`} key={placeIndex} data-col={placeIndex} onClick={() => handleSeatClick(place)}>
                            {place ? <span>{place.Seat}</span> : null}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          ) : null}

          {floor1Array.length > 0 ? (
            <div className={style['bus-places__floor-wrapper']}>
              {floor2Array.length > 0 ? (<p className={style['bus-places__floor-title']}>1 этаж</p>) : null}
              <div className={style['bus-places__wrapper']}>
                <Image width={40} height={66} src={BusDriver} className={style['bus-places__icon']} alt='' />
                <div className={style['bus-component']}>
                  {floor1Array.map((array, index) => {
                    const maxCol = Math.max(...array.map(place => place.Col));
                    const sortedArray = array.sort((a, b) => a.Col - b.Col);

                    return (
                      <div className={style.row} key={index}>
                        {Array.from({ length: maxCol + 1 }).map((_, placeIndex) => {
                          const place = sortedArray.find(item => item.Col === placeIndex && item.Floor === 1);

                          if (!place) {
                            return (
                              <div className={`${style.seat} ${style.invisible}`} key={placeIndex} data-col={placeIndex} />
                            );
                          }

                          const colClass = place.Floor === 2 ? style.floor2 : style.floor1;
                          const seatClass = place.IsFree ? style.free : style.occupied;

                          return (
                            <div className={`${style.seat} ${colClass} 
                            ${seatClass} ${selectedPlaces.includes(place) && place.IsFree ? style.choose : ''} 
                            ${selectedPlaces.length === countUser ? style.disabled : ''}`}
                              key={placeIndex} data-col={placeIndex}
                              onClick={() => handleSeatClick(place)}>
                              {place ? <span>{place.Seat}</span> : null}
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : null}

          {floor2Array.length === 0 && floor1Array.length === 0 ? (
            <div className={style['no-seats-message']}>Извините, на данный маршрут нет возможности выбрать место.</div>
          ) : null}
        </div>
      </div>
      {Route?.Result?.Route?.CarrierName === 'Intercars' ?
        <div className={style['bus-ticket-baggage']}>
          <h3 className={style['bus-ticket-baggage__title']}>
            Укажите количество дополнительного багажа
          </h3>
          <CounterBaggage
            className={`${style['bus-ticket-counter']}`}
            initialStateValue={0}
            getCountValues={handleGetCountBaggage} />
          <p className={style['bus-ticket-baggage__text']}>
            {Route?.Result?.Route?.BaggageDescription ?
              Route?.Result?.Route?.BaggageDescription : 
              `В стоимость билета входит 2 единицы багажа бесплатно объемом 90*60*25 см. и весом 20 кг каждая.
            Негабаритный багаж и багаж более 2-ух единиц необходимо оплачивать дополнительно.`
            }
            
          </p>
        </div>
        : null}

    </div>
  );
};

export default BusTicket;

