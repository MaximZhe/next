import React from 'react';

const ArrowIcon = ({ className}: {className?:string}) => {
    return (
        <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M5.86843 6.00002L8.86843 9.00002L5.86843 12L6.9998 13.1314L10.5655 9.56571C10.8779 9.25329 10.8779 8.74676 10.5655 8.43434L6.9998 4.86865L5.86843 6.00002Z" fill="current" />
        </svg>
    );
};

export default ArrowIcon;