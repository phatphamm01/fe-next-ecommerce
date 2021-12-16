import { FC, ReactChild, ReactNode } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import Control, { IControl } from "../Control";
import View from "../View";

const ATMBox = styled.div`
  ${tw`relative max-w-[800px] h-[680px] w-full bg-color-bg border-8 border-red-200 rounded-[40px]`}
`;
const ATMMain = styled.div`
  ${tw`absolute w-[98%] h-[98%] bg-color-bg rounded-[25px] grid`}
  box-shadow: inset -10px -10px 10px #fff, inset 10px 10px 10px  #D4D1E6;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  grid-template-rows: 1fr 240px;
`;

interface ILayoutChird {
  Control: FC<IControl>;
  View: FC;
}

interface ILayout {}

const Layout: FC<ILayout> & ILayoutChird = ({ children }) => {
  return (
    <ATMBox>
      <ATMMain>{children}</ATMMain>
    </ATMBox>
  );
};

Layout.Control = Control;
Layout.View = View;

export default Layout;
