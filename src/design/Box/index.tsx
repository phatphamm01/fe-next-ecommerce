import { CSSProperties, FC, ReactChild, useContext } from "react";
import styled, { css, keyframes } from "styled-components";
import tw from "twin.macro";
import { PopupContext } from "../../pages/_app";

const top = keyframes`
  from {
    opacity: 0;
    top:46%;
  }

  to {
    top:50%;
    opacity: 1;
  }
`;

const BoxContainer = styled.div<{ isClose: boolean }>`
  ${tw`absolute bg-white rounded-lg overflow-hidden`}
  top:50%;
  left: 50%;
  transform: translate(-50%, -50%);

  min-width: 500px;
  max-height: 100vh;

  animation: ${top} 300ms linear;

  ${({ isClose }) =>
    isClose &&
    css`
      top: 46%;
      opacity: 0;
      transition: all 300ms linear;
    `};
`;

const Title = styled.p`
  ${tw`text-center text-2xl text-gray-700 font-bold py-4 cursor-default`}
`;

interface IBox {
  title: ReactChild;
  style?: CSSProperties;
}

const Box: FC<IBox> = ({ children, title, style }) => {
  const { isClose } = useContext(PopupContext);

  return (
    <BoxContainer isClose={!!isClose} style={style}>
      <Title>{title}</Title>
      {children}
    </BoxContainer>
  );
};

export default Box;
