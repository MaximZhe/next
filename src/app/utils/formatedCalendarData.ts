import { formatedDateFetch } from "./formatedDateFetch"

export function formatedCalendarData (data: any) {
    const resultCalendar = data

    const formattedData = resultCalendar.map((item: any) => {
        return {
            ...item,
            DateDeparture: formatedDateFetch(item.DateDeparture),
        }
    })
    return formattedData
}