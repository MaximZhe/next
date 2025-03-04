'use client'
import Menu from '@/app/components/Header/Menu/Menu';
import style from './ChoiceTicketsPage.module.scss';
import { FC, useEffect, useState } from 'react';
import Breadcrumbs from '@/app/components/UI/Breadcrumbs/Breadcrumbs';
import Timer from '@/app/components/Timer/Timer';
import Counter from '@/app/components/Counter/Counter';
import OrderForm from '@/app/components/OrderForm/OrderForm';
import { useAppSelector } from '@/app/hooks/redux';
import { usePathname, useSearchParams} from 'next/navigation';
import { IItemFullBusPlaces } from '@/app/types/types';
import { formatedDateRoute } from '@/app/utils/formatedDateRoute';
import { WindowScreenUser } from '@/app/utils/windowScreen';
import { usePriceBaggageContext, usePriceContext } from '@/contex';
import Modal from '@/app/components/UI/Modal/Modal';
import { useModalContext } from '@/contex/modal';





interface IClientProps {
  params: {
    slug: string,
  }
}
interface IArrayDateRoute {
  dateDepart: string | undefined,
  dateArrival: string | undefined
}


// type Place = {
//   Seat: number;
//   IsFree: boolean;
//   Row: number;
//   Col: number;
//   Floor: number;
// };

const ChoiceTicketsPage: FC<IClientProps> = ({ params }) => {
  const { Route } = useAppSelector((state: any) => state.singleRouteReduser)
  const { priceFormTarifs } = useAppSelector((state) => state.priceFormTarifsReduser);
  const valueId = params.slug
  const pathname = usePathname();

  const { pricePromo, setPricePromo } = usePriceContext();
  const { priceBaggage, setPriceBaggage } = usePriceBaggageContext()
  const [windowWidth, setWindowWidth] = useState(0);
  const [isTicketPage, setIsTicketPage] = useState(false);
  const [countUser, setCountUser] = useState(1)
  const [arrayPlaces, setArrayPlaces] = useState<IItemFullBusPlaces[]>([])
  const [dateRoute, setDateRoute] = useState<IArrayDateRoute>({ dateDepart: '', dateArrival: '' })
  const [dataResultRoute, setDataResultRoute] = useState<any>([])

  const [resultSumPrice, setResultSumPrice] = useState(0);
  const [selectedTariffs, setSelectedTariffs] = useState<any[]>([]);
  const [resultArrayPrice, setResultArrayPrice] = useState<any[]>([]);
  const searchPar = useSearchParams();
  const newValueId = searchPar.get('id')

  useEffect(() => {
    const isTicketPage = pathname === `/find/client`;
    setIsTicketPage(isTicketPage);
  }, [pathname]);
useEffect(() => {

}, [priceBaggage])

  useEffect(() => {
    const dateDepartRoute = formatedDateRoute(Route?.Result?.Route?.DateDepart);
    const dateArrivalRoute = formatedDateRoute(Route?.Result?.Route?.DateArrive);
    setDateRoute({ dateDepart: dateDepartRoute, dateArrival: dateArrivalRoute })
    // Проверяем, есть ли данные в localStorage

    const storeRoute = localStorage.getItem('routeData');
  
    const res = Route?.Result?.Route?.FullBusPlaces;

      if (res && res.length > 0) {
        const sortedRes = [...res]; // Создаем копию массива
        sortedRes.sort(compare); // Сортируем копию массива
        setArrayPlaces(sortedRes); // Устанавливаем отсортированный массив в состояние
        
      }
  }, [Route]);

  // При обновлении данных из Redux, обновляем данные в state и localStorage
  useEffect(() => {
    const res = Route.Result?.Route?.FullBusPlaces;
    if (res && res.length > 0) {
      const sortedRes = [...res];
      sortedRes.sort(compare);
      setArrayPlaces(sortedRes);
     
    }
    const resultGetRoute = Route?.Result?.Route;
    if (resultGetRoute) {
      
      setDataResultRoute(resultGetRoute);
    }
  }, [Route]);
  useEffect(() => {
    const newPricePromo = parseFloat(pricePromo);
    if (newPricePromo > 0) {
      setResultSumPrice(newPricePromo)
      setPricePromo('')
    } else {
      console.log('скидки нет')
    }

  }, [pricePromo]);
  
  /*фильтруем маста полученные с сервера в массив для отрисовки карты автобуса*/
  function compare(a: { Row: number; Col: number; }, b: { Row: number; Col: number; }) {
    if (a.Row < b.Row) {
      return -1;
    }
    if (a.Row > b.Row) {
      return 1;
    }
    if (a.Col < b.Col) {
      return -1;
    }
    if (a.Col > b.Col) {
      return 1;
    }
    return 0;
  }

  const handleGetCountValue = (value: number) => {
    setCountUser(value);
  };

  const FullBusPlaces = arrayPlaces

  const sortedArrays = [];
  let currentRow = 0;

  let currentArray: { Seat: number; IsFree: boolean; Row: number; Col: number; Floor: number; }[] = [];

  FullBusPlaces.forEach(place => {
    if (place.Row !== currentRow) {
      sortedArrays.push(currentArray);
      currentArray = [];
      currentRow = place.Row;
    }
    currentArray.push(place);
  });

  sortedArrays.push(currentArray);

  sortedArrays.forEach(array => {
    array.sort((a, b) => a.Floor - b.Floor);
  });
  const maxCol = Math.max(...FullBusPlaces.map(place => place.Col));
  const links = [
    { label: 'Главная', href: '/' },
    { label: 'Поиск билетов', href: '/find', back: true },
    { label: 'Оформление билетов', href: `/find/client/${valueId}`, active: true },
  ];
  const handleifChangeTariffs = (index: number, selectedTarifId: any) => {
    setSelectedTariffs((prevPassengers: any) => {
      const updatedPassengers = [...prevPassengers];
      const existingPassenger = updatedPassengers.find((passenger: any) => passenger.index === index);
      if (existingPassenger) {
        existingPassenger.selectedTarifId = selectedTarifId;
      } else {
        updatedPassengers.push({ index, selectedTarifId });
      }
      return updatedPassengers.filter(item => item.selectedTarifId !== undefined && item.selectedTarifId.label !== '');
    });
  };

  useEffect(() => {
    const handleArraySlice = (arr: any[], countUser: number) => {
      const newArray = arr.slice(0, countUser);
      return newArray;
    };

    if (selectedTariffs.length > countUser) {
      const newSelectedTariffs = handleArraySlice(selectedTariffs, countUser);
      setSelectedTariffs(newSelectedTariffs);
    }
  }, [countUser]);



  // Создаем новый массив цен на основе выбранных тарифов
  useEffect(() => {
    const newResultArrayPrice = selectedTariffs.map((selectedItem: any) => {
      const selectedTarifId = selectedItem.selectedTarifId.label;
      const price = Route?.Result?.Route?.Routes[0]?.Tariffs.find((item: any) => item.Name === selectedTarifId)?.Prices[2].Value || 0;
      return price;
    });

    setResultArrayPrice(newResultArrayPrice);
  }, [selectedTariffs]);

  useEffect(() => {
    if (resultArrayPrice.length > 0 || priceBaggage.length > 0) {
      const currentSum = resultArrayPrice.reduce((acc, curr) => acc + curr, 0);
      const prevBaggageLength = priceBaggage.length;
      const prevBaggage = priceBaggage[0];
      const prevSum = resultSumPrice;
      const diff = currentSum - prevSum;
      if (diff > 0) {
        setResultSumPrice(prev => prev + diff);
      } else if (diff < 0) {
        setResultSumPrice(prev => prev + diff);
      }
      if(priceBaggage.length > 0) {
        setResultSumPrice(prev => prev + prevBaggage);
      }
    }
  }, [resultArrayPrice, priceBaggage]);

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
  const { isModal } = useModalContext();

  return (
    <>
      <Menu responsive={true} />
      <section className={style.tickets}>
        <div className='container'>
          <div className={style['tickets__wrapper']}>
            <Modal isOpen={isModal}>
              <h1>Время бронирования вышло</h1>

            </Modal>
            
            <Breadcrumbs links={links} />
            <div className={style['tickets-item']}>
              <div className={style['tickets-item__header']}>
                <h1 className={style['tickets-item-info__main-title']}>
                  {dataResultRoute.City1} - {dataResultRoute.City2}
                </h1>
                <div className={style['tickets-item-info-timer']}>
                  <p className={style['tickets-item-info-timer__text']}>
                    {windowWidth < 768 ? 'Осталось:' : 'До конца оформления осталось:'}
                  </p>
                  <div className={style['tickets-item-info-timer__value']}>
                    <Timer isTicketPage={isTicketPage} />
                  </div>
                </div>
              </div>
              <div className={style['tickets-item-info']}>
                <div className={style['tickets-item-info__left']}>
                  <p className={style['tickets-item-info__subtitle']}>
                    Отправление
                  </p>
                  <p className={style['tickets-item-info__date']}>
                    {dateRoute.dateDepart} в {dataResultRoute.TimeDepart}
                  </p>
                  <p className={style['tickets-item-info__place']}>
                    {dataResultRoute.DepartName}
                  </p>
                  <div className={style['tickets-item-info__container']}>
                    <h2 className={style['tickets-item-info__title']}>
                      Количество пассажиров
                    </h2>
                    <Counter
                      className={`${style['tickets-item-info-counter']}`}
                      initialStateValue={1}
                      getCountValue={handleGetCountValue} />
                  </div>
                </div>
                <div className={style['tickets-item-info__right']}>

                  <p className={style['tickets-item-info__subtitle']}>
                    Прибытие
                  </p>
                  <p className={style['tickets-item-info__date']}>
                    {dateRoute.dateArrival} в {dataResultRoute.TimeArrive}
                  </p>
                  <p className={style['tickets-item-info__place']}>
                    {dataResultRoute.ArriveName}
                  </p>
                  <div className={style['tickets-item-info__container']}>
                    <div className={style['tickets-item-info-price']}>
                      <p className={style['tickets-item-info-price__text']}>
                        Стоимость
                      </p>
                      <p className={style['tickets-item-info-price__full']}>
                        {resultSumPrice} RUB
                      </p>
                      <p className={style['tickets-item-info-price__tickets']}>
                        за {countUser} {countUser > 1 ? 'билета' : 'билет'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <OrderForm countUser={countUser} places={sortedArrays} maxCol={maxCol} pricePay={resultSumPrice} getTarrifs={handleifChangeTariffs}
                arrayTariffs={selectedTariffs} newSearchId={newValueId} />
            </div>
          </div>
        </div>
      </section>
    </>

  );
};

export default ChoiceTicketsPage;