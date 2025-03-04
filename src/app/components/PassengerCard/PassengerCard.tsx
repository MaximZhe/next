
'use client'

import { FC, useEffect, useState } from 'react';
import { useFormContext, } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message"
import Select from 'react-select';
import InputMask from 'react-input-mask';
import style from './PassengerCard.module.scss';
import { useAppSelector } from '@/app/hooks/redux';
interface IPassengerCard {
  className: string,
  countUser: number,
  controller: any,
  handleifChangeTariffs: (index: number, selectedTarifId: any) => void
}
// interface IOrderForm {
//   user: {
//     citizenship: string,
//     ageTariff: string,
//     gender: string,
//     lastName: string,
//     firstName: string,
//     middleName: string,
//     birthdate: any,
//     documentType: string,
//     documentNumber: string
//   }
// }
interface OptionType {
  value: string;
  label: string;
}
interface OptionTypeTarif {
  value: string | number;
  label: string | number;
}
interface ITypesArraySelect {
  Name: string,
  Id: string,
}
interface ITypesArraySelectTarifs {
  Name: number,
  Value: string,
}
interface ITypesArraySelectCitizenship extends ITypesArraySelect {
  Abbr: string,
}

function transformObjectsTarifs(arr: ITypesArraySelectTarifs[]) {
  return arr.map(obj => ({ value: obj.Value, label: obj.Name }));
}
function transformObjectsDocumentTypes(arr: ITypesArraySelect[]) {
  return arr.map(obj => ({ value: obj.Id, label: obj.Name }));
}
/*Преобразует массив объектов Select Citizenship в массив 
объектов со свойствами 
"значение" и "метка".*/
function transformObjectsPassengersCitizenship(arr: ITypesArraySelectCitizenship[]) {
  return arr.map(obj => ({ value: obj.Abbr, label: obj.Name }));
}
const PassengerCard: FC<IPassengerCard> = ({ className, countUser, controller, handleifChangeTariffs }) => {
  const { Route } = useAppSelector((state: any) => state.singleRouteReduser);
  const [activeButton, setActiveButton] = useState('');
  const [countries, setCountries] = useState<OptionType[]>([]);
  const [documentTypeUser, setDocumentTypeUser] = useState<OptionType[]>([]);
  const [arrayTariff, setArrayTariff] = useState<OptionTypeTarif[]>([{ value: 0, label: '' }]);
  const [defaultTariff, setDefaultTariff] = useState<any>({ value: '', label: '' });

  useEffect(() => {
    if (Route?.Result?.PassengersCitizenship) {
      const resultArrayContry = transformObjectsPassengersCitizenship(Route?.Result?.PassengersCitizenship);
      setCountries(resultArrayContry);
    }
  }, [Route?.Result?.PassengersCitizenship, Route])

  useEffect(() => {
    if (Route?.Result?.DocumentTypes) {
      const resultArrayDocument = transformObjectsDocumentTypes(Route?.Result?.DocumentTypes);
      setDocumentTypeUser(resultArrayDocument);
    }

  }, [Route?.Result?.DocumentTypes, Route])

  useEffect(() => {
    if (Route?.Result?.Route?.Routes[0].Tariffs) {
      const resultArrayAgeTariff = transformObjectsTarifs(Route?.Result?.Route?.Routes[0].Tariffs);
      setArrayTariff(resultArrayAgeTariff);
    }
  }, [Route?.Result?.Route?.Routes, Route]);

  useEffect(() => {
    if (arrayTariff) {
      if (arrayTariff && arrayTariff.length > 1) {
        if(Route?.Result?.Route?.CarrierName === 'Intercars'){
          setDefaultTariff({ value: arrayTariff[2]?.value, label: arrayTariff[2]?.label })
        }else{
          setDefaultTariff({ value: arrayTariff[0]?.value, label: arrayTariff[0]?.label })
        }  
      } else if (arrayTariff && arrayTariff.length === 1) {
        setDefaultTariff({ value: arrayTariff[0]?.value, label: arrayTariff[0]?.label })
      }
    }
  }, [arrayTariff])

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };
  useEffect(() => {
    if (activeButton === '') {
      setValue(`Passengers.${countUser}.Gender`, 'M')
      setActiveButton('man')
    }
  }, [])
  
  const { register, control, setValue, watch, getValues, formState: { errors } } = useFormContext();
  const Controller = controller;
  const lastName = watch(`Passengers.${countUser}.LastName`);
  const firstName = watch(`Passengers.${countUser}.FirstName`);
  const middleName = watch(`Passengers.${countUser}.MiddleName`);
  const birthDate = watch(`Passengers.${countUser}.Birthdate`);
  const documentNumber = watch(`Passengers.${countUser}.DocumentNumber`);
  const tarrifValue = getValues(`Passengers.${countUser}.TarifId`);
  
  useEffect(() => {
    const update = () => {
      setValue(`Passengers.${countUser}.TarifId`, defaultTariff)
    }
    if (defaultTariff) {
      update();
    }
  }, [defaultTariff])

  useEffect(() => {
    handleifChangeTariffs(countUser, tarrifValue)
  }, [tarrifValue, countUser])

  useEffect(() => {
    if (documentTypeUser) {
      const def = documentTypeUser[0]
      setValue(`Passengers.${countUser}.DocumentId`, def)
    }
  }, [documentTypeUser])

  return (
    <div className={`${className}`}>
      <h2 className={style['order-form__title']}>
        Данные о пассажире {countUser}
      </h2>
      <div className={style['order-form-row']}>
        <div className={`${style['order-form-row__box']}`}>
          <div className={style['order-form-row__wrapper']}>
            <Controller
              control={control}
              name={`Passengers.${countUser}.Citizenship`}
              rules={{ required: 'Пожалуйста, укажите гражданство' }}
              render={({ field: { onChange, value, name, ref }, formState: { errors, isInvalid } }: any) => (
                <Select
                  name={name}
                  ref={ref}
                  options={countries}
                  value={value}
                  getOptionValue={e => e.value}
                  onChange={(e) => { onChange(e) }}
                  placeholder="Гражданство"
                  />
              )}
            />
          </div>
          <div className={style['order-form-row__error']}>
            <ErrorMessage errors={errors} name={`Passengers.${countUser}.Citizenship`} />
          </div>
        </div>

        <div className={style['order-form-row__wrapper']}>
          <Controller
            control={control}
            name={`Passengers.${countUser}.TarifId`}
            render={({ field: { onChange, value, name, ref } }: any) => (
              <Select
                name={name}
                ref={ref}
                options={arrayTariff}
                value={value}
                getOptionValue={e => e.value}
                onChange={(e) => {
                  onChange(e);
                  handleifChangeTariffs(countUser, e);
                }}
                placeholder="Выбрать тариф"
              />
            )}
          />
        </div>
        <div className={style['order-form-row__wrapper']}>

          <div className={style['order-form-row__buttons']}>
            <button
              className={`${style['button-man-gender']} ${activeButton === "man" ? style.active : ""}`}

              type="button"
              name="man"
              onClick={() => {
                setValue(`Passengers.${countUser}.Gender`, 'M');
                handleButtonClick("man")
              }}>
              М
            </button>
            <button
              className={`${style['button-woman-gender']} ${activeButton === "woman" ? style.active : ""}`}
              type="button"
              name="woman"
              onClick={() => {
                setValue(`Passengers.${countUser}.Gender`, 'F');
                handleButtonClick("woman")
              }}>
              Ж
            </button>
          </div>
        </div>
      </div>
      <div className={style['order-form-row']}>
        <div className={`${style['order-form-row__box']}`}>
          <div className={`${style['order-form-row__wrapper']} `}>
            <input
              type="text"
              {...register(`Passengers.${countUser}.LastName`, {
                required: 'Введите фамилию',
                pattern: {
                  value: /^[a-zA-Zа-яА-Я]+$/,
                  message: 'Можно использовать только буквы',
                }
              })}
            />
            <label className={`${lastName ? style.active : ""}`}>Фамилия</label>
          </div>
          <div className={style['order-form-row__error']}>
            <ErrorMessage errors={errors} name={`Passengers.${countUser}.LastName`} />
          </div>
        </div>
        <div className={style['order-form-row__box']}>
          <div className={style['order-form-row__wrapper']}>
            <input {...register(`Passengers.${countUser}.FirstName`, {
              required: 'Введите имя',
              pattern: {
                value: /^[a-zA-Zа-яА-Я]+$/,
                message: 'Можно использовать только буквы',
              }
            })} />
            <label className={`${firstName ? style.active : ""}`}>Имя</label>
          </div>
          <div className={style['order-form-row__error']}>
            <ErrorMessage errors={errors} name={`Passengers.${countUser}.FirstName`} />
          </div>
        </div>

        <div className={style['order-form-row__box']}>
          <div className={style['order-form-row__wrapper']}>
            <input {...register(`Passengers.${countUser}.MiddleName`,)} />
            <label className={`${middleName ? style.active : ""}`}>Отчество</label>
          </div>
          <div className={style['order-form-row__error']}>
            <ErrorMessage errors={errors} name={`Passengers.${countUser}.MiddleName`} />
          </div>
        </div>

      </div>
      <div className={style['order-form-row']}>
        <div className={style['order-form-row__box']}>
          <div className={style['order-form-row__wrapper']}>
            <InputMask
              mask="99.99.9999"
              {...register(`Passengers.${countUser}.Birthdate`, {
                required: 'Введите дату рождения'
              })}
              placeholder='ДД.ММ.ГГГГ'
            />
            <label className={style.active}>Дата рождения</label>
          </div>
          <div className={style['order-form-row__error']}>
            <ErrorMessage errors={errors} name={`Passengers.${countUser}.Birthdate`} />
          </div>
        </div>

        <div className={style['order-form-row__wrapper']}>
          <Controller
            control={control}
            name={`Passengers.${countUser}.DocumentId`}
            render={({ field: { onChange, value, name, ref } }: any) => (
              <Select
                name={name}
                ref={ref}
                options={documentTypeUser}
                value={value}
                getOptionValue={e => e.value}
                onChange={(e) => { onChange(e) }}
                placeholder="Тип документа"
              />
            )}
          />
        </div>
        <div className={style['order-form-row__box']}>
          <div className={style['order-form-row__wrapper']}>
            <input {...register(`Passengers.${countUser}.DocumentNumber`, { required: 'Введите номер документа', })
            } />
            <label className={`${documentNumber ? style.active : ""}`}>Номер документа</label>
          </div>
          <div className={style['order-form-row__error']}>
            <ErrorMessage errors={errors} name={`Passengers.${countUser}.DocumentNumber`} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default PassengerCard;
