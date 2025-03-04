import { SchemaSeo } from "../types/types";


export function getPriceValidUntil() {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 7);

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function configSeoPage(schemaSeo: SchemaSeo) {
 
  const priceValidUntil = getPriceValidUntil();
  const jsonLd = {
    "@context": "http://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 2,
            item: {
              "@id": "https://intercars.ru/find/",
              name: "Билеты",
            },
          },
          {
            "@type": "ListItem",
            position: 3,
            item: {
              "@id": `${schemaSeo.routesUrl}`,
              name: `автобус ${schemaSeo.routesStopsCity.cityDeparture} — ${schemaSeo.routesStopsCity.cityArrival}`,
            },
          },
        ],
      },
      {
        "@context": "http://schema.org/",
        "@type": "Product",
        name: `${schemaSeo.routesStopsCity.cityDeparture} — ${schemaSeo.routesStopsCity.cityArrival}`,
        image: "https://intercars.ru/_next/static/media/bus2.4c2fdecc.jpg",
        description: `Автобусные рейсы ${schemaSeo.routesStopsCity.cityDeparture} — ${schemaSeo.routesStopsCity.cityArrival} от Intercars. Место для багажа; кондиционер в салоне; Wi-Fi; USB-порты`,
        offers: {
          "@type": "Offer",
          priceCurrency: "RUB",
          price: `${schemaSeo.routesPrice}`,
          priceValidUntil: priceValidUntil,
          availability: "https://schema.org/InStock",
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "BusTrip",
        arrivalBusStop: {
          "@type": "BusStop",
          name: `${schemaSeo.routesStopsStation.cityArrival}`,
        },
        departureBusStop: {
          "@type": "BusStop",
          name: `${schemaSeo.routesStopsStation.cityDeparture}`,
        },
        provider: [
          {
            "@type": "Organization",
            name: "Intercars",
          },
        ],
        potentialAction: {
          "@context": "https://schema.org",
          "@type": "TravelAction",
          distance: `${schemaSeo.routesLength} km`,
          fromLocation: {
            "@type": "Place",
            name: `${schemaSeo.routesStopsCity.cityDeparture}`,
          },
          toLocation: {
            "@type": "Place",
            name: `${schemaSeo.routesStopsCity.cityArrival}`,
          },
          result: {
            "@type": "AggregateOffer",
            lowPrice: `${schemaSeo.routesPrice}`,
          },
        },
      },
      {
        "@context": "http://schema.org",
        "@type": "Organization",
        name: "© Intercars",
        logo: "https://intercars.ru/_next/static/media/Logo.0f97ed71.svg",
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: "☎️ +7 499 350 80 16",
            contactType: "customer service",
          },
        ],
        sameAs: [
          "https://vk.com/public201988592",
          "https://x.com/intercars_ru",
          "https://t.me/intercars_europe",
        ],
      },
      {
        "@context": "http://schema.org",
        "@type": "LocalBusiness",
        address: {
          "@type": "PostalAddress",
          streetAddress: "пр-т Ленинградский, д.37/3",
          addressLocality: "Москва",
          postalCode: "125167",
        },
        openingHours: "Пн-ВС 24/7",
        geo: {
          "@type": "GeoCoordinates",
          latitude: "55.793632",
          longitude: "37.545087",
        },
        image: "https://intercars.ru/_next/static/media/Logo.0f97ed71.svg",
        name: "© Intercars",
        telephone: "+7 499 350 80 16",
      },
    ],
  };
  return jsonLd;
}

export function configHomePage(){
  const jsonLd = {
    "@context": "http://schema.org",
    "@graph": [
      {
        "@@context": "http://schema.org",
        "@@type": "BreadcrumbList",
        "itemListElement": [{
          "@@type": "ListItem",
          "position": 2,
          "item": {
            "@@id": "https://intercars.ru/#",
            "name": "☎️ +7 499 350 80 16"
          }
        }]
      },
      {
        "@context": "http://schema.org",
        "@type": "Organization",
        "logo": "https://intercars.ru/_next/static/media/Logo.0f97ed71.svg",
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": "+7 499 350 80 16",
            "contactType": "customer service"
          }
        ],
        "sameAs": [
          "https://vk.com/public201988592",
          "https://x.com/intercars_ru",
          "https://t.me/intercars_europe"
        ]
      },
      {
        "@context": "http://schema.org",
        "@type": "LocalBusiness",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "пр-т Ленинградский, д.37/3",
          "addressLocality": "Москва",
          "postalCode": "125167"
        },
        "openingHours": "Пн-ВС 24/7",
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "55.793632",
          "longitude": "37.545087"
        },
        "image": "https://intercars.ru/_next/static/media/Logo.0f97ed71.svg",
        "name": "© Intercars",
        "telephone": "+7 499 350 80 16"
      }
    ]
  };
      return jsonLd
}