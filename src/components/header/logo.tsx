import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Logo: React.FC<{ classname: string }> = ({ classname }) => {
  return (
    <Link href="/">
      <Image
        src="/logo.svg"
        className={classname}
        height={32}
        width={32}
        alt="Follow us on Twitter"
        loading="lazy"
      />
    </Link>
  );
};

export default Logo;
