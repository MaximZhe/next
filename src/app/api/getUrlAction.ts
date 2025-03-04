'use server'
import { actionGetAction } from "./actionGetAction";


export async function generateStaticParamsAction() {
    const newsResponse = await actionGetAction(30);

    const resultArraId = newsResponse.Collection
    return resultArraId.map((item: any) => ({
        params: {
            slug: Object.keys(item)[0],
            id: item[Object.keys(item)[0]],
        }
    }))

}

