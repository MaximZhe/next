import moment from "moment";

export function formatedDate(defaultDate: string) {
    const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    const dateParts = defaultDate.split(' ');
    const day = dateParts[0];
    const monthIndex = +dateParts[1] - 1;
    const year = dateParts[2];
    const month = months[monthIndex];
    return `${day} ${month} ${year}`;
  }




