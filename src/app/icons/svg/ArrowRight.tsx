import React from 'react';

const ArrowRight = ({ className}: {className:string}) => {
    return (
        <svg className={className} width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M8.36843 6.00002L11.3684 9.00002L8.36843 12L9.4998 13.1314L13.0655 9.56571C13.3779 9.25329 13.3779 8.74676 13.0655 8.43434L9.4998 4.86865L8.36843 6.00002Z" fill="currentColor" />
            <path d="M11.5 8.25H2.5V9.75H11.5V8.25Z" fill="currentColor" />
        </svg>
    );
};

export default ArrowRight;