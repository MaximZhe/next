import { ReactNode } from 'react';
import style from './EmailContacts.module.scss';
import Link from 'next/link';
const EmailContacts = ({className, href, children} : {className:string, href:string, children:ReactNode}) => {
    return (
        <Link href={href} className={`${style['contacts-item-email']} ${className}`}>
            {children}
        </Link>
    );
};

export default EmailContacts;