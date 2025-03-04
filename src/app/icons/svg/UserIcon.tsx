import React from 'react';

const UserIcon = ({ className }: { className: string }) => {
    return (
        <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 10C14.2091 10 16 8.20914 16 6C16 3.79086 14.2091 2 12 2C9.79086 2 8 3.79086 8 6C8 8.20914 9.79086 10 12 10Z" fill="current" />
            <path d="M4 16C4 13.7909 5.79086 12 8 12H16C18.2091 12 20 13.7909 20 16V19H4V16Z" fill="current" />
        </svg>
    );
};

export default UserIcon;