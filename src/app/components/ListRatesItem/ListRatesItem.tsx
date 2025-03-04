'use client';
import { FC, useEffect, useState } from 'react';

import arrow from '../../icons/image/Arrow-static-blue.svg';

import style from './ListRatesItem.module.scss';

import { WindowScreenUser } from '../../utils/windowScreen';
import { SwitchClassImg } from '../../utils/classStyleTranfer';

import { IItemRoutes } from '../../types/types';
import ListItemIcons from '../ListItemIcons/ListItemIcons';


import { formatedDate } from '@/app/utils/formatedDateRates';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/app/hooks/redux';

import { setDataRoute } from '@/redux/slice/getRoutesSlice';
import { setSingleRoute } from '@/redux/slice/singleRouteDataSlice';
import { useModalErrorSearchIdContext } from '@/contex/modal';
import { getSingle } from '@/app/api/actionGetSingleRoute';

interface ItemRatesProps {
  data: IItemRoutes;
  sortedPrices?: number[];
  searchId: string;
}

export interface ISingleRouteProps {
  RouteId: string,
  SearchId: string,
  Lang?: string
}


const ListRatesItem: FC<ItemRatesProps> = ({ data, sortedPrices, searchId }) => {

  const [isLoadingFetch, setIsLoadingFetch] = useState(false);
  const [widthWindow, setWindowWidth] = useState(0)
  const router = useRouter();
  const dispatch = useAppDispatch();
  const context = useModalErrorSearchIdContext();
  const [isErrorFetch, setIsErrorFetch] = useState(false);

  const pathname = usePathname();

  const getSingleRoute = async (valueId: string) => {
    setIsLoadingFetch(true);
    const datas: ISingleRouteProps = {
      RouteId: data.Id,
      SearchId: valueId,
      Lang: 'RUS'
    };
    try {
      const response = await getSingle(datas);
      const dat = response;

      if (dat && dat.Result !== null) {
        router.push(`/find/client?id=${valueId}`, undefined);
        dispatch(setSingleRoute(dat))
        setIsLoadingFetch(false);
        console.log(dat)
      } else if (dat.Result === null) {
        setIsErrorFetch(true);
        setIsLoadingFetch(false);
        console.log('нет данных')
      }

    } catch (error) {
      console.error('Ошибка при отправке данных на сервер:', error);
    } finally {

    }
  };
  const handleSuccess = (valueId: string) => {
    getSingleRoute(valueId)
  };

  useEffect(() => {
    const handleResize = () => {
      const windowSize = WindowScreenUser();
      setWindowWidth(windowSize);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const transfer = 0;
  const transferStart = 0;
  const transferEnd = 0;
  const spentClassBackground = SwitchClassImg(widthWindow, transfer);
  const [isToggleDetailsComponent, setIsToggleDetailsComponent] = useState(false)
  const formatedPrice = (price: number) => {
    return Math.floor(price);
  }

  useEffect(() => {
    if (isErrorFetch && !pathname.startsWith('/find/route/')) {
      dispatch(setDataRoute({}));
      alert('Выберите дату и нажмите поиск')
      setTimeout(() => {
        setIsErrorFetch(false)
      }, 1000);
    }

  }, [isErrorFetch])

  const routeName = data.Route !== null ? data.Route.split(" ")[0] : '';

  return (
    <>
      {sortedPrices !== undefined ? (
        <div className={`${style['list-item']} ${sortedPrices[0] === data.Price[2].Ptar ? style['list-item--best'] : ''} `}>
          <div className={style['list-item-offer--mobail']}>
            <p className={style['list-item-offer__company']}>{data.CarrierName}</p>
            <div className={`${style['list-item-offer__best-wrapper']}`}>
              {sortedPrices[0] === data.Price[2].Ptar ?
                <div className={`${style['list-item-offer__best']}`}>
                  <p className={style['list-item-offer__text']}>Лучшая цена</p>
                </div> : null
              }
              {data.HasExpressAttr !== false ?
                <div className={`${style['list-item-offer__best']} ${style['list-item-offer__best--times']}`}>
                  <p className={style['list-item-offer__text']}>Самый быстрый</p>
                </div> : null

              }
            </div>
          </div>
          <div className={style['list-item__wrapper']}>
            <div className={style['list-item-info']}>
              <div className={style['list-item-info__top']}>
                <div className={`${style['list-item__data']} ${style['text-left']}`}>
                  <p className={style['list-item__date']}>{formatedDate(data.DateDepart)}</p>
                  <div className={style['list-item__time']}>{data.TimeDepart}</div>
                </div>
                <div className={style['list-item-spent']}>
                  <p className={style['list-item-spent__time']}>В пути: {data.Hour}ч {data.Minuts}мин</p>
                  {transfer !== 0 ?
                    <div className={style['list-item-spent__transfer']}>
                      <span>{transfer} </span>пересадка</div> : null
                  }
                  <div className={`${style['list-item-spent__img']} ${spentClassBackground}`} ></div>
                </div>
                <div className={`${style['list-item__data']} ${style['text-right']}`}>
                  <p className={style['list-item__date']}>{formatedDate(data.DateArrive)}</p>
                  <div className={style['list-item__time']}>{data.TimeArrive}</div>
                </div>
              </div>
              <>
                <div className={`${style['list-item-spent__img--mobail']} ${transfer !== 0 ? style['list-item-spent__img--mobail-transfer'] : ''}`}></div>
              </>
              <div className={style['list-item-info__bottom']}>
                <div className={style['list-item__place']}>
                  <p className={`${style['list-item__city']} ${style['text-left']}`}>{data.City1}</p>
                  <p className={`${style['list-item__adress']} ${style['text-left']}`}>{data.DepartName}</p>
                </div>
                <div className={style['list-item-company']}>
                  <p className={style['list-item-company__title']}>Перевозчик</p>
                  <p className={style['list-item-company__name']}>{data.RealCarrierName}</p>
                </div>
                <div className={style['list-item__place']}>
                  <p className={`${style['list-item__city']} ${style['text-right']}`}>{data.City2}</p>
                  <p className={`${style['list-item__adress']} ${style['text-right']}`}>{data.ArriveName}</p>
                </div>
              </div>
            </div>
            <div className={style['list-item-company--mobail']}>
              <p className={style['list-item-company__title--mobail']}>Перевозчик:</p>
              <p className={style['list-item-company__name--mobail']}>{data.RealCarrierName}</p>
            </div>
            <div className={style['list-item-details']}>
              <button type='button' className={`${style['list-item-details__btn']} ${isToggleDetailsComponent ? style.active : ''}`}
                onClick={() => setIsToggleDetailsComponent(prev => !prev)}>
                Детали маршрута
                <Image width={16} height={16} src={arrow} className={style['list-item-details__icon']} alt='' />
              </button>
              {data.BusOptions != undefined ? <ListItemIcons options={data.BusOptions} /> : null}

            </div>
            {isToggleDetailsComponent ?
              <div className={style['list-item-details-component']}>
                <div className={style['list-item-details-component__list']}>
                  {data.AllStops.map((item) => (
                    <div key={item.TimeArrive} className={`${style['list-item-details-component__item']} ${transferStart !== 0 ? style['start-transfer'] : ''} ${transferEnd !== 0 ? style['end-transfer'] : ''}`}>
                      <div className={style['list-item-details-component__data']}>
                        <p className={style['list-item-details-component__time']}>
                          {item.TimeArrive}
                        </p>
                        <p className={style['list-item-details-component__date']}>
                          {formatedDate(item.DateArrive)}
                        </p>
                      </div>
                      <div className={style['list-item-details-component__adress']}>
                        <p className={style['list-item-details-component__city']}>
                          {item.City}
                        </p>
                        <p className={style['list-item-details-component__street']}>
                          {item.Name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                {routeName === '' ? null :
                    <p className={style['list-item-details-component__text']}>
                      Полный маршрут: <span>{routeName}</span>
                    </p>
                  }
              </div> :
              null}

          </div>
          <div className={style['list-item-order']}>
            <div className={style['list-item-offer']}>
              <p className={style['list-item-offer__company']}>{data.CarrierName}</p>
              {sortedPrices[0] === data.Price[2].Ptar ?
                <div className={style['list-item-offer__best']}>
                  <p className={style['list-item-offer__text']}>Лучшая цена</p>
                </div> : null
              }
              {data.HasExpressAttr !== false ?
                <div className={`${style['list-item-offer__best']} ${style['list-item-offer__best--times']}`}>
                  <p className={style['list-item-offer__text']}>Самый быстрый</p>
                </div> : null

              }
            </div>
            <div className={style['list-item-order__inner']}>
              <p className={style['list-item-order__price']}>{data.Price[2].Ptar ? data.Price[2].Ptar : null} {data.Price[2].CurrencyName}</p>
              <div className={style['list-item-places--mobail']}>
                <p className={style['list-item-places__free']}>Осталось мест: {data.FreePlace} </p>
                <p className={style['list-item-places__stock']}>{data.CountFreePromos > 0 ? `Aкционных мест: ${data.CountFreePromos}` : null}</p>
              </div>
            </div>
            <button className={style['list-item-order__btn']}
              onClick={() => handleSuccess(searchId)}
            >
              {isLoadingFetch ? 'Идет поиск...' : 'Выбрать билет'}
            </button>
            <div className={style['list-item-places']}>
              <p className={style['list-item-places__free']}>Осталось мест: {data.FreePlace} </p>
              <p className={style['list-item-places__stock']}>{data.CountFreePromos > 0 ? `Aкционных мест: ${data.CountFreePromos}` : null} </p>
            </div>
          </div>
        </div>
      )
        : (
          <div className={`${style['list-item']} ${0 === data.Price[2].Ptar ? style['list-item--best'] : ''} `}>
            <div className={style['list-item-offer--mobail']}>
              <p className={style['list-item-offer__company']}>{data.RealCarrierName}</p>
              {0 === data.Price[2].Ptar ?
                <div className={`${style['list-item-offer__best']}`}>
                  <p className={style['list-item-offer__text']}>Лучшая цена</p>
                </div> : null
              }
            </div>
            <div className={style['list-item__wrapper']}>
              <div className={style['list-item-info']}>
                <div className={style['list-item-info__top']}>
                  <div className={`${style['list-item__data']} ${style['text-left']}`}>
                    <p className={style['list-item__date']}>{formatedDate(data.DateDepart)}</p>
                    <div className={style['list-item__time']}>{data.TimeDepart}</div>
                  </div>
                  <div className={style['list-item-spent']}>
                    <p className={style['list-item-spent__time']}>В пути: {data.Hour}ч {data.Minuts}мин</p>
                    {transfer !== 0 ?
                      <div className={style['list-item-spent__transfer']}>
                        <span>{transfer} </span>пересадка</div> : null
                    }
                    <div className={`${style['list-item-spent__img']} ${spentClassBackground}`} ></div>
                  </div>
                  <div className={`${style['list-item__data']} ${style['text-right']}`}>
                    <p className={style['list-item__date']}>{formatedDate(data.DateArrive)}</p>
                    <div className={style['list-item__time']}>{data.TimeArrive}</div>
                  </div>
                </div>
                <>
                  <div className={`${style['list-item-spent__img--mobail']} ${transfer !== 0 ? style['list-item-spent__img--mobail-transfer'] : ''}`}></div>
                </>
                <div className={style['list-item-info__bottom']}>
                  <div className={style['list-item__place']}>
                    <p className={`${style['list-item__city']} ${style['text-left']}`}>{data.City1}</p>
                    <p className={`${style['list-item__adress']} ${style['text-left']}`}>{data.DepartName}</p>
                  </div>
                  <div className={style['list-item-company']}>
                    <p className={style['list-item-company__title']}>Перевозчик</p>
                    <p className={style['list-item-company__name']}>{data.CarrierName}</p>
                  </div>
                  <div className={style['list-item__place']}>
                    <p className={`${style['list-item__city']} ${style['text-right']}`}>{data.City2}</p>
                    <p className={`${style['list-item__adress']} ${style['text-right']}`}>{data.ArriveName}</p>
                  </div>
                </div>
              </div>

              <div className={style['list-item-details']}>

                <button type='button' className={`${style['list-item-details__btn']} ${isToggleDetailsComponent ? style.active : ''}`}
                  onClick={() => setIsToggleDetailsComponent(prev => !prev)}>
                  Детали маршрута
                  <Image width={16} height={16} src={arrow} className={style['list-item-details__icon']} alt='' />
                </button>
                {data.BusOptions != undefined ? <ListItemIcons options={data.BusOptions} /> : null}

              </div>
              {isToggleDetailsComponent ?
                <div className={style['list-item-details-component']}>
                  <div className={style['list-item-details-component__list']}>
                    {data.AllStops.map((item) => (
                      <div key={item.TimeArrive} className={`${style['list-item-details-component__item']} ${transferStart !== 0 ? style['start-transfer'] : ''} ${transferEnd !== 0 ? style['end-transfer'] : ''}`}>
                        <div className={style['list-item-details-component__data']}>
                          <p className={style['list-item-details-component__time']}>
                            {item.TimeArrive}
                          </p>
                          <p className={style['list-item-details-component__date']}>
                            {formatedDate(item.DateArrive)}
                          </p>
                        </div>
                        <div className={style['list-item-details-component__adress']}>
                          <p className={style['list-item-details-component__city']}>
                            {item.City}
                          </p>
                          <p className={style['list-item-details-component__street']}>
                            {item.Name}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {routeName === '' ? null :
                    <p className={style['list-item-details-component__text']}>
                      Полный маршрут: <span>{routeName}</span>
                    </p>
                  }

                </div> :
                null}

            </div>
            <div className={style['list-item-order']}>
              <div className={style['list-item-offer']}>
                <p className={style['list-item-offer__company']}>{data.CarrierName}</p>
                {0 === data.Price[2].Ptar ?
                  <div className={style['list-item-offer__best']}>
                    <p className={style['list-item-offer__text']}>Лучшая цена</p>
                  </div> : null
                }
              </div>
              <div className={style['list-item-order__inner']}>
                <p className={style['list-item-order__price']}>{data.Price[2].Ptar ? data.Price[2].Ptar : null} {data.Price[2].CurrencyName}</p>
                <div className={style['list-item-places--mobail']}>
                  <p className={style['list-item-places__free']}>Осталось мест: {data.FreePlace} </p>
                  <p className={style['list-item-places__stock']}>{data.CountFreePromos > 0 ? `Aкционных мест: ${data.CountFreePromos}` : null}</p>
                </div>
              </div>
              <button className={style['list-item-order__btn']}
                onClick={() => handleSuccess(searchId)}
              >
                {isLoadingFetch ? 'Идет поиск...' : 'Выбрать билет'}
              </button>
              <div className={style['list-item-places']}>
                <p className={style['list-item-places__free']}>Осталось мест: {data.FreePlace} </p>
                <p className={style['list-item-places__stock']}>{data.CountFreePromos > 0 ? `Aкционных мест: ${data.CountFreePromos}` : null} </p>
              </div>
            </div>
          </div>
        )
      }
    </>

  );
};

export default ListRatesItem;