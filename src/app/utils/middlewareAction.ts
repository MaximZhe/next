
import { generateStaticParamsAction } from "../api/getUrlAction";

export const middlewareActionCheck = async (pathname: string) => {
  const resultParams = await generateStaticParamsAction()

    function findIdByNiceUrl(resultArray: any[], params: any) {
        const niceUrl = params.split("/akcii/");
        const foundObject = resultArray.find((item) => item.params.slug === niceUrl[1]);
        if (foundObject) {
            return foundObject.params.id;
        } else {
            return foundObject;
        }
    }
    const id = findIdByNiceUrl(resultParams, pathname);
    return id
};
