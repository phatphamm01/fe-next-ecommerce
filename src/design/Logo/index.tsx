import LinkNext from 'design/Link';
import Image from 'next/image';

const Logo = () => {
  return (
    <LinkNext href="/home">
      <Image src="/svg/logo.svg" height={50} width={154} alt="logo" />
    </LinkNext>
  );
};

export default Logo;
