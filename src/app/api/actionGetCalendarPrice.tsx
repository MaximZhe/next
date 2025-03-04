'use server'


interface ICalendarPrice {
    CityDeparture: number,
    CityArrival: number,
    Days: number,
    DateStart: string,
    CurrencyId: number,
}
export async function getCalendarPrice( dataCalendarPrice: ICalendarPrice) {
 
    const url = process.env.NEXT_PUBLIC_APY_URL

    const dat = {
        CityDeparture: dataCalendarPrice.CityDeparture,
        CityArrival: dataCalendarPrice.CityArrival,
        Days: dataCalendarPrice.Days,
        DateStart: dataCalendarPrice.DateStart,
        CurrencyId: dataCalendarPrice.CurrencyId,
        Lang: "RUS"
      }
    try{
      const res = await fetch(`${url}/api/v1/calendar`, {
        method: 'POST',
        body: JSON.stringify(dat),
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      });
      const resultPrice = await res.json()
      return resultPrice
    }
    catch (error) {
      return error
    }   
}