

export function formatedDateRoute(defaultDate: string) {
    if(defaultDate){
        const russianMonths = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
   const [day, monthIndex] = defaultDate.split('.');
    const month = russianMonths[+monthIndex - 1];
    return `${day} ${month}`;
    }
   
  }

