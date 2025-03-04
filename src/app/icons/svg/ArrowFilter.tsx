import React from 'react';

const ArrowFilter = ({ className }: { className?: string }) => {
    return (
        <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M5.00002 8.86843L8.00002 11.8684L11 8.86843L12.1314 9.99981L8.56571 13.5655C8.25329 13.8779 7.74676 13.8779 7.43434 13.5655L3.86865 9.9998L5.00002 8.86843Z" fill="current" />
            <path d="M7.25 12L7.25 5L8.75 5L8.75 12L7.25 12Z" fill="current" />
        </svg>
    );
};

export default ArrowFilter;