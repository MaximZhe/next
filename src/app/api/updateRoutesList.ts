'use server'

import { formatedDateFetch } from "../utils/formatedDateFetch";

export const fetchDataUpdate = async (res: any, dateCalendar: any) => {
  
  const url = process.env.NEXT_PUBLIC_APY_URL;
  const newDateFormated = formatedDateFetch(dateCalendar);
  try {
    const datas = {
      CityDeparture: res.cityIdDeparture,
      CityArrival: res.cityIdArrival,
      DateDeparture: newDateFormated,
      IsDynamic: true,
    };
    const response = await fetch(`${url}/api/v1/routes/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(datas),
      cache: 'no-store',
    });
    const dat = await response.json();
    const newId = dat.Result.Id;
    return newId;
  } catch (error) {
    console.error("Ошибка при отправке данных на сервер:", error);
  } finally {
  }
};
