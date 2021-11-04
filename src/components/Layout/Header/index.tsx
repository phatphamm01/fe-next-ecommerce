import Button from 'design/Button';
import LinkNext, { ILinkNext } from 'design/Link';
import Logo from 'design/Logo';
import { Fragment, useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

const HeaderContainer = tw.div`xl:container lg:mx-auto  mx-4 flex justify-between items-center  pt-3`;
const LogoContainer = tw.div``;
const NavContainer = tw.ul`flex gap-10`;
const NavMain = tw.ul`hidden lg:flex gap-12 items-center`;
const TextNav = tw.li``;
const AuthContainr = tw.div`flex gap-6`;

const MobileNav = tw.div``;
const IconMenu = tw.i`lg:hidden cursor-pointer text-3xl font-bold text-red-600`;

const MobileContainer = styled.div<{ active: boolean }>(() => [
  tw`fixed h-full w-[300px] bg-red-600 z-20 transition `,
  ({ active }) => (active ? tw`translate-x-[0]` : tw`translate-x-[-300px]`),
]);

const Shadow = tw.div`absolute h-full w-full z-10`;

const NavMobileContainer = tw.ul`text-blue-50 mt-20`;
const TextMobileNav = tw.li`cursor-pointer text-base py-5 px-4 border-b-2`;
const AuthMobileContainr = tw.div`grid gap-6 mx-4 mt-10`;
const LogoMobileContainer = tw.div`w-full bg-white my-2 text-center py-2 pr-4`;

const Header = () => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleActive = () => {
    console.log(isActive);

    setIsActive(!isActive);
  };

  const navList: Array<ILinkNext> = [
    {
      href: '/home',
      children: 'Tài khoản & thẻ',
    },
    {
      href: '/home#tool',
      children: 'Công cụ tính lãi',
    },
  ];

  return (
    <Fragment>
      <MobileContainer active={isActive}>
        <LogoMobileContainer>
          <Logo />
        </LogoMobileContainer>
        <NavMobileContainer>
          <TextMobileNav>Tài khoản & thẻ</TextMobileNav>
          <TextMobileNav>Công cụ tính lãi</TextMobileNav>
        </NavMobileContainer>
        <AuthMobileContainr>
          <Button
            style={{ background: 'white', border: 'none', color: 'black' }}
          >
            Đăng nhập
          </Button>
          <Button style={{ border: '1px solid white' }} variant="container">
            Mở tài khoản
          </Button>
        </AuthMobileContainr>
      </MobileContainer>
      {isActive && <Shadow onClick={handleActive} />}
      <HeaderContainer>
        <LogoContainer>
          <Logo />
        </LogoContainer>
        <MobileNav>
          <IconMenu onClick={handleActive} className="ri-menu-3-fill" />
        </MobileNav>
        <NavMain>
          <NavContainer>
            {navList.map((value, key) => (
              <TextNav key={key}>
                <LinkNext href={value.href}>{value.children}</LinkNext>
              </TextNav>
            ))}
          </NavContainer>

          <AuthContainr>
            <LinkNext href="/login">
              <Button variant="outlined">Đăng nhập</Button>
            </LinkNext>
            <LinkNext href="/login">
              <Button variant="container">Mở tài khoản</Button>
            </LinkNext>
          </AuthContainr>
        </NavMain>
      </HeaderContainer>
    </Fragment>
  );
};

export default Header;
