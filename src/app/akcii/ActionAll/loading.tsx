'use client';
import React from 'react';
import { GridLoader } from 'react-spinners';
const Loading = () => {
    
    return (
        <div className='loading-spiner'>
           <GridLoader color={'#0243A6'} loading={ true} size={10}/> 
        </div>
    );
};

export default Loading;