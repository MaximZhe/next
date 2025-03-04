'use server'

import { ICityDataProps } from "../types/types";

export async function fetchCityArrival (cityArrival: string) {

    const url = process.env.NEXT_PUBLIC_APY_URL;
    const data = {
        name: cityArrival,
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
       return dat
     
    }
    catch (error) {
        console.error('Ошибка при отправке данных на сервер:', error);
    }
}
