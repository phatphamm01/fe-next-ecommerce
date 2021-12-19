import { Dispatch, FC, SetStateAction, useEffect } from "react";
import tw from "twin.macro";
import styled, { css } from "styled-components";
import { TextalignRight } from "iconsax-react";
import { useRouter } from "next/router";
import Link from "@design/Link";
import { navLinkData } from "@common/constants/navLinkData";

const HeaderContainer = styled.div`
  ${tw`relative bg-red-700`}
`;
const HeaderBox = styled.div`
  ${tw`flex items-center justify-between `}
`;
const LogoBox = styled.div`
  ${tw`px-6`}
`;
const Logo = styled.img`
  ${tw``}
`;
const IconMenu = styled(TextalignRight)`
  ${tw`text-3xl font-bold text-red-600`}
`;
const NavBox = styled.div`
  ${tw`absolute`}
  top:50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const Nav = styled.nav`
  ${tw`text-center`}
`;
const NavList = styled.ul`
  ${tw`flex gap-8`}
`;
const NavItem = styled.li<{ active: boolean }>`
  ${tw`relative text-white cursor-pointer`}

  ${({ active }) =>
    active &&
    css`
      &:before {
        content: "";
        position: absolute;
        height: 6px;
        width: 100%;
        background-color: white;
        bottom: -16px;
      }
    `}
`;
const IconMenuBox = styled.div`
  ${tw`relative cursor-pointer  px-6 py-4`}

  &::before {
    ${tw`absolute content bg-gray-100`}
    top:50%;
    transform: translateY(-50%);
    left: 0px;
    height: 56px;
    width: 1px;
  }

  &:hover {
    ${tw`bg-red-800`}
    transition: all 200ms ease-in;
  }
`;

interface IHeader {
  handleNav: () => void;
  isActive: boolean;
}

const Header: FC<IHeader> = ({ handleNav, isActive }) => {
  const router = useRouter();

  return (
    <HeaderContainer>
      <HeaderBox>
        <LogoBox>
          <Logo src="/svg/logo-white.svg" />
        </LogoBox>
        <IconMenuBox
          style={{ pointerEvents: isActive ? "none" : "auto" }}
          onClick={() => handleNav()}
        >
          <IconMenu variant="Bold" color="white" className="ri-menu-3-fill" />
        </IconMenuBox>
      </HeaderBox>
      <NavBox>
        <Nav>
          <NavList>
            {navLinkData.map((value) => (
              <NavItem active={value.link === router.asPath} key={value.link}>
                <Link href={value.link}>{value.title}</Link>
              </NavItem>
            ))}
          </NavList>
        </Nav>
      </NavBox>
    </HeaderContainer>
  );
};

export default Header;
