import React from 'react';

const SupportIcon = ({ className }: { className: string }) => {
    return (
        <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M5 7C5 4.23858 7.23858 2 10 2H14C16.7614 2 19 4.23858 19 7V9H17V7C17 5.34315 15.6569 4 14 4H10C8.34315 4 7 5.34315 7 7V9H5V7Z" fill="#0243A6" />
            <path fillRule="evenodd" clipRule="evenodd" d="M14.4 20.0667H12V21H14.4C16.3882 21 18 19.1196 18 16.8V14H17.2V16.8C17.2 18.6041 15.9464 20.0667 14.4 20.0667Z" fill="#0243A6" />
            <path d="M2 13C2 11.8954 2.89543 11 4 11H7V18H4C2.89543 18 2 17.1046 2 16V13Z" fill="#0243A6" />
            <path d="M22 13C22 11.8954 21.1046 11 20 11H17V18H20C21.1046 18 22 17.1046 22 16V13Z" fill="#0243A6" />
            <path d="M15 20.5C15 19.6716 14.3284 19 13.5 19H10.5C9.67157 19 9 19.6716 9 20.5C9 21.3284 9.67157 22 10.5 22H13.5C14.3284 22 15 21.3284 15 20.5Z" fill="#0243A6" />
        </svg>
    );
};

export default SupportIcon;