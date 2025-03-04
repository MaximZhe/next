export interface ITariffData {
  Result: {
    IsActive: boolean;
    CarrierRoutes: IItemCarrierRoutes[];
    Id: string;
    CityDeparture: number;
    CityArrival: number;
    IsDynamic: boolean;
    DateDeparture: string;
    DateCreate: string;
  };
  Error: null | string;
}
export interface IFetchDataRoutes {
  SearchId?: string;
  CityDeparture: number;
  CityArrival: number;
  DateDeparture: string;
  Carriers?: number[];
  IsDynamic?: boolean;
  Lang?: string;
}
export interface ICityDataProps {
  Result: [
      {
          Id: number,
          Name: string,
          NameHttp: string,
          Coordinates: {
              Latitude: string,
              Longitude: string
          }
      }
  ],
  Error: null
}
export interface IRouteItem {
  id: number;
  value: string;
  link: string;
}
export interface IAccordionItem {
  id: number;
  title: string;
  content: string;
}
export interface ISliderRoute {
  id: number;
  value: string;
  price: number;
  link: string;
  src: string;
}
export interface IItemSalesPageProps {
  Date: string,
    DescribeShort: string,
    Id: number,
    Kind: string,
    Lang?: string,
    Name: string,
    NiceUrl: string
}

export interface IItemNewsPageProps {
  Date: string;
  DescribeShort: string;
  Id: number;
  Kind: string;
  Lang: null | string;
  Name: string;
  NiceUrl: string;
}

export interface IItemStop {
  DateArrive: string;
  TimeArrive: string;
  City: string;
  Name: string;
  Id?: null;
  Latitude: null | string;
  Longitude: null | string;
}
export interface IItemBusOptions {
  Id?: number;
  Name: string;
  IsEnabled: boolean;
  Description?: null | string;
  Link?: null | string;
}
export interface IItemFullBusPlaces {
  Seat: number;
  IsFree: boolean;
  Row: number;
  Col: number;
  Floor: number;
}
export interface IItemPrice {
  Ptar: number;
  Etar: number;
  Dtar: number;
  Currency?: number;
  CurrencyName?: string;
}
export interface IItemBaggagePrices {
  Currency?: number;
  CurrencyName?: string;
  Value?: number;
}
export interface IItemRoutesProps {
  GuidIdentityNumber?: null;
  City1?: {
    Id: number;
    NameEng?: string;
    NameRus: string;
  };
  CitySourceId: number;
  CityTargetId: number;
  CitySourceUniqueId?: null;
  CityTargetUniqueId?: null;
  CityCodeSource?: null;
  CityCodeTarget?: null;
  StopNameSource?: null;
  StopNameTarget?: null;
  City2: {
    Id: number;
    NameEng?: string;
    NameRus: string;
  };
  Path: {
    Id: number;
    Name?: string;
    CarrierId: number;
  };
  Date: string;
  Count: number;
  FreeSeats?: null;
  RequestGetFreeSeats?: null;
  DiscountListCode?: null;
  TripCode?: null;
  TimeOfArrival?: null;
  TimeOfDeparture?: null;
  SystemId?: null;
  CarrierName?: null;
  CarrierId?: string;
  Number?: null;
  RealCarrierId?: number;
  Tariffs?: null;
  Byn?: number;
  IsChangeRoute?: boolean;
  ChangeRouteDetails?: null;
}

export interface IItemRoutes {
  AddInfo: null | number | string;
  AdditionalPlace?: null | number;
  AllStops: IItemStop[];
  AnnylationRules?: string;
  ArriveDateTime?: string;
  ArriveName: string;
  BaggageDescription?: string;
  BaggagePrices?: IItemBaggagePrices[];
  BusId?: null | number;
  BusOptions?: IItemBusOptions[];
  BusPlaces?: null | number;
  Carrier: number;
  CarrierLogo?: null;
  CarrierName: string;
  City1: string;
  City2: string;
  CountFreePromos: number;
  DateArrive: string;
  DateArrive1?: string;
  DateDepart: string;
  DateDepart1?: string;
  Delete?: string;
  DepartDateTime?: string;
  DepartName: string;
  FullBusPlaces: IItemFullBusPlaces[];
  FullPrice?: null | string | number;
  FreePlace?: number;
  FreePlaces?: null | number;
  HasExpressAttr?: boolean;
  Hour: string;
  Id: string;
  IsCache: boolean;
  IsInternationalAbroad?: boolean;
  IsPartnerRoute: boolean;
  IsSpecialRules?: boolean;
  Link?: null;
  MaxDiscountPercent?: null;
  Minuts: string;
  Path?: string;
  Platforma?: string;
  Price: IItemPrice[];
  RealCarrierId?: number;
  RealCarrierName: string;
  RealIsPersonalCarrier?: boolean;
  Route: string;
  RouteNumber?: null;
  Routes: IItemRoutesProps[];
  SessionRouteId?: null;
  SortPriority?: number;
  TicketRules?: null | string;
  TimeArrive: string;
  TimeDepart: string;
  UsedByArtmark?: null | string;
}
export interface IItemCarrierRoutes {
  Routes: IItemRoutes[];
  CarrierId: number;
  IsActive: boolean;
}

export interface IItemNewsPageProps {
  id: number;
  date: Date;
  mainTitle: string;
  content?: Array<{
    title?: string;
    text: string;
  }>;
}
export interface IRouteData {
  Result: {
    CarrierRoutes: [];
    CityArrival: number;
    CityDeparture: number;
    DateDeparture: string;
    Id: string;
    IsActive: boolean;
    IsDynamic: boolean;
    DateCreate: string;
  };
  Error: null;
}
export type IDocumentType = {
  Id: string;
  Name: string;
};
export type IPassengersCitizenship = {
  Name: string | null;
  Abbr: string | null;
  Id: number;
};
export type IPaymentTypes = {
  Name: string;
  Id: number;
};
export type IPaySystems = {
  Name: string;
  Id: number;
};

export interface ISingleRouteData {
  Result: {
    Route: IItemRoutes;
    DocumentTypes: IDocumentType[];
    PassengersCitizenship: IPassengersCitizenship[];
    PaymentTypes: IPaymentTypes[];
    PaySystems: IPaySystems[];
    MultiplePassengersBooking: boolean;
    HasPlacesSelection: boolean;
    HasPromoPermission: boolean;
  };
  Error: null;
}

export interface Passenger {
  FirstName: string;
  LastName: string;
  MiddleName: string;
  Citizenship: string;
  Birthdate: Date | string;
  TarifId: number;
  PlaceNumber?: number;
  Gender: string | string; 
  DocumentId: string;
  DocumentNumber: string;
}

export interface ServerData {
  Passengers: Passenger[];
  Phone: string;
  Email: string;
  CurrencyId: number;
  PaySystem: string;
  ExtraBaggage: number;
  PromoCode: string;
  Note: string;
  RouteId: string;
  SearchId: string;
  Lang: string;
  SiteVersionId: number;
}

export interface SchemaSeo {
  cityDeparture: any;
  cityArrival: any;
  routesUrl: string;
  routesStopsCity: {
      cityDeparture: any;
      cityArrival: any;
  };
  routesStopsStation: {
      cityDeparture: any;
      cityArrival: any;
  };
  routesLength: number;
  routesPrice: number;
  ratingValue: any;
  reviewCount: any;
}
export interface IDataCity {
  Name: string,
  Id: number,
  Coordinates: {
      Latitude: null | string,
      Longitude: null | string
  }
}
export interface TicketPrice {
  DateDeparture: string;
  Price: number | null;
  IsActive: boolean;
}
export interface IResultObject {
  cityDepartName: string,
  cityArravalName: string,
  cityDepartNameSeo: string,
  cityArravalNameSeo: string,
  cityIdDeparture: number,
  cityIdArrival: number
}