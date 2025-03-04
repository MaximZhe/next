/* eslint-disable @next/next/no-sync-scripts */
import type { Metadata } from 'next'
import './globals.css'



import Script from 'next/script'
import Header from './components/Header/Header'
import Head from 'next/head'
import Footer from './components/Footer/Footer'
import StoreProvider from '@/redux/StoreProvider/StoreProvider'
import { routesItems } from './constant/constant'
import ButtonScrollTo from './components/UI/Button/ButtonScrollTo/ButtonScrollTo'
import { UserAccountContext } from '@/contex/userAccount'
import SingAccount from './components/SingAccount/LogAccount'
import { RecoveryFormContext, SingFormVisibleContext } from '@/contex'
import { CitySelectionContext } from '@/contex/formSearch'

export const metadata: Metadata = {
  title: 'Купить автобусные билеты онлайн',
  description: 'Купить билеты на автобусы, расписание международных автобусов, автобусы из Беларуси в Варшаву, Москву, Киев, Питер, Модлин, Львов, Борисполь, города Европы, СНГ',
  referrer: 'origin-when-cross-origin',
  metadataBase: new URL('https://intercars.ru/'),
  keywords: 'Билеты на автобусы, расписание на автобусы, забронировать билет, автобусы по Беларуси, странам СНГ и Европе',
  openGraph: {
    images: [
      {
        url: 'https://intercars.ru/opengraph-image.png',
      }
    ]
  }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {

  return (
    <StoreProvider>
      <CitySelectionContext>
        <SingFormVisibleContext>
          <RecoveryFormContext>
            <UserAccountContext>
              <html lang="ru">
                <Head>
                  <meta name="google-site-verification" content="google67984ba37c9a9849.html" />
                  <link rel="preload" href="/Map.webp" as="image" />
                </Head>
                <body>
                  <Header />
                  <SingAccount />
                  <main style={{ maxWidth: '1244px', margin: '0 auto' }}>
                    {children}
                  </main>
                  <Footer routes={routesItems} />
                  <ButtonScrollTo />

                  {/* Top.Mail.Ru counter script */}
                  <Script id="topMailCounter" strategy="lazyOnload" async
                    dangerouslySetInnerHTML={{
                      __html:
                        `
              var _tmr = window._tmr || (window._tmr = []);
              _tmr.push({id: "3564411", type: "pageView", start: (new Date()).getTime()});
              (function (d, w, id) {
                if (d.getElementById(id)) return;
                var ts = d.createElement("script"); 
                ts.type = "text/javascript"; 
                ts.async = true; 
                ts.id = id;
                ts.src = "https://top-fwz1.mail.ru/js/code.js";
                var f = function () {
                  var s = d.getElementsByTagName("script")[0]; 
                  s.parentNode.insertBefore(ts, s);
                };
                if (w.opera == "[object Opera]") { 
                  d.addEventListener("DOMContentLoaded", f, false); 
                } else { 
                  f(); 
                }
              })(document, window, "tmr-code");
            `
                    }}
                  />



                  {/* VK counter script */}
                  <Script id="vkCounter" strategy="lazyOnload" async
                    dangerouslySetInnerHTML={{
                      __html:
                        `
              !function(){
                var t=document.createElement("script");
                t.type="text/javascript";
                t.async=!0;
                t.src='https://vk.com/js/api/openapi.js?173',
                t.onload=function(){VK.Retargeting.Init("VK-RTRG-1907062")},
                document.body.appendChild(t);
              }();
            `
                    }} />


                  {/* WebPush script */}
                  <Script src="//web.webpushs.com/js/push/7f8a33511a253c832ebdccbb7cb7e091_1.js"
                    strategy="lazyOnload" async />
                </body>

                <Script id="supportScript" async strategy='lazyOnload' src="https://lcab.talk-me.ru/support/support.js?h=40f41d1b085ff24693cf3147c691db6b" />
                
                <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-B3P45D8HHV" />
                <Script
                  id="googleAnalytics"
                  strategy="afterInteractive"
                  dangerouslySetInnerHTML={{
                    __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-B3P45D8HHV');
            `
                  }}
                />
                <Script
                  id="yandexMetrika"
                  strategy="afterInteractive" async
                  dangerouslySetInnerHTML={{
                    __html: `
          (function(m,e,t,r,i,k,a){
            m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {
              if (document.scripts[j].src === r) { return; }
            }
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],
            k.async=1,k.src=r,a.parentNode.insertBefore(k,a);
          })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
          
          ym(89703345, "init", {
            clickmap:true,
            trackLinks:true,
            accurateTrackBounce:true,
            webvisor:true
          });
        `
                  }}
                />
              </html>
            </UserAccountContext>
          </RecoveryFormContext>
        </SingFormVisibleContext>
      </CitySelectionContext>

    </StoreProvider>
  )
}
