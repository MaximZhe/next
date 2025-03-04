

const newMonthShort = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'нояб', 'дек'];
// const newMonth = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
// const newWeekDay = ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'];
const newWeekDayShort = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];

export function formatedDate(defaultDate: string) {
  const [day, month, year] = defaultDate.split('.');
  const monthAbbreviation = newMonthShort[parseInt(month) - 1];
  const date = new Date(`${year}-${month}-${day}`);
const weekdayAbbreviation = newWeekDayShort[date.getDay()];
  const newDate = `${day} ${monthAbbreviation} ${weekdayAbbreviation}`;
  return newDate;
}