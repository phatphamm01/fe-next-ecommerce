import Link from 'next/link';
import { ReactNode } from 'react';

export interface ILinkNext {
  href: string;
  children: ReactNode;
}

const LinkNext = ({ children, href }: ILinkNext) => {
  return (
    <Link href={href}>
      <a>{children}</a>
    </Link>
  );
};

export default LinkNext;
