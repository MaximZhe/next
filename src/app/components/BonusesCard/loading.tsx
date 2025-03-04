'use client';
import React from 'react';
import { GridLoader } from 'react-spinners';


interface ILoadingBonuses {
    color: string
}
const LoadingBonuses = ({color}: ILoadingBonuses) => {
    
    return (
        <div>
           <GridLoader color={color} loading={ true} size={5}/> 
        </div>
    );
};

export default LoadingBonuses;