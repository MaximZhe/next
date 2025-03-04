import { getRouteContent } from "@/app/api/actionGetRouteContent";
import ContentSeoRoute from "@/app/components/ContentSeoRoute/ContentSeoRoute";
import ListRates from "@/app/components/ListRates/ListRates";

import { Suspense } from "react";
import style from './SearchResultPage.module.scss';
import Loading from "@/app/loading";
import { cookies} from "next/headers";
import dynamic from "next/dynamic";
import { accordionItemsLeft, accordionItemsRight } from "@/app/constant/constant";
const Accordion = dynamic(() => import('@/app/components/HomePage/FAQ/FAQ'));
import { parseDatas } from "@/app/utils/parserContentSeoPageNew";
import ContentSeoRouteNew from "@/app/components/ContentSeoRoute/ContentSeoRouteNew";

const splitParamsText = (text: string): [string, string] => {
    // Разбиваем строку на массив по первому дефису
    const parts = text.split('-');

    // Если в массиве только 2 элемента, возвращаем их
    if (parts.length === 2) {
        return [parts[0], parts[1]];
    }else{
// Объединяем все элементы, кроме первого, в один
const second = parts.slice(1).join('-');

return [parts[0], second];
    }

    
}

const url = process.env.NEXT_PUBLIC_APY_URL
const fetchContent = async (cityDepart: number, cityArraval: number) => {
    try {
        const datas = {
            CityDeparture: cityDepart,
            CityArrival: cityArraval,
            SiteVersionId: 2,
            Lang: "RUS"
        }
        const response = await fetch(`${url}/api/v1/content/get`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datas),
            cache: 'no-store'
        })
        return response.json()
    }
    catch (error) {
        console.log(error)
    }
}
interface IParamsContent {
    slug: string;
}

const SearchResultPage = async ({ params }: { params: IParamsContent }) => {
    const nameCityRoute = splitParamsText(params.slug);
    const resultArrayCitys = await getRouteContent(nameCityRoute[0], nameCityRoute[1]);
    const resultContent = await fetchContent(resultArrayCitys?.cityIdDeparture, resultArrayCitys?.cityIdArrival);
    const resultsContentPage = parseDatas(resultContent?.Result?.Page?.Html);
    const fullHtml = resultContent?.Result?.Page?.Html;
  
    const cookiesList = cookies();
    const cockiesReferer = cookiesList.get('referer')?.value;
    const clientId = cookiesList.get('_ga')?.value;
    return (
        <>
            <Suspense fallback={<Loading />}>
                <ListRates analytics={{
                    clientId: clientId,
                    referer: cockiesReferer
                }} />
            </Suspense>
            <Suspense fallback={<Loading />}>
                <div className="container">
                    <div className={style['routes-wrapper']}>
                    
                            {resultsContentPage !== null && resultsContentPage !== undefined ? (
                                <ContentSeoRouteNew resultsContentPage={resultsContentPage} resultArrayCitys={resultArrayCitys} resultContent={resultContent} />
                            ) : null}
                            {resultsContentPage[0]['route-title'][0] === undefined && resultContent?.Result?.Page !== null ? <div dangerouslySetInnerHTML={{ __html: fullHtml }} /> : null}
                            {resultContent?.Result?.Page === null ? <div style={{ textAlign: 'center', fontSize: '30px' }}> Описание маршрута в разработке </div> : null}
                  
                    </div>
                </div>
            </Suspense>
            <Accordion
            itemsLeft={accordionItemsLeft}
            itemsRight={accordionItemsRight} />         
        </>
    );
};

export default SearchResultPage;