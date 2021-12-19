import Recharge from "@container/User/components/Recharge";
import Box from "@design/Box";
import { PopupContext } from "@pages/_app";
import { useRouter } from "next/router";
import { FC, useContext } from "react";
import styled from "styled-components";
import tw from "twin.macro";

const NavbarContainer = styled.div`
  ${tw``}
`;

const MobileContainer = styled.div<{ active: boolean }>`
  ${tw`fixed h-[calc(100vh - 56px)] w-[220px] bg-red-600 z-20 transition right-0 `}
  ${({ active }) => (active ? tw`translate-x-[0]` : tw`translate-x-[220px]`)}
`;

const NavList = styled.ul`
  ${tw``}
`;
const NavItem = styled.li`
  ${tw`grid gap-2 grid-cols-[40px 1fr] text-base font-light text-white px-10 py-5 border-b-[1px] border-b-gray-100`}

  &:hover {
    ${tw`bg-red-700 cursor-pointer`}
  }

  i {
    ${tw`text-base text-center`}
  }
`;

interface INavbar {
  isActive: boolean;
  handleNav: () => void;
}

const Navbar: FC<INavbar> = ({ isActive, handleNav }) => {
  const { setHtml, closePopup } = useContext(PopupContext);
  const router = useRouter();

  const handleLogout = async () => {
    await localStorage.clear();
    router.push("/home");
  };

  const handleRecharge = () => {
    handleNav();
    const component = (
      <Box title="Nạp tiền">
        <Recharge />
      </Box>
    );
    setHtml?.(component);
  };

  return (
    <NavbarContainer>
      <MobileContainer active={isActive}>
        <NavList>
          <NavItem onClick={handleRecharge}>
            <i className="fas fa-money-bill-alt"></i>
            <span>Nạp tiền</span>
          </NavItem>
          <NavItem onClick={handleLogout}>
            <i className="fas fa-power-off"></i>
            <span>Đăng xuất</span>
          </NavItem>
        </NavList>
      </MobileContainer>
    </NavbarContainer>
  );
};

export default Navbar;
