
import moment from 'moment';
import React, { FC } from 'react';
import style from './reviewsItem.module.scss';

interface IReviewsItem {
    dataItem: {
        DateQuestion: string,
        Answer: string,
        SiteId: number,
        Question: string,
        ContactName: string,
        Email: string,
        DateAnswer: string,
        CityDepartureId: number,
        CityArrivalId: number,
    }
}

const ReviewsItem: FC<IReviewsItem> = ({ dataItem }) => {
    const defaultdateReviews = moment(dataItem.DateQuestion).format('DD MM YYYY HH:mm');
    const defaultdateResponse = moment(dataItem.DateAnswer).format('DD MM YYYY HH:mm');

    return (
        <div className={style['reviews-item']}>
            <div className={style['reviews-item__header']}>
                <p className={style['reviews-item__user']}>
                    {dataItem.ContactName}
                </p>
                <p className={style['reviews-item__date']}>
                    {defaultdateReviews}
                </p>
            </div>
            <p className={style['reviews-item__title']}>
                {dataItem.Question}
            </p>
            <div className={style['reviews-item-response']}>
                <div className={style['reviews-item-response__header']}>
                    <p className={style['reviews-item-response__admin']}>
                       INTERCARS
                    </p>
                    <p className={style['reviews-item-response__date']}>
                        {defaultdateResponse}
                    </p>
                </div>
                <p className={style['reviews-item-response__text']}>
                    {dataItem.Answer}
                </p>
            </div>
        </div>
    );
};

export default ReviewsItem;