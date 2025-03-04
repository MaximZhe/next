
'use server';

import { actionGetAction } from '@/app/api/actionGetAction';
import { IItemSalesPageProps } from '@/app/types/types';
import ItemSalesPage from '../ItemSalesPage/ItemSalesPage';



export const fetchCityArrays = async (sizePage: number) => {
    const result = await actionGetAction(sizePage);
    const resultCity = result.DataResult.Result.Collection
    return resultCity
}

const ActionAll = async ({
    query = '3',
  }: {
    query: string;
  }) => {
    
    const itemsPerPage = 30;
    const res = await fetchCityArrays(itemsPerPage);
    return (
        <>
            { 
                res.slice(0, parseInt(query)).map((item: IItemSalesPageProps) => (
                    <ItemSalesPage key={item.Id} dataItem={item} />
                ))
            }
        </>
    );
    
};

export default ActionAll;