'use server'

import { ICityDataProps } from "../types/types";

export async function fetchCityDeparture (cityDeparture: string) {

    const url = process.env.NEXT_PUBLIC_APY_URL;
    const data = {
        name: cityDeparture,
        isExactly: true,
        lang: 'ENG'
    }
    try {
        
        const response = await fetch(`${url}/api/v1/cities/find`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data),
            cache: 'no-store',
        });
        const dat:ICityDataProps = await response.json();
        console.log(dat)
       return dat
     
    }
    catch (error) {
        console.error('Ошибка при отправке данных на сервер:', error);
    }
}