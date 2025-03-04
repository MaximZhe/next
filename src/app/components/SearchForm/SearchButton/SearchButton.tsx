import React from 'react';
import styles from '../SearchForm.module.scss';

interface ISearchButtonProps {
    isLoading: boolean;
    handleSubmit: () => void;
}

const SearchButton: React.FC<ISearchButtonProps> = ({ isLoading, handleSubmit }) => {
    return (
        <div className={styles['form-search__wrapper']}>
            <button className={styles['form-search__btn-submit']} type='button' onClick={handleSubmit}>
                {isLoading ? 'Идет поиск...' : 'Найти билеты'}
            </button>
        </div>
    );
};

export default SearchButton;