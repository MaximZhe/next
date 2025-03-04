'use client';
import React from 'react';
import { GridLoader } from 'react-spinners';


import style from './UserProfile.module.scss';
const Loading = () => {
    
    return (
        <div className={style['loading-spiner-account']}>
           <GridLoader color={'#0243A6'} loading={ true} size={5}/> 
        </div>
    );
};

export default Loading;