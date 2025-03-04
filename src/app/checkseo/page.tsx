'use client';
import React, { useState } from 'react';
import { fetchTextsFromDouble } from '../utils/dobleseo';
import style from './CheckSeo.module.scss'
import { fetchTextsFromUrls } from '../utils/searchListSeomanual';
import { fetchTextsFromUrlsBenefits } from '../utils/searchListSeoBenefits';
const CheckSeo = () => {
    const [arrayUrls, setArrayUrls] = useState<string>('');
    const [results, setResults] = useState<any[]>([]); 


    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setArrayUrls(e.target.value);
    };

    const handleSubmit = async () => {
        
        const inputArray = arrayUrls.split(',').map(item => item.trim()).filter(item => item !== '');
        
       
        const results = await fetchTextsFromDouble(inputArray);
        setResults(results); 
        
    };
    const handleSubmitList = async () => {

        const inputArray = arrayUrls.split(',').map(item => item.trim()).filter(item => item !== '');
        
        
        const results = await fetchTextsFromUrls(inputArray);
        setResults(results); 
       
    };
    const handleSubmitListBenefits = async () => {
      const inputArray = arrayUrls.split(',').map(item => item.trim()).filter(item => item !== '');
      
      
      const results = await fetchTextsFromUrlsBenefits(inputArray);
      setResults(results);
    }
    return (
        <div className={style['wrapper']}>
            <textarea 
                value={arrayUrls} 
                onChange={handleInputChange} 
                placeholder="Введите URL через запятую" 
            />
            <button onClick={handleSubmit}>Проверить SEO Дубли</button>
            <button onClick={handleSubmitList}>Проверить SEO Список Инструкция</button>
            <button onClick={handleSubmitListBenefits}>Проверить SEO Список Дополнительно</button>
            <div className={style['wrapper']}>
                {results.map((result, index) => (
                    <div key={index} className={style['item']}>
                        <p>URL: {result.url}</p>
                        <p>Текст: {result.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CheckSeo;