
import moment from 'moment';
import style from './ItemNewsPage.module.scss';
import { IItemNewsPageProps } from '@/app/types/types';
import ButtonRoutes from '@/app/components/UI/Button/ButtonRoutes/ButtonRoutes';


const ItemNewsPage = ({ dataItem, key }: { dataItem: IItemNewsPageProps, key: number }) => {

    const defaultDate = moment(dataItem.Date).format('DD MM YYYY');
    const newMonth = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    const monthIndex1 = moment(dataItem.Date).format('MM');
    const monthIndex = +monthIndex1 - 1
    const newDate = defaultDate.replace(/(\d{2}) (\d{2}) (\d{4})/, `$1 ${newMonth[monthIndex]} $3`);

    return (
        <div key={key}  className={style['news-item']}>
            
            <span className={style['news-item__date']}>
                {newDate}
            </span>
            <h2 className={style['news-item__main-title']}>
                {dataItem.Name}
            </h2>
            <ButtonRoutes
                to={{
                    pathname: `/novosti/${dataItem.NiceUrl}`,
                }}
                title={'Подробнее'}
                className={`${style['news-item__more']}`}
            />
        </div>
    );
};

export default ItemNewsPage;