import { CSSProperties, ReactChild, RefObject, useRef } from "react";
import tw from "twin.macro";
import styled from "styled-components";

const InputContainer = styled.div`
  ${tw`text-gray-600`}
`;
const Label = styled.label`
  ${tw``}
`;
const InputBox = styled.div`
  ${tw`relative border-b border-b-gray-400 text-sm`}
`;
const InputText = styled.input`
  ${tw`outline-none w-full pb-3 pt-2 font-bold text-2xl text-red-600`}
  background-color: #f4f5f6;
`;
const InputLeft = styled.div`
  ${tw`absolute top-1/2 -translate-y-1/2 right-0`}
`;

interface IInput {
  name: string;
  value?: string;
  title: string;
  onChange?: (value: string, ref: RefObject<HTMLInputElement>) => void;
  type: "text" | "number";
  placeholder?: string;
  iconLeft?: ReactChild;
  style?: CSSProperties;
}

const Input = ({
  name,
  title,
  type = "text",
  placeholder,
  value,
  onChange,
  iconLeft,
  style,
}: IInput) => {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <InputContainer>
      <Label htmlFor={name}>{title}</Label>
      <InputBox>
        <InputText
          style={style}
          autoComplete="off"
          type={type}
          id={name}
          placeholder={placeholder}
          value={value}
          ref={ref}
          onChange={(e) => onChange && onChange(e.target.value, ref)}
        />
        <InputLeft>{iconLeft}</InputLeft>
      </InputBox>
    </InputContainer>
  );
};

export default Input;
