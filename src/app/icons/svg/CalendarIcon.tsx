import React, { FC } from 'react';

interface CalendarIconProps {
    className?: string;
    onClick?: () => void;
  }
  
const CalendarIcon:FC <CalendarIconProps> = ({ className, onClick })  => {
    return (
        <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 3C7.44772 3 7 3.44772 7 4V5H6C4.89543 5 4 5.89543 4 7V9H20V7C20 5.89543 19.1046 5 18 5H17V4C17 3.44772 16.5523 3 16 3C15.4477 3 15 3.44772 15 4V5H9V4C9 3.44772 8.55228 3 8 3Z" fill="#9FB1C9" />
            <path d="M20 11H4V17C4 18.1046 4.89543 19 6 19H18C19.1046 19 20 18.1046 20 17V11Z" fill="#9FB1C9" />
        </svg>
    );
};

export default CalendarIcon;