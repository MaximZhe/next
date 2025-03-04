/* eslint-disable @next/next/no-sync-scripts */
import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Новости Intercars',
  description: 'Следить за новостями на нашем сайте стало проще, всю актуальнуя информацию  увидеть на нашем сайте Intercars',
  keywords:'новости, Intercars',
  openGraph: {
    title: 'Новости Intercars',
    description: 'Следить за новостями на нашем сайте стало проще, всю актуальнуя информацию  увидеть на нашем сайте Intercars',
    images: [
      {
        url: `https://intercars.ru/opengraph-image.png`,
      },
    ]
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
    {children}
    </>
    
  )
}