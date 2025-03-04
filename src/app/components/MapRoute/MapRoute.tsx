'use client';
import { IArrayStopsCity, getArrayStopsCity } from '@/app/utils/getArrayStopsCity';
import Script from 'next/script';
import React, { FC} from 'react';


interface INameRoute {
  
  arrayStopsCity: IArrayStopsCity[];
  arrayReserveStops: string[];
}
const MapRoute: FC <INameRoute> = ({arrayReserveStops,arrayStopsCity}) => {
  const keys = process.env.NEXT_PUBLIC_APY_KEY_MAP;
 
  const arrayCityMap = getArrayStopsCity(arrayStopsCity);
  console.log(arrayStopsCity)
  // console.log(cityStart, cityEnd)

  
  const initMap = () => {
    if (window.ymaps) {

      const ymaps = window.ymaps;
      ymaps.ready(() => {
        const map = new ymaps.Map('map', {
          center: [55.751574, 37.573856],
          zoom: 9,
          controls: []
        }, {
          suppressMapOpenBlock: true,
          copyrightLogoVisible: false
      });

      const mapStops = arrayCityMap !== undefined && arrayCityMap.length > 0 ? arrayCityMap : arrayReserveStops;
      const mapStopsSeo = arrayReserveStops !== undefined && arrayReserveStops.length > 0 ? arrayReserveStops : arrayCityMap;
      
    
      const multiRoute = new ymaps.multiRouter.MultiRoute({
          // Описание опорных точек мультимаршрута
          referencePoints: mapStopsSeo !== undefined ? mapStopsSeo : mapStops,
          
          // Параметры маршрутизации
          params: {
            // Указываем, что маршрут должен прокладываться по дорогам и выбираем один маршрут
            routingMode: "auto",
          
            results: 1
          }
        },
         {
          // Внешний вид линии маршрута.
          routeActiveStrokeWidth: 3,
          routeActiveStrokeColor: "#000088",
          boundsAutoApply: true,
        });
        map.geoObjects.add(multiRoute);
      });
    }
  };
  return (
    <div>
      <div id="map" style={{ width: '100%', height: '400px' }}></div>
      <Script strategy='lazyOnload' async
        onLoad={() => {
          initMap()
        }}
        src={`https://api-maps.yandex.ru/2.1/?apikey=${keys}&lang=ru_RU&load=package.standard`} />
    </div>
  );
};

export default MapRoute;