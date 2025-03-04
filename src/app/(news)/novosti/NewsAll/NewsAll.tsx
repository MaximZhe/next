
'use server';

import { getServerSideProps } from '@/app/api/actionNews';
import { IItemNewsPageProps } from '@/app/types/types';
import ItemNewsPage from '../ItemNewsPage/ItemNewsPage';



export const fetchCityArrays = async (countPage: number) => {
    const result = await getServerSideProps(countPage);
    const resultCity = result.DataResult.Result.Collection
    return resultCity
}

const NewsAll = async ({
    query = '3',
  }: {
    query: string;
  }) => {
    
    const itemsPerPage = 30;
    const res = await fetchCityArrays(itemsPerPage);
    return (
        <>
            { 
                res.slice(0, parseInt(query)).map((item: IItemNewsPageProps) => (
                    <ItemNewsPage key={item.id} dataItem={item} />
                ))
            }
        </>
    );
    
};

export default NewsAll;