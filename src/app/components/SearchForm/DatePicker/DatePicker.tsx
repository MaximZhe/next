import React from 'react';
import Calendar from 'react-calendar';
import CalendarIcon from '@/app/icons/svg/CalendarIcon';
import styles from '../SearchForm.module.scss';

interface IDateInputProps {
    date: string;
    setDate: (date: string) => void;
    updateDate: Date;
    setCalendarShow: (show: boolean) => void;
    isCalendarShow: boolean;
    handleDateChange: (date: any) => void;
}

const DateInput: React.FC<IDateInputProps> = ({
    date,
    setDate,
    updateDate,
    setCalendarShow,
    isCalendarShow,
    handleDateChange,
}) => {
    return (
        <div className={styles['form-search__wrapper']}>
            <label className={styles['form-search__label']}>Когда</label>
            <div className={styles['form-search__container']}>
                <input
                    className={styles['form-search__input']}
                    type="text"
                    value={date}
                    readOnly
                    onClick={() => setCalendarShow(true)}
                />
                <div className={styles['form-search__icon-wrapper']} onClick={() => setCalendarShow(false)}>
                    <CalendarIcon className={`${styles['form-search__icon']} ${isCalendarShow ? styles.active : ''}`} />
                </div>
            </div>
            {isCalendarShow && (
                <div className={styles['form-search__calendar']}>
                    <Calendar onChange={handleDateChange} value={updateDate} minDate={new Date()} />
                </div>
            )}
        </div>
    );
};

export default DateInput;