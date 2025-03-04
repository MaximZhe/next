'use server'

export async function fetchRoutes (cityDepartId:number, cityArrivalId:number, date:string) {
    const url = process.env.NEXT_PUBLIC_APY_URL;
    const datas = {
        CityDeparture: cityDepartId,
        CityArrival: cityArrivalId,
        DateDeparture: date,
        IsDynamic: true,
    };
    try {
        
        const response = await fetch(`${url}/api/v1/routes/search`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(datas),
            cache: 'no-store',

        });
        const dat = await response.json();
        return dat
     
    }
    catch (error) {
        console.error('Ошибка при отправке данных на сервер:', error);
    }
}