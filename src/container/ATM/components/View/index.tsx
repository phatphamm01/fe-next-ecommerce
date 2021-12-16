import { FC } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import Logo from "design/Logo";

const ATMView = styled.div`
  ${tw`flex flex-col gap-4 px-4`}
`;
const LogoBox = styled.div`
  ${tw`mx-auto`}
`;
const Main = styled.div`
  ${tw`flex-grow`}
`;

interface IView {}

const View: FC<IView> = ({ children }) => {
  return (
    <ATMView>
      <LogoBox>
        <Logo />
      </LogoBox>
      <Main>{children}</Main>
    </ATMView>
  );
};

export default View;
