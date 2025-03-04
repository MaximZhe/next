
import { ModalContextSearchId } from "@/contex/modal"
import { Metadata } from "next"


const url = process.env.NEXT_PUBLIC_APY_URL

const splitParamsCity = (text: string): [string, string] => {
    const parts = text.split('-');
    if (parts.length === 2) {
        return [parts[0], parts[1]];
    }
    const second = parts.slice(1).join('-');
    return [parts[0], second];
}

export async function generateMetadata(
    { params}: any
): Promise<Metadata> {
    const nameCityParams = params.slug

    const resultArrayCity = splitParamsCity(nameCityParams)

    const fetchCityDeparture = async (cityDeparture: string) => {
        try {
            const data = {
                name: cityDeparture,
                isExactly: true,
                lang: 'RUS'
            }
            const response = await fetch(`${url}/api/v1/cities/find`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const dat = await response.json();

            const nameCity = dat
            return nameCity
        }
        catch (error) {
            console.error('Ошибка при отправке данных на сервер:', error);
        }
    }
    const fetchCityArrival = async (cityArrival: string) => {
        try {
            const data = {
                Name: cityArrival,
                isExactly: true,
                Lang: 'RUS'
            }
            const response = await fetch(`${url}/api/v1/cities/find`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const dat = await response.json();
            const nameCity = dat
            return nameCity

        }
        catch (error) {
            console.error('Ошибка при отправке данных на сервер:', error);
        }
    }
    const nameCityDeparture = await fetchCityDeparture(resultArrayCity[0])
    const nameCityArrival = await fetchCityArrival(resultArrayCity[1])
  
    const canonicalCity = `${nameCityDeparture?.Result?.[0].NameHttp}-${nameCityArrival?.Result?.[0].NameHttp}`
    return {
        title: `Билеты на автобус ${nameCityDeparture?.Result[0]?.Name.split(',')[0]} – ${nameCityArrival?.Result[0]?.Name.split(',')[0]}: расписание, цена`,
        description: `Билеты на автобус ${nameCityDeparture?.Result[0]?.Name.split(',')[0]} – ${nameCityArrival?.Result[0]?.Name.split(',')[0]}. Актуальное расписание на каждый день. Бронирование мест и покупка билетов онлайн. Комфортабельные автобусы. Маршрут с остановками.`,
        alternates: {
            canonical: `/find/${canonicalCity}`,
        },
        openGraph: {
            title: `Билеты на автобус ${nameCityDeparture?.Result[0]?.Name.split(',')[0]} – ${nameCityArrival?.Result[0].Name.split(',')[0]}: расписание, цена`,   
            description: `Билеты на автобус ${nameCityDeparture?.Result[0]?.Name.split(',')[0]} – ${nameCityArrival?.Result[0].Name.split(',')[0]}. Актуальное расписание на каждый день. Бронирование мест и покупка билетов онлайн. Комфортабельные автобусы. Маршрут с остановками.`,
            images: [
                {
                    url: `https://intercars.ru/opengraph-image.png`,
                },
            ]
            
        },
        robots: {
            index: false,
            follow: false,
          },
    }
}

export default function RatesLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <ModalContextSearchId>
                {children}
            </ModalContextSearchId>
        </>

    )

}