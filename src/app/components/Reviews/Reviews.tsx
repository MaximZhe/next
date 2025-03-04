'use client'

import React, { FC, useState } from 'react';
import Button from '../UI/Button/Button';

import ReviewsItem from './ReviewsItem/ReviewsItem';

import ReviewsForm from './ReviewsForm/ReviewsForm';
import style from './reviews.module.scss';
import ArrowRight from '@/app/icons/svg/ArrowRight';

interface IReviewsData {
    reviesData: any

}
const Reviews: FC<IReviewsData> = ({ reviesData }) => {
    const [visibleItems, setVisibleItems] = useState(2);
    const itemsPerPage = 2;

    const handleShowMore = () => {
        setVisibleItems(prevVisibleItems => prevVisibleItems + itemsPerPage);
    };
    return (
        <div className={style.reviews}>
            <div className={style.reviews__content}>
                <p className={style.reviews__title}>
                    Комментарии, вопросы и отзывы пользователей
                </p>
                {reviesData.questionsData.Collection.length > 0 ? (
                    <>
                        {reviesData.questionsData.Collection.slice(0, visibleItems).map((item: any) => (
                            <ReviewsItem key={item.DateQuestion} dataItem={item} />
                        ))}

                        <Button disabled={reviesData.questionsData.Collection.length > visibleItems ? false : true}
                            type='button'
                            onClick={handleShowMore}
                            className={`${style.reviews__btn} ${reviesData.questionsData.Collection.length > visibleItems ? '' : 'disabled'}`}>
                            <p className={style['reviews__btn-text']}>Показать еще</p>
                            <ArrowRight className={style.reviews__icon} />
                        </Button>
                    </> )
                    : (<p className={style['reviews__default']}>По данному маршруту нет отзывов и вопросов, вы можете быть первым.</p> )
                }
            </div>
            <ReviewsForm idDeparture={reviesData.idDeparture} idArrival={reviesData.idArrival} />
        </div>
    );
};

export default Reviews;