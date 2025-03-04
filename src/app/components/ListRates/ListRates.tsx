'use client'
import { FC, Suspense, useEffect, useState } from 'react';
import style from './ListRates.module.scss';
import SearchForm from '../SearchForm/SearchForm';
import ListRatesFilterButtons from '../ListRatesFilterButtons/ListRatesFilterButtons';


import { GridLoader } from 'react-spinners';
import { IItemCarrierRoutes, IItemRoutes, ITariffData } from '@/app/types/types';
import { useAppDispatch, useAppSelector } from '@/app/hooks/redux';
import ListRatesItem from '../ListRatesItem/ListRatesItem';
import Breadcrumbs from '../UI/Breadcrumbs/Breadcrumbs';
import { usePathname, useSearchParams } from 'next/navigation';
import Menu from '../Header/Menu/Menu';
import Button from '../UI/Button/Button';
import Loading from '../../loading';
import ModalErrorsSearchId from '../UI/Modal/ModalErrorsSearchId/ModalErrorsSearchId';
import { useModalErrorSearchIdContext } from '@/contex/modal';
import { parseUrls } from '@/app/utils/splitUrl';
import { getRouteContent } from '@/app/api/actionGetRouteContent';
import { fetchDataUpdate } from '@/app/api/updateRoutesList';
import { searchhRoutes } from '@/app/api/actionSearchRoutes';
import { splitCityName } from '@/app/utils/splitCityNameSearch';
import { setDataRoute } from '@/redux/slice/getRoutesSlice';

export interface IRoute {
  CarrierRoutes: IItemCarrierRoutes[];
}
type ListRatesProps = {
  analytics: {
    clientId: string | undefined;
    referer: string | undefined;
  };
};
interface INewValues {
  cityDepartName: string;
  cityArravalName: string;
  cityDepartNameSeo: string;
  cityArravalNameSeo: string;
  cityIdDeparture: string;
  cityIdArrival: string;
}
const ListRates: FC<ListRatesProps> = ({ analytics }) => {

  const dispatch = useAppDispatch();
  const context = useModalErrorSearchIdContext();
  const links = [
    { label: 'Главная', href: '/' },
    { label: 'Поиск билетов', href: '/find', active: true },
  ];
  const [visibleItems, setVisibleItems] = useState(4);
  const itemsPerPage = 4;

  const handleShowMore = () => {
    setVisibleItems(prevVisibleItems => prevVisibleItems + itemsPerPage);
  };  
  const searchParams = useSearchParams();
  const newDates:string | null = searchParams.get('date');
  const path = usePathname();
  const nameCityRoutes = path.split('/').slice(3)[0].split('-')
  
  const [newSearchId, setNewSearchId] = useState('');
  const [routeData, setRouteData] = useState<ITariffData>({
    Result: {
      CarrierRoutes: [],
      CityArrival: 0,
      CityDeparture: 0,
      DateDeparture: '',
      Id: '',
      IsActive: false,
      IsDynamic: false,
      DateCreate: ''
    },
    Error: null
  })

  const [loading, setLoading] = useState(true);
  const [routes, setRoutes] = useState<IItemRoutes[]>([]);
  const [activeButton, setActiveButton] = useState('');
  const [newValueSearch, setNewValueSearch] = useState<INewValues>({
    cityDepartName: '',
    cityArravalName: '',
    cityDepartNameSeo: '',
    cityArravalNameSeo: '',
    cityIdDeparture: '',
    cityIdArrival: '',
  });

  
  useEffect(() => {
    
    const funcrtionGetRoutesData = async () => {
      try {
        const res = await getRouteContent(nameCityRoutes[0], nameCityRoutes[1]);
        if (res) {
          console.log(res)
          setNewValueSearch(res)
          
        }
        const data = await fetchDataUpdate(res, newDates);

        const newId = data
        console.log(newId)
        // const newId = data?.Result?.Id;
        setNewSearchId(newId);
      } catch (error) {
        console.error('Данные для нового searchId не получены:', error);
      }
    };

    funcrtionGetRoutesData();
  }, []);

  const searchProps = {
    citySearchDeparture:splitCityName(newValueSearch.cityDepartNameSeo),
    citySearchArrival: splitCityName(newValueSearch.cityArravalNameSeo),
    dateSearch: newDates
  }


  useEffect(() => {
    const fetchDynamicRoutes = async (id: string) => {

      try {
        const response = await searchhRoutes(id)
        console.log(response)
        setRouteData(response);
        dispatch(setDataRoute(response));
        if(response?.Result?.CarrierRoutes){
          const fetchedRoutes:[] = response?.Result?.CarrierRoutes.map((item: { Routes: any; }) => item.Routes).flat();
        
          const sortedFetchedRoutes = fetchedRoutes.slice().sort((a: any, b: any) => {
            const aPtar = typeof a.Price[2].Ptar === 'string' ? parseFloat(a.Price[2].Ptar) : a.Price[2].Ptar;
            const bPtar = typeof b.Price[2].Ptar === 'string' ? parseFloat(b.Price[2].Ptar) : b.Price[2].Ptar;
    
            // Проверка на NaN
            if (isNaN(aPtar) || isNaN(bPtar)) {
              console.error('Invalid price data:', a, b);
              return 0; // Не сортируем, если данные некорректны
            }
    
            return aPtar - bPtar; // Сортировка по возрастанию
          });
          console.log('Sorted Fetched Routes:', sortedFetchedRoutes);
          setRoutes(sortedFetchedRoutes);
          setActiveButton('Стоимость по возрастанию');
        }
        
      


        // dispatch(setStoregeRoute(dat.Result.CarrierRoutes.map((item: { Routes: any; }) => item.Routes).flat()));
        setLoading(routeData?.Result?.IsActive)
      } catch (error) {

        console.error('Ошибка при отправке данных на сервер:', error);
      }
    };
    if(newSearchId){
      fetchDynamicRoutes(newSearchId);
      console.log('Используем новый searchId' + newSearchId)
     }

    if (routeData.Result?.IsActive) {
      const timer = setInterval(async () => {
        if (routeData.Result?.Id === '') {
          await fetchDynamicRoutes(newSearchId);
        } else {
          await fetchDynamicRoutes(routeData.Result.Id);
        }

      }, 2000);

      return () => {
        clearInterval(timer);
        setLoading(false)
      };
    } else {

    }
  
  }, [newSearchId, routeData.Result?.Id, routeData.Result?.IsActive])

  if (typeof window !== 'undefined') {
    sessionStorage.setItem('Analytics', JSON.stringify(analytics));
  }

  const sortedRoutesPriceBest = (routes: any[]) => {
    return routes.map(item => item.Price[2].Ptar).sort((a, b) => a - b);
  }
  
  
  const sortedRoutesPrice = () => {
    if (activeButton === 'Стоимость по возрастанию') {
      const newArrayRoutes = [...routes].sort((a, b) => {
        const aPtar = typeof a.Price[2].Ptar === 'string' ? parseFloat(a.Price[2].Ptar) : a.Price[2].Ptar;
        const bPtar = typeof b.Price[2].Ptar === 'string' ? parseFloat(b.Price[2].Ptar) : b.Price[2].Ptar;
        if (isFinite(aPtar) && isFinite(bPtar)) {
          return bPtar - aPtar;
        }
        return 0;
      });
      setRoutes(newArrayRoutes);
      setActiveButton('Стоимость по убыванию');
    } else {
      const newArrayRoutes = [...routes].sort((a, b) => {
        const aPtar = typeof a.Price[2].Ptar === 'string' ? parseFloat(a.Price[2].Ptar) : a.Price[2].Ptar;
        const bPtar = typeof b.Price[2].Ptar === 'string' ? parseFloat(b.Price[2].Ptar) : b.Price[2].Ptar;
        if (isFinite(aPtar) && isFinite(bPtar)) {
          return aPtar - bPtar;
        }
        return 0;
      });
      setRoutes(newArrayRoutes);
      setActiveButton('Стоимость по возрастанию');
    }
  };
  const sortedRoutesTimeDepart = () => {
    if (activeButton === 'Время отправления по возрастанию') {
      const newArrayRoutes = [...routes].sort((a, b) => {
        const aTime = a.TimeDepart.split(':').map(Number);
        const bTime = b.TimeDepart.split(':').map(Number);
        const aMinutes = aTime[0] * 60 + aTime[1];
        const bMinutes = bTime[0] * 60 + bTime[1];
        return bMinutes - aMinutes;
      });
      setRoutes(newArrayRoutes);
      setActiveButton('Время отправления по убыванию');
    } else {
      const newArrayRoutes = [...routes].sort((a, b) => {
        const aTime = a.TimeDepart.split(':').map(Number);
        const bTime = b.TimeDepart.split(':').map(Number);
        const aMinutes = aTime[0] * 60 + aTime[1];
        const bMinutes = bTime[0] * 60 + bTime[1];
        return aMinutes - bMinutes;
      });
      setRoutes(newArrayRoutes);
      setActiveButton('Время отправления по возрастанию');
    }
  }
  const sortedRoutesTimeArrive = () => {
    if (activeButton === 'Время прибытия по возрастанию') {
      const newArrayRoutes = [...routes].sort((a, b) => {
        const aTime = a.TimeArrive.split(':').map(Number);
        const bTime = b.TimeArrive.split(':').map(Number);
        const aMinutes = aTime[0] * 60 + aTime[1];
        const bMinutes = bTime[0] * 60 + bTime[1];
        return bMinutes - aMinutes;
      });
      setRoutes(newArrayRoutes);
      setActiveButton('Время прибытия по убыванию');
    } else {
      const newArrayRoutes = [...routes].sort((a, b) => {
        const aTime = a.TimeArrive.split(':').map(Number);
        const bTime = b.TimeArrive.split(':').map(Number);
        const aMinutes = aTime[0] * 60 + aTime[1];
        const bMinutes = bTime[0] * 60 + bTime[1];
        return aMinutes - bMinutes;
      });
      setRoutes(newArrayRoutes);
      setActiveButton('Время прибытия по возрастанию');
    }
  }
  const sortedRoutesTimeFull = () => {
    if (activeButton === 'Время в пути по возрастанию') {
      const newArrayRoutes = routes.sort((a, b) => {
        const aTime = parseInt(a.Hour) * 60 + parseInt(a.Minuts);
        const bTime = parseInt(b.Hour) * 60 + parseInt(b.Minuts);
        return bTime - aTime;
      });

      setRoutes(newArrayRoutes);
      setActiveButton('Время в пути по убыванию');
    } else {
      const newArrayRoutes = routes.sort((a, b) => {
        const aTime = parseInt(a.Hour) * 60 + parseInt(a.Minuts);
        const bTime = parseInt(b.Hour) * 60 + parseInt(b.Minuts);
        return aTime - bTime;
      });

      setRoutes(newArrayRoutes);
      setActiveButton('Время в пути по возрастанию');
    }
  }
  const sortedPrices = sortedRoutesPriceBest(routes);
  const { isModalErrorSearchId } = useModalErrorSearchIdContext();
  return (
    <>
      <ModalErrorsSearchId isOpen={isModalErrorSearchId}>
        <p>Данные поиска устарели, выполните поиск занаво.</p>
      </ModalErrorsSearchId>
      <Menu responsive={true} />
      <section className={style.rates}>
        <div className={style['rates__header-wrapper']}>
          <h1 className={style['rates__title']}>Поиск билетов по маршруту {splitCityName(newValueSearch.cityDepartNameSeo)[0]} — {splitCityName(newValueSearch.cityArravalNameSeo)[0]}</h1>
          <SearchForm className={style['rates__form']} searchProps={searchProps} arrayValueCity={newValueSearch} />
        </div>


        <div className='container'>
          <div className={style['rates__wrapper']} >
            <div className={style['rates__header']} >
              <Breadcrumbs links={links} />
              <div className={style['rates__filter']} >
                <ListRatesFilterButtons onClick={sortedRoutesTimeDepart} isSort={activeButton === 'Время отправления по возрастанию'} title={'Время отправления '} />
                <ListRatesFilterButtons onClick={sortedRoutesTimeArrive} isSort={activeButton === 'Время прибытия по возрастанию'} title={'Время прибытия'} />
                <ListRatesFilterButtons onClick={sortedRoutesTimeFull} isSort={activeButton === 'Время в пути по возрастанию'} title={'Время в пути'} />
                <ListRatesFilterButtons onClick={sortedRoutesPrice} title={'Стоимость'} isSort={activeButton === 'Стоимость по возрастанию'} />
              </div>
            </div>
            <Suspense fallback={<Loading />}>
              <div className={style.list}>
                {routeData.Result?.IsActive === true ?
                  <GridLoader color={'#0243A6'} loading={loading} size={10} />
                  : null}
                {routes.length !== 0 ? (
                  routes.slice(0, visibleItems).map((data) => (
                    <ListRatesItem key={data.Id} searchId={newSearchId} data={data} sortedPrices={sortedPrices}/>
                  ))
                ) : (
                  loading === false ? <p>Извините, маршруты не найдены</p> : null
                )}
                <Button disabled={routes.length > visibleItems ? false : true}
                  type='button'
                  onClick={handleShowMore}
                  className={`${style['rates__btn']} ${routes.length > visibleItems ? '' : `${style['disabled']}`}`}>
                  <p className='sales__btn-text'>Показать еще</p>

                </Button>
              </div>
            </Suspense>
          </div>
        </div>
      </section>
    </>

  );
};

export default ListRates;

