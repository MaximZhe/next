'use server'

export async function getRouteContent(cityDepart: string, cityArraval: string) {

    const url = process.env.NEXT_PUBLIC_APY_URL
    const fetchCityDeparture = async (cityDeparture: string) => {
        try {
            const data = {
                name: cityDeparture,
                isExactly: true,
                lang: 'RU'
            }
            const response = await fetch(`${url}/api/v1/cities/find`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                },
                cache: 'no-store',

            });
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            } else {
                const resultData = await response.json();
                return resultData;
            }
        }
        catch (error) {
            console.error('Ошибка при отправке данных на сервер:', error);
        }
    }
    const fetchCityArrival = async (cityArrival: string) => {
        try {
            const data = {
                name: cityArrival,
                isExactly: true,
                lang: 'RU'
            }
            const response = await fetch(`${url}/api/v1/cities/find`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                },
                cache: 'no-store',

            });
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const result = await response.json();
            return result
        }
        catch (error) {
            console.error('Ошибка при отправке данных на сервер:', error);
        }
    }
    if (cityDepart && cityArraval) {
        const cityIdDeparture = await fetchCityDeparture(cityDepart);
        const cityIdArrival = await fetchCityArrival(cityArraval);
        const resultObject = {
            cityDepartName: cityIdDeparture?.Result[0]?.NameHttp,
            cityArravalName: cityIdArrival?.Result[0]?.NameHttp,
            cityDepartNameSeo: cityIdDeparture?.Result[0]?.Name,
            cityArravalNameSeo: cityIdArrival?.Result[0]?.Name,
            cityIdDeparture: cityIdDeparture?.Result[0]?.Id,
            cityIdArrival: cityIdArrival?.Result[0]?.Id
        }
        return resultObject
        
    }
}