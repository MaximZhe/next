import React, { FC } from 'react';
import style from './PaginationTravels.module.scss'

interface IPaginationTravels {
    currentPage: any
}
const PaginationTravels: FC<IPaginationTravels> = ({ currentPage }) => {
    const pages = currentPage < 10 ? 1 : currentPage / 10

    const arrayPages = Array.from({ length: pages }, (_, index) => index + 1);
    
    return (
        <div className={style.pagination}>

            <span className={style["pagination-numbers"]}>
                {arrayPages.map(item => (
                    <button className={`${style["pagination-number"]} ${style["pagination-number--active"]}`}>{item}</button>
                ))}


            </span>
        </div>
    );
};

export default PaginationTravels;