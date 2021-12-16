import { FC } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import Power from "assets/svg/power.svg";
import Logo from "design/Logo";

const ATMControl = styled.div<{ active?: boolean }>`
  ${tw`relative w-[97.4%] h-[95%] rounded-[25px] border-red-300 border mb-10 flex items-center justify-center`}
  justify-self: center;
  box-shadow: 4px 4px 4px #e6d1d1, -4px -4px 4px #fff;
`;
const ButtonPower = styled.div<{ active?: boolean }>`
  ${tw`h-24 w-40 flex justify-center items-center border  rounded-[50px] text-green-500`}

  ${({ active }) =>
    active
      ? tw`text-green-500 border-green-300`
      : tw`text-red-500 border-red-300`}
  transition: all 50ms ease-in;
  box-shadow: ${({ active }) =>
    !active
      ? "4px 4px 4px #e6d1d1, -4px -4px 4px #fff"
      : "inset 4px 4px 4px #e6d1d1, inset -4px -4px 4px #fff"};
`;
const LogoBox = styled.div`
  ${tw`absolute  border-red-300 border top-[10px] left-[10px] px-4  rounded-[20px]`}
  box-shadow: 4px 4px 4px #e6d1d1, -4px -4px 4px #fff;
`;

export interface IControl {
  active?: boolean;
  handleButton?: () => void;
}

const Control: FC<IControl> = ({ active, handleButton }) => {
  return (
    <ATMControl>
      <LogoBox>
        <Logo />
      </LogoBox>
      <ButtonPower onClick={handleButton} active={active}>
        <Power />
      </ButtonPower>
    </ATMControl>
  );
};

export default Control;
