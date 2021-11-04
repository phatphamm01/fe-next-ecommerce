import React from 'react';
import tw from 'twin.macro';
import styled from 'styled-components';

const ButtonContainer = styled.button(({ variant, rounded }: IButton) => [
  tw`px-4 py-2 rounded`,
  rounded && tw`rounded-full`,
  variant === 'text' && tw``,
  variant === 'container' && tw`text-blue-50 bg-red-600 border border-red-700`,
  variant === 'outlined' && tw`border border-gray-700`,
]);

interface IButton {
  children?: string;
  variant?: 'text' | 'container' | 'outlined';
  rounded?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

const Button = ({ children, variant, rounded, onClick, style }: IButton) => {
  return (
    <ButtonContainer
      style={style}
      onClick={onClick}
      rounded={rounded}
      variant={variant}
    >
      {children}
    </ButtonContainer>
  );
};

export default Button;
