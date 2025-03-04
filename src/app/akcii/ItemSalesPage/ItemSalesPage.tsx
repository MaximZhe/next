
import moment from 'moment';
import style from './ItemSalesPage.module.scss';
import { IItemSalesPageProps } from '@/app/types/types';
import { formatedDate } from '@/app/utils/formatedDateSales';
import ButtonRoutes from '@/app/components/UI/Button/ButtonRoutes/ButtonRoutes';





const ItemSalesPage = ({ dataItem, key }: { dataItem: IItemSalesPageProps, key: number }) => {
    
    

    // function decodeQueryParam(p: any) {
    //     return encodeURIComponent(p.replace(/\+/g, " "));
    // }
    // const encode = decodeQueryParam(dataItem.title);
    // const en=decodeURIComponent(encode)
    const defaultDate = moment(dataItem.Date).format('DD MM YYYY');
    const newMonth = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    const monthIndex1 = moment(dataItem.Date).format('MM');
    const monthIndex = +monthIndex1 - 1
    const newDate = defaultDate.replace(/(\d{2}) (\d{2}) (\d{4})/, `$1 ${newMonth[monthIndex]} $3`);
    const newDateStart = newDate.slice(0, -5);
    return (
        <div key={key} className={style['sales-item']}>
            <span className={style['sales-item__date']}>
                {newDate}
            </span>
            <h2 className={style['sales-item__title']}>
                {dataItem.Name}
            </h2>
            <p className={style['sales-item__start-date']}>
                {dataItem.DescribeShort}
            </p>
            <ButtonRoutes
                to={{
                    pathname: `/akcii/${dataItem.NiceUrl}`,
                }} 
                
                title={'Подробнее'}
                className={`${style['sales-item__more']}`}
            />
        </div>
    );
};

export default ItemSalesPage;

