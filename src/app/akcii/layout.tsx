/* eslint-disable @next/next/no-sync-scripts */
import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Акции Intercars',
  description: 'Следить за акциями на нашем сайте стало проще, всю актуальнуя информацию  увидеть на нашем сайте Intercars',
  keywords:'акции, Intercars',
  openGraph: {
    title: 'Акции Intercars',
    description: 'Следить за акциями на нашем сайте стало проще, всю актуальнуя информацию  увидеть на нашем сайте Intercars',
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