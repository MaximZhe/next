'use server'
import { getServerSideProps } from "./actionNews";

export async function generateStaticParams() {
    const newsResponse = await getServerSideProps(30);
 
    const resultArraId = newsResponse.Collection
    return resultArraId.map((item: any) => ({
        params:{
            niceUrl: Object.keys(item)[0],
            id: item[Object.keys(item)[0]],
        }
    }))
    
}

