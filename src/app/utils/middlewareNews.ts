

import { generateStaticParams } from "../api/getUrlNews";

export const middlewareNewsCheck = async (pathname: string) => {
 
    const resultParams = await generateStaticParams()
    function findIdByNiceUrl(resultArray: any[], params: any) {
        const niceUrl = params.split("/novosti/");
        const foundObject = resultArray.find((item) => item.params.niceUrl === niceUrl[1]);
        if (foundObject) {
            return foundObject.params.id;
        } else {
            return foundObject;
        }
    }
    const id = findIdByNiceUrl(resultParams, pathname);
    return id
};
