
'use server';

import ListRatesItem from "@/app/components/ListRatesItem/ListRatesItem";
import style from '../routeDescription.module.scss'
const RoutesAll = async ({
    query = '3',
    datas,
  }: {
    query: string,
    datas:any
  }) => {
    return (
        <div className={style.routesAll}>
            { 
                datas.slice(0, parseInt(query)).map((data: any) => (
                    <ListRatesItem key={data.Id} data={data} searchId={""} />
                ))
            }
        </div>
    );
    
};

export default RoutesAll;