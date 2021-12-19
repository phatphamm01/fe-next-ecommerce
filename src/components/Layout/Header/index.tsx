import Button from "@design/Button";
import LinkNext, { ILinkNext } from "@design/Link";
import Logo from "@design/Logo";
import { TextalignRight } from "iconsax-react";
import { Fragment, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";

const HeaderContainer = styled.div`
  ${tw`container mx-auto lg:max-w-full lg:mx-4  flex justify-between items-center pt-3`}
`;
const LogoContainer = styled.div`
  ${tw``}
`;
const NavContainer = styled.ul`
  ${tw`flex gap-10`}
`;
const NavMain = styled.ul`
  ${tw`flex lg:hidden gap-12 items-center`}
`;
const TextNav = styled.li`
  ${tw``}
`;
const AuthContainr = styled.div`
  ${tw`flex gap-6 w-[300px]`}
`;
const MobileNav = styled.div`
  ${tw``}
`;
const IconMenu = styled(TextalignRight)`
  ${tw`hidden lg:block cursor-pointer text-3xl font-bold text-red-600`}
`;
const MobileContainer = styled.div<{ active: boolean }>`
  ${tw`fixed h-full w-[300px] bg-red-600 z-20 transition `}
  ${({ active }) => (active ? tw`translate-x-[0]` : tw`translate-x-[-300px]`)}
`;
const Shadow = styled.div`
  ${tw`absolute h-full w-full z-10`}
`;
const NavMobileContainer = styled.ul`
  ${tw`text-blue-50 mt-20`}
`;
const TextMobileNav = styled.li`
  ${tw`cursor-pointer text-base py-5 px-4 border-b-2`}
`;
const AuthMobileContainer = styled.div`
  ${tw`grid gap-6 mx-4 mt-10`}
`;
const LogoMobileContainer = styled.div`
  ${tw`w-full bg-white my-2 text-center py-2 pr-4`}
`;

const Header = () => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleActive = () => {
    setIsActive(!isActive);
  };

  const navList: Array<ILinkNext> = [
    {
      href: "/home",
      children: "Tài khoản & thẻ",
    },
    {
      href: "/home#tool",
      children: "Công cụ tính lãi",
    },
    {
      href: "/atm",
      children: "ATM",
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
        <AuthMobileContainer>
          <Button
            style={{ background: "white", border: "none", color: "black" }}
          >
            <LinkNext href="/login">Đăng nhập</LinkNext>
          </Button>
          <Button style={{ border: "1px solid white" }} variant="container">
            <LinkNext href="/login">Mở tài khoản</LinkNext>
          </Button>
        </AuthMobileContainer>
      </MobileContainer>
      {isActive && <Shadow onClick={handleActive} />}
      <HeaderContainer>
        <LogoContainer>
          <Logo />
        </LogoContainer>
        <MobileNav>
          <IconMenu
            variant="Bold"
            color="#dc2626"
            onClick={handleActive}
            className="ri-menu-3-fill"
          />
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
            <Button variant="outlined">
              <LinkNext href="/login">Đăng nhập</LinkNext>
            </Button>
            <Button style={{ flexGrow: 1 }} variant="container">
              <LinkNext href="/signup">Mở tài khoản</LinkNext>
            </Button>
          </AuthContainr>
        </NavMain>
      </HeaderContainer>
    </Fragment>
  );
};

export default Header;
