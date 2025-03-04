import { headers } from 'next/headers'
import HomePage from './components/HomePage/HomePage'
import { Metadata } from 'next/types'

export async function generateMetadata(
): Promise<Metadata> {
  const robotsIndex = headers().get('X-Robots-Tag')
  
  return {
    title: 'Купить автобусные билеты онлайн',
    description: 'Купить билеты на автобусы, расписание международных автобусов, автобусы из Беларуси в Варшаву, Москву, Киев, Питер, Модлин, Львов, Борисполь, города Европы, СНГ',
    referrer: 'origin-when-cross-origin',
    keywords: 'Билеты на автобусы, расписание на автобусы, забронировать билет, автобусы по Беларуси, странам СНГ и Европе',
    openGraph: {
      images: [
        {
          url: 'https://intercars.ru/opengraph-image.png',
        }
      ]
    },
    robots: {
      index: robotsIndex === null ? true : false,
    }
  }
}

export default function Home() {
  return (
    <>
      <HomePage />

    </>

  )
}
