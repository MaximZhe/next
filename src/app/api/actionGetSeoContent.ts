'use server';

export const fetchContent = async (cityDepart: number, cityArraval: number) => {
    const url = process.env.NEXT_PUBLIC_APY_URL
    try {
        const datas = {
            CityDeparture: cityDepart,
            CityArrival: cityArraval,
            SiteVersionId: 2,
            Lang: "RUS"
        }
        const response = await fetch(`${url}/api/v1/content/get`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
            body: JSON.stringify(datas)
        })
        return response.json()
    }
    catch (error) {
        console.log(error)
    }
}