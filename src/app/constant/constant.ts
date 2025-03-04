import {  IRouteItem, ISliderRoute } from "../types/types";
import { IAccordionItem } from "../types/types";

export const accordionItemsLeft: IAccordionItem[] = [
  {
    id: 1,
    title: "Можно ли забронировать место и оплатить проезд на посадке?",
    content:
      " билет на автобус онлайн в любое время суток, можно воспользовавшись удобной формой поиска и покупки билетов на нашем сайте. Из предложенных рейсов выберите наиболее подходящий для Вас. Далее заполните данные пассажира и выберите удобный для вас способ оплаты.",
  },
  {
    id: 2,
    title: "Можно ли выбрать место в автобусе?",
    content:
      "Да, на всех наших собственных рейсах Вы можете выбрать место в автобусе. Для этого при покупке билета на сайте или в мобильном приложении в схеме автобуса выберите свободные и наиболее удобные для Вас места.",
  },
  {
    id: 3,
    title: "Как купить билет на сайте intercars.ru?",
    content:
      "На рейсы компании есть возможность оплаты билетов на посадке на определенные выезды. Чтобы уточнить информацию о бронировании на интересующую Вас поездку, свяжитесь с нами по телефону, посредством мессенджеров, почты или соц. сетей.",
  },
];
export const accordionItemsRight: IAccordionItem[] = [
  {
    id: 4,
    title: "Можно ли предоставить билет при посадке в электронном виде?",
    content:
      "На рейсы компании Интеркарс допускается посадка с билетом в электронном виде (можно предоставить на экране телефона, планшета и т.п.). На рейсы других перевозчиков билет должен быть распечатан.",
  },
  {
    id: 5,
    title: "Какие преимущества поездок на ваших автобусах?",
    content:
      "Приобретая билет на наши рейсы Вы получаете поездку на новом комфортабельном автобусе. Все автобусы оснащены WiFi, USB розетками, кондиционером, откидывающимися сиденьями. Кроме того, у нас действительно недорогие билеты по всем направлениям.",
  },
  {
    id: 6,
    title: "Как оформить возврат билета?",
    content:
      "Чтобы вернуть билет на наш рейс, необходимо заполнить форму заявления на возврат. Запросите электронную форму, написав на почту intercars@intercars.ru или на один из месседжеров. Не забывайте — чем больше времени до отправления, тем меньше удержание за возврат билета.",
  },
];

export const routesItems: IRouteItem[] = [
  { id: 1, value: "Москва – Рязань", link: '/find/moscow-ryazan' },
  { id: 2, value: "Москва - Переславль-Залесский", link: '/find/moscow-pereslavlzalesskiy' },
  { id: 3, value: "Москва – Новомосковск", link: '/find/moscow-novomoskovsk' },
  { id: 4, value: "Москва – Донецк", link: '/find/moscow-donetsk' },
  { id: 5, value: "Москва – Луганск", link: '/find/moscow-lugansk' },
  { id: 6, value: "Москва – Волгоград", link: '/find/moscow-volgograd' },
  { id: 7, value: "Москва – Воронеж", link: '/find/moscow-woronez' },
  { id: 8, value: "Москва – Краснодар", link: '/find/moscow-krasnodar' },
];

export const sliderRoutesRussia: ISliderRoute[] = [
  { id: 1, value: "Москва – Казань", price: 2200, link: 'moscow-kazanj', src: '/avtobus-Moskva-Kazan.webp', },
  { id: 2, value: "Москва – Анапа", price: 3500, link: 'moscow-anapa', src: '/avtobus-Moskva-Anapa.webp' },
  { id: 3, value: "Москва – Ростов-На-Дону", price: 1900, link: 'moscow-rostov', src: '/avtobus-Moskva-Rostov-Na-Donu.webp' },
  { id: 4, value: "Москва – Санкт-Петербург", price: 1700, link: 'moscow-piter', src: '/avtobus-Moskva-Sankt-Peterburg.webp' },
  { id: 5, value: "Москва – Симферополь", price: 4000, link: 'moscow-simferopol', src: '/avtobus-Moskva-Simferopol.webp' },
  { id: 6, value: "Москва – Сочи", price: 2200, link: 'moscow-sochi', src: '/avtobus-Moskva-Sochi.webp' },
  { id: 7, value: "Москва – Тула", price: 1100, link: 'moscow-tula', src: '/avtobus-Moskva-Tula.webp' },
];
export const sliderRoutesInternational: ISliderRoute[] = [
  { id: 1, value: "Москва – Минск", price: 1900, link: 'moscow-minsk', src: '/avtobus-Moskva-Minsk.webp' },
  { id: 2, value: "Санкт-Петербург – Минск", price: 1900, link: 'piter-minsk', src: '/avtobus-Sankt-Peterburg-Minsk.webp' },
  { id: 3, value: "Москва – Витебск", price: 1400, link: 'moscow-vitebsk', src: '/avtobus-Moskva-Vitebsk.webp' },
  { id: 4, value: "Москва – Кишинев", price: 16000, link: 'moscow-kishinev', src: '/avtobus-Moskva-Kishinev.webp' },
  { id: 5, value: "Москва – Борисов", price: 2000, link: 'moscow-borisov', src: '/avtobus-Moskva-Borisov.webp' },
  { id: 6, value: "Москва – Варшава", price: 6000, link: 'moscow-warszawa', src: '/avtobus-Moskva-Varshava.webp' },
  { id: 7, value: "Ялта – Минск", price: 9800, link: 'yalta-minsk', src: '/avtobus-Yalta-Minsk.webp' },
];
export const salesSingleListInfo: string[] = [
  "Количество мест по акционной цене ограничено и зависит от даты рейса.",
  "Акционные билеты по инициативе пассажиров возврату не подлежат.",
  "Возможен перенос даты выезда с доплатой до полной стоимости.",
  "Спецпредложения не суммируются с другими акциями, скидками и льготными тарифами.",
  "Акционные промокоды работают при покупке билета только в одном направлении и только на одного пассажира, билет в обратную сторону и на другого пассажира по промокоду вы можете купить отдельно.",
];
export const routesSidebar = [
  { id: 1, value: "Москва – Минск", price: 1900, link: 'moscow-minsk', src: '/avtobus-Moskva-Minsk.webp' },
  { id: 2, value: "Санкт-Петербург – Минск", price: 1900, link: 'piter-minsk', src: '/avtobus-Sankt-Peterburg-Minsk.webp' },
  { id: 1, value: "Москва – Казань", price: 2200, link: 'moscow-kazanj', src: '/avtobus-Moskva-Kazan.webp', },
]
export const defaultCityForm = {
  Minsk: 'Минск',
  Mosсow: 'Москва'
}
export const defaultDateForm = {
  Today: 'Сегодня',
  Tomorrow: 'Завтра'
}

