'use client';
import React from 'react';
import { GridLoader } from 'react-spinners';



const Download = () => {
    
    return (
        <div>
           <GridLoader color={'#0243A6'} loading={ true} size={5}/> 
        </div>
    );
};

export default Download;