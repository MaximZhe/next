import moment from "moment";

export const formatedDateFetch = (date: any) => {
    const formetedDate = moment(date, 'DD.MM.YYYY').format('YYYY-MM-DD');
    return formetedDate
}