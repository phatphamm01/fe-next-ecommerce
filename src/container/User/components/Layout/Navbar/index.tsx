import { FC } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { useRouter } from "next/router";

const NavbarContainer = styled.div`
  ${tw``}
`;

const MobileContainer = styled.div<{ active: boolean }>`
  ${tw`fixed h-full w-[220px] bg-red-600 z-20 transition right-0 `}
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
}

const Navbar: FC<INavbar> = ({ isActive }) => {
  const router = useRouter();

  const handleLogout = async () => {
    await localStorage.clear();
    router.push("/home");
  };

  return (
    <NavbarContainer>
      <MobileContainer active={isActive}>
        <NavList>
          <NavItem>
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
