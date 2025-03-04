'use client'

import style from './PromoOrder.module.scss';
import { ErrorMessage } from '@hookform/error-message';
import { FC, useEffect, useState } from 'react';
import { useFormContext, Control, useWatch } from 'react-hook-form';
import { IIDRoutes } from '../OrderForm/OrderForm';
import { Passenger } from '@/app/types/types';
import { formatedDateFetch } from "@/app/utils/formatedDateFetch";
import { usePriceContext } from '@/contex';
import { fetchGetPromoPrice } from '@/app/api/actionPromoOrder';

interface IPromoOrderProps {
    handlePromoCode: (handlePromoCode: string) => void,
    routeIds: IIDRoutes,
    control: Control<any>,
    places: any[],
}
interface IFetchPromoCode {
    PromoCode: string,
    CurrencyId: number,
    Passengers: Passenger[],
    RouteId: string,
    SearchId: string,
    Lang: string

}
const defaultDate: Passenger = {
    FirstName: '',
    LastName: '',
    MiddleName: '',
    Citizenship: "",
    Birthdate: new Date(),
    TarifId: 0,
    PlaceNumber: 0,
    Gender: "",
    DocumentId: "",
    DocumentNumber: ""
}
const PromoOrder: FC<IPromoOrderProps> = ({ handlePromoCode, routeIds, control, places }) => {

    const Passengers = useWatch({ control })
    const [passengerPlace, setPassengerPlace] = useState<number>(0)
    const [passengerInfo, setPassengerInfo] = useState<IFetchPromoCode>({ PromoCode: '', CurrencyId: 4, Passengers: [defaultDate], RouteId: '', SearchId: '', Lang: 'RU' });
    const { register, watch, resetField, formState: { errors } } = useFormContext();
    const promocode = watch(`PromoCode`);
    const { pricePromo, setPricePromo } = usePriceContext();
    const getPromo = async (datas: any) => {
        const dateFormat = formatedDateFetch(datas.Passengers[0].Birthdate);
        const datasPromo = {
            CurrencyId: datas.CurrencyId,
            Passengers: [{
                TarifId: datas.Passengers[0].TarifId.value,
                PlaceNumber: datas.Passengers[0].PlaceNumber,
            }],
            SearchId: datas.SearchId,
            RouteId: datas.RouteId,
            PromoCode: datas.PromoCode,
            Lang: 'RU',
        }
        const response = await fetchGetPromoPrice(datasPromo)
        if (response.Result) {
            setPricePromo(response.Result.Value)
        }
        if (response.Error) {
            console.log(response.Error)
        }
    }
    useEffect(() => {
        if (places !== undefined && places.length > 0) {
            setPassengerPlace(places[0].Seat)
        }
    }, [places])
    useEffect(() => {
        if (routeIds) {
            const { searchId, routeId } = routeIds
            setPassengerInfo(prev => ({ ...prev, SearchId: searchId, RouteId: routeId }))
        }
    }, [routeIds])
    useEffect(() => {
        if (Passengers || passengerPlace) {

            setPassengerInfo((prev: IFetchPromoCode) => ({
                ...prev,
                PromoCode: promocode,
                Passengers: [
                    {
                        FirstName: Passengers.Passengers[1].FirstName,
                        LastName: Passengers.Passengers[1].LastName,
                        MiddleName: Passengers.Passengers[1].MiddleName,
                        Citizenship: Passengers.Passengers[1].Citizenship,
                        Birthdate: Passengers.Passengers[1].Birthdate,
                        TarifId: Passengers.Passengers[1].TarifId,
                        PlaceNumber: passengerPlace,
                        Gender: Passengers.Passengers[1].Gender,
                        DocumentId: Passengers.Passengers[1].DocumentId,
                        DocumentNumber: Passengers.Passengers[1].DocumentNumber
                    }
                ]
            }))
        } else {
            setPassengerInfo((prev: IFetchPromoCode) => ({
                ...prev,
                PromoCode: promocode,
                Passengers: [
                    {
                        FirstName: Passengers.Passengers[1].FirstName,
                        LastName: Passengers.Passengers[1].LastName,
                        MiddleName: Passengers.Passengers[1].MiddleName,
                        Citizenship: Passengers.Passengers[1].Citizenship,
                        Birthdate: Passengers.Passengers[1].Birthdate,
                        TarifId: Passengers.Passengers[1].TarifId,
                        PlaceNumber: 0,
                        Gender: Passengers.Passengers[1].Gender,
                        DocumentId: Passengers.Passengers[1].DocumentId,
                        DocumentNumber: Passengers.Passengers[1].DocumentNumber
                    }
                ]
            }))
        }

    }, [Passengers, passengerPlace])
    // console.log(Passengers)
    const resetPromo = () => {
        handlePromoCode(promocode)
        resetField('PromoCode')
        getPromo(passengerInfo)
    }
    return (
        <div className={style['promo-order']}>
            <div className={style['promo-order-form']}>
                <div className={style['promo-order-form__box']}>
                    <div className={style['promo-order-form__input']}>
                        <div className={style['promo-order-form__wrapper']}>
                            <input type='text'
                                {...register('PromoCode',)}
                            />
                            <label className={`${promocode ? style.active : ""}`}>Введите промокод</label>
                        </div>

                        <div className={style['promo-order-form__error']}>
                            <ErrorMessage errors={errors} name="PromoCode" />
                        </div>

                    </div>
                    <div className={style['promo-order-form__input']}>
                        <input type='button'
                            value='Применить'
                            onClick={resetPromo} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PromoOrder;