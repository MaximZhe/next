'use client'

import { FC, useEffect, useState } from "react";
import { FormProvider, useForm, Controller } from "react-hook-form";

import ConsentBox from '../СonsentBox/СonsentBox';
import style from './OrderForm.module.scss'
import PassengerCard from '../PassengerCard/PassengerCard';
import BusTicket from '../BusTicket/BusTicket';
import ContactsUser from '../ContactsUser/ContactsUser';
import PromoOrder from '../PromoOrder/PromoOrder';
import { createNumberArray } from '@/app/utils/createCountUsers';
import { useAppSelector } from "@/app/hooks/redux";
import { formatedDateFetch } from "@/app/utils/formatedDateFetch";

import { useRouter } from "next/navigation";
import CommentOrder from "../CommentOrder/CommentOrder";

import { Passenger } from "@/app/types/types";
import { updatePassengerArray } from "@/app/utils/updatePassengerArray";
import ModalErrors from "../UI/ModalErrors/ModalErrors";
import { useModalErrorContext, useModalErrorFormContext } from "@/contex/modal";
import ModalErrorsForm from "../UI/Modal/ModalErrorsForm/ModalErrorsForm";
import { usePriceBaggageContext } from "@/contex";
import { deleteCookie, setCookie } from "cookies-next";
import { getBooking } from "@/app/api/actionGetPlay";

export interface IBusPlace {
  Col: number,
  Floor: number,
  IsFree: boolean,
  Row: number,
  Seat: number
}
interface ICountUser {
  countUser: number,
  places: IBusPlace[][],
  maxCol: number,
  pricePay: number,
  getTarrifs: (index: number, selectedTarifId: any) => void,
  arrayTariffs: any[],
  newSearchId: string | null
}

export interface IIDRoutes {
  searchId: string,
  routeId: string
}
interface arrayDataPromoCode {
  counterUser: number,
  arrayTariffsRoute: any[],
  carrierName: string,
  placePromo: number,
}
const FormComponent: FC<ICountUser> = ({ countUser, places, maxCol, pricePay, getTarrifs, arrayTariffs,newSearchId }) => {

  const { Route } = useAppSelector((state: any) => state.singleRouteReduser);
  const { dataRoute } = useAppSelector((state: any) => state.dataRouteReduser);
  const [idRoutes, setIdRoutes] = useState<IIDRoutes>({ searchId: '', routeId: '' });
  const [selectedPlaces, setSelectedPlaces] = useState<any[]>([]);
  const [selectedBaggage, setSelectedBaggage] = useState<number>(0);
  const [selectedPromoCode, setSelectedPromoCode] = useState<string>('');
  const [isLoadingPay, setIsLoadingPay] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { isModalError, setIsModalError } = useModalErrorContext();
  const { isModalErrorForm, setIsModalErrorForm } = useModalErrorFormContext();
  const [arrayErrorMessage, setArrayErrorMessage] = useState<string[]>([]);
  const [statePromoCode, setStatePromoCode] = useState<arrayDataPromoCode>({
    counterUser: 0,
    arrayTariffsRoute: [],
    carrierName: '',
    placePromo: 0
  });
  const numberArray = createNumberArray(countUser);
  const [analyticsData, setAnalyticsData] = useState<any>({})
  const router = useRouter();
  const { priceBaggage, setPriceBaggage } = usePriceBaggageContext()
  const [isConvertion, setIsConvertion] = useState(false)
  
  useEffect(() => {
    const analyticsDat = sessionStorage.getItem('Analytics');
    if (analyticsDat) {
      const result = JSON.parse(analyticsDat)
      setAnalyticsData({
        clientId: result.clientId,
        referer: result.referer
      })
    }

  }, [])
useEffect(() => {
  if(window){
    const getConversion = () => {
      (window as any).gtag('event', 'conversion', {
        'send_to': 'AW-452650656/8rKICJr_o5ECEKDN69cB',
        'value': pricePay,
        'currency': 'RUB',
        'transaction_id': '',
      });
      //console.log('convertion analitycs true')
    }
    if(isConvertion){
      getConversion()
    }else(
      console.log('no convertion analitycs')
    )
  }else{
    console.log('error convertion')
  }
},[ isConvertion, pricePay])
  // useEffect(() => {
  //   console.log(analyticsData)
  // }, [analyticsData])

  useEffect(() => {
    if (Route && dataRoute) {
      setIdRoutes({ searchId: dataRoute?.Result?.Id, routeId: Route?.Result?.Route.Id })
    }
    console.log(dataRoute)
  }, [Route, dataRoute])

  function transformArray(passengersArray: Passenger[]) {
    return Object.values(passengersArray);
  }
  useEffect(() => {
    setStatePromoCode({
      counterUser: countUser,
      arrayTariffsRoute: arrayTariffs,
      carrierName: Route?.Result?.Route?.CarrierName,
      placePromo: Route.Result?.Route?.CountFreePromos
    })
  }, [countUser, arrayTariffs, Route?.Result?.Route?.CarrierName, Route?.Result?.Route?.CountFreePromos])
  const getPay = async (formDatas: any) => {
    setIsLoadingPay(true);
    const transformedPassengers = transformArray(formDatas.Passengers);
    const datas: any =
    {
      Passengers: transformedPassengers,
      Phone: formDatas.Phone,
      PhoneTwo: formDatas.PhoneTwo,
      Email: formDatas.Email,
      CurrencyId: formDatas.CurrencyId,
      PaySystem: formDatas.PaySystem,
      ExtraBaggage: formDatas.ExtraBaggage,
      PromoCode: formDatas.PromoCode,
      Note: formDatas.Note,
      RouteId: formDatas.RouteId,
      HasSubscription: formDatas.HasSubscription,
      Analytics: formDatas.Analytics,
      SearchId: formDatas.SearchId,
      Lang: formDatas.Lang,
      SiteVersionId: formDatas.SiteVersionId
    };
    try {
      const response = await getBooking(datas);
      if (response) {
        const Results = response;
        if (Results.Result !== null) {
          setIsLoadingPay(false);
          router.replace(Results.Result.ExternalUrl);
          setCookie('emailUser', formDatas.Email);
          deleteCookie('referer');
          setIsConvertion(true)
        } else {
          // console.log(Results)
          setIsLoadingPay(false);
          setErrorMessage(Results.Error.Message);
          setIsModalError(true);
        }
      }

    } catch (error) {
      setIsLoadingPay(false);
      console.log(error)
       console.log(datas)
    } finally {
    }
  };

  const handlePlaceSelection = (selectedPlace: any) => {

    const index = selectedPlaces.findIndex((place) => place === selectedPlace);
    if (index !== -1) {
      setSelectedPlaces((prevSelectedPlaces) => {
        const updatedSelectedPlaces = [...prevSelectedPlaces];
        updatedSelectedPlaces.splice(index, 1);
        return updatedSelectedPlaces;
      });
    } else {
      if (selectedPlaces.length < countUser) {
        setSelectedPlaces((prevSelectedPlaces) => [...prevSelectedPlaces, selectedPlace]);
      }
    }
    
  };
  // useEffect(() => {
  //   console.log(selectedPlaces)
  // }, [selectedPlaces])
  
  const handleBaggage = (baggageCount: number) => {
    setSelectedBaggage(baggageCount)
  }
  const handlePromoCode = (valuePromoCode: string) => {
    setSelectedPromoCode(valuePromoCode)
  }

  const methods = useForm({
    defaultValues: {
      Passengers: {
        1: {
          FirstName: '',
          LastName: '',
          MiddleName: '',
        }
      },
      Phone: '',
      PhoneTwo: '',
      Email: '',
      CurrencyId: 4,
      PaySystem: 'alphaBank',
      PromoCode: '',
      ExtraBaggage: 0,
      Note: '',
      SiteVersionId: 2,
      HasSubscription: false,
      termsAcceptedPolity: false,
      termsAcceptedProcessing: false,
      Analytics: {
        Url: "",
        Refferer: "",
        GoogleClientId: ""
      },
      RouteId: '',
      SearchId: '',
      Lang: "RUS"
    },
    mode: 'onBlur'
  });

  function validateForm() {
    const newErrorMessages: string[] = [];
    const passengerErrors = methods.getFieldState('Passengers').error
    const phoneErrors = methods.getFieldState('Phone').error
    const emailErrors = methods.getFieldState('Email').error
    const termsAcceptedPolityErrors = methods.getFieldState('termsAcceptedPolity').error
    const termsAcceptedProcessingErrors = methods.getFieldState('termsAcceptedProcessing').error

    setTimeout(() => {

      if (passengerErrors) {
        newErrorMessages.push('Данные о пассажире не заполнены');
      }
      if (phoneErrors) {
        newErrorMessages.push('Номер телефона не заполнен');
      }
      if (emailErrors) {
        newErrorMessages.push('Email не заполнен');
      }
      if (termsAcceptedPolityErrors) {
        newErrorMessages.push('Политика конфиденциальности не принята');
      }
      if (termsAcceptedProcessingErrors) {
        newErrorMessages.push('Согласие на обработку персональных данных не принято');
      }
      if (selectedPlaces.length < countUser && Route?.Result?.Route?.FullBusPlaces !== null && Route?.Result?.Route?.FullBusPlaces.length > 0) {
        newErrorMessages.push('Выберите место');
      }
      if (newErrorMessages.length > 0) {
        setArrayErrorMessage(newErrorMessages);
      }
    }, 0)

  }

  useEffect(() => {
    if (arrayErrorMessage.length > 0) {
      setIsModalErrorForm(true)
    }
  }, [arrayErrorMessage])
  const handleFormSubmit = (data: any) => {
    // Обновляем пассажира в Passengers с выбранным местом
    // console.log(data.Passengers)
    const checkLengthPassengers = updatePassengerArray(data.Passengers, countUser);
    // console.log(checkLengthPassengers)
    const updatedPassengers = Object.keys(checkLengthPassengers).map((passengerKey, index) => {
      const newDatePassager = formatedDateFetch(data.Passengers[passengerKey].Birthdate);

      const updatedPassenger = {
        ...data.Passengers[passengerKey],
        PlaceNumber: Route?.Result?.Route?.FullBusPlaces?.length === 0 || Route?.Result?.Route?.FullBusPlaces === null
          ? 0
          : selectedPlaces[index] && selectedPlaces[index].Seat ? selectedPlaces[index].Seat : data.Passengers[passengerKey].PlaceNumber,
        Birthdate: newDatePassager,
        TarifId: data.Passengers[passengerKey].TarifId.value,
        Citizenship: data.Passengers[passengerKey].Citizenship.value,
        DocumentId: data.Passengers[passengerKey].DocumentId.value,
      };
      return Object.keys(updatedPassenger).length > 0 ? { [passengerKey]: updatedPassenger } : null;
    }).filter(passenger => passenger !== null);




    const updatedData = {
      ...data,
      Passengers: Object.assign({}, ...updatedPassengers),
      RouteId: idRoutes.routeId,
      SearchId: idRoutes.searchId,
      Analytics: {
        Url: analyticsData.referer,
        Refferer: analyticsData.referer,
        GoogleClientId: analyticsData.clientId
      },
      ExtraBaggage: selectedBaggage,
      PromoCode: selectedPromoCode
    };

    if (selectedPlaces.length < countUser && Route?.Result?.Route?.FullBusPlaces?.length !== 0 && Route?.Result?.Route?.FullBusPlaces !== null) {
      validateForm()
    } else {
      getPay(updatedData);
    }

  };
  useEffect(() => {
    if (Route && Route?.Result?.Route?.BaggagePrices) {
      const priceBuggages = selectedBaggage * Route?.Result?.Route?.BaggagePrices[2].Value;
      setPriceBaggage((prevBaggage: any) => {
        // Создаем новый массив, содержащий только необходимое количество элементов
        const newBaggage = Array(selectedBaggage).fill(priceBuggages);
        return newBaggage;
      });
    }
  }, [selectedBaggage]);

  return (
    <>
      <ModalErrors isOpen={isModalError} >
        <p>{errorMessage}</p>
      </ModalErrors>
      <ModalErrorsForm isOpen={isModalErrorForm} >
        <p className={style['order-form__error-title']}>Пожалуйста, заполните следующие поля:</p>
        <ul className={style['order-form__error-list']}>
          {arrayErrorMessage.map((message: string, index: number) =>
            <li key={index} className={style['order-form__error-item']}>{message}</li>)}
        </ul>
      </ModalErrorsForm>
      <FormProvider {...methods}>
        <form className={style['order-form']} onSubmit={methods.handleSubmit(handleFormSubmit, validateForm)}>
          <div className={style['order-form__users']}>
            {numberArray.map((number: any) => (
              <PassengerCard key={number} countUser={number}
                className={`${style['order-form__item']}`}
                controller={Controller}
                handleifChangeTariffs={getTarrifs} />
            ))}
          </div>
          <BusTicket places={places} maxCol={maxCol}
            handlePlaceSelection={handlePlaceSelection}
            countUser={countUser}
            selectedPlaces={selectedPlaces}
            handleBaggage={handleBaggage}
            newSearchId={newSearchId}

          />
          <CommentOrder />
          <ContactsUser controllers={Controller} />
          {statePromoCode.counterUser === 1 && statePromoCode.arrayTariffsRoute.length > 0 &&
            statePromoCode.arrayTariffsRoute[0].selectedTarifId.label !== 'DT (до 12 лет)' &&
            statePromoCode.carrierName === 'Intercars' &&
            statePromoCode.placePromo > 0 ?
            <PromoOrder handlePromoCode={handlePromoCode} routeIds={idRoutes} control={methods.control} places={selectedPlaces} />
            : null}
          <div className={style['order-form__container']}>
            <ConsentBox />
            <div className={style['order-form__result']}>
              <div className={style['order-form-price']}>
                <p className={style['order-form-price__text']}>
                  К оплате
                </p>
                <p className={style['order-form-price__value']}>
                  {pricePay} RUB
                </p>
              </div>
              <input className={style['order-form__submit']}
                type="submit" value={isLoadingPay ? 'Идет бронирование...' : 'Перейти к оплате'} />
            </div>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default FormComponent;


