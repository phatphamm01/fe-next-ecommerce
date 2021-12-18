import React, { ReactChild } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import IconLoading from "design/IconLoading";

const ButtonContainer = styled.button(({ variant, rounded }: IButton) => [
  tw`px-4 py-2 rounded w-full h-[42px]`,
  rounded && tw`rounded-full`,
  variant === "text" && tw``,
  variant === "container" && tw`text-blue-50 bg-red-600 border border-red-700`,
  variant === "outlined" && tw`border border-gray-700`,
]);

interface IButton {
  children?: ReactChild;
  variant?: "text" | "container" | "outlined";
  rounded?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const Button = ({
  children,
  variant,
  rounded,
  onClick,
  style,
  type,
  disabled,
}: IButton) => {
  return (
    <ButtonContainer
      disabled={disabled}
      type={type}
      style={style}
      onClick={onClick}
      rounded={rounded}
      variant={variant}
    >
      {disabled ? <IconLoading /> : children}
    </ButtonContainer>
  );
};

export default Button;
