import { getRouteContent } from "../api/actionGetRouteContent";
import { fetchContent } from "../api/actionGetSeoContent";

export const middlewareSeoContentCheck = async (pathname: string) => {
  const splitParamsText = (text: string) => {
    const arr = text.split("/find/");
    const arrCity = arr[1].split("-");
    return arrCity;
  };
  const nameCityRoute = splitParamsText(pathname);
 
  const resultArrayCitys = await getRouteContent(
    nameCityRoute[0],
    nameCityRoute[1]
  );
  const resultContent = await fetchContent(
    resultArrayCitys?.cityIdDeparture,
    resultArrayCitys?.cityIdArrival
  );
  return resultContent;
};
