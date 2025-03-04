'use client'

import { FC } from 'react';

import './Breadcrumbs.scss';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface ILink {
  label: string;
  href?: string;
  active?: boolean;
  backPage?: () => void;
  back?: boolean
}

interface ILinks {
  links: ILink[];
}
const Breadcrumbs: FC<ILinks> = ({ links }) => {
  const router = useRouter();
  function handleBackPage() {
    router.back()
  }
  return (
    <div>
      {links.map((link: any, index: number) => (
        <span key={index}>
          {index > 0 && ' | '}
          {link.active ? (
            <>
              <span>{link.label}</span>
             
            </>
          ) : (
            link.back ? (
              <>
                <Link  href={link.href} onClick={handleBackPage} scroll={false}>
                  {link.label}
                </Link>
                
              </>

            ) : (
              <>
                <Link  href={link.href}>
                  {link.label}
                </Link>
                
              </>

            )
          )}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumbs;
