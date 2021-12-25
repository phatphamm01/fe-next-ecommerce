import DetectingInactiveUsers from "@common/utils/detectingInactiveUsers";
import useToggleAndCloseVer2 from "@hook/useToggleAndCloseVer2";
import { FC, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import tw from "twin.macro";
import Header from "./Header";
import Navbar from "./Navbar";

const LayoutContainer = styled.div`
  ${tw``}
`;
const Main = styled.div<{ isActive: boolean }>`
  ${tw`min-h-[calc(100vh - 56px)]`}
  ${({ isActive }) =>
    isActive &&
    css`
      background-color: #00000032;
      filter: blur(2px);
    `}
`;
const NavBox = styled.div`
  ${tw``}
`;
interface ILayout {}

const Layout: FC<ILayout> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useToggleAndCloseVer2(ref);

  useEffect(() => {}, [isActive]);

  const handleNavOpen = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    DetectingInactiveUsers.add();
    return () => {
      DetectingInactiveUsers.remove();
    };
  }, []);

  return (
    <LayoutContainer>
      <Header isActive={isActive} handleNav={handleNavOpen} />

      <NavBox ref={ref}>
        <Navbar handleNav={handleNavOpen} isActive={isActive} />
      </NavBox>

      <Main isActive={isActive}>{children}</Main>
    </LayoutContainer>
  );
};

export default Layout;
