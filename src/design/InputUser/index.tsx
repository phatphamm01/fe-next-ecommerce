import { CSSProperties, ReactChild, useRef } from "react";
import styled from "styled-components";
import tw from "twin.macro";

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
  ${tw`outline-none w-full pb-1 pt-2 font-semibold text-lg text-red-600`}
`;
const InputLeft = styled.div`
  ${tw`absolute top-1/2 -translate-y-1/2 right-0`}
`;
const ErrorMessage = styled.div`
  ${tw`text-red-500 pt-1 h-3`}
`;

interface IInput {
  name: string;
  value?: string;
  type: "text" | "number" | "password";
  placeholder?: string;
  iconLeft?: ReactChild;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  errors?: string | undefined;
  touched?: boolean | undefined;
  pattern?: string;
  title?: string;
  nullError?: boolean;
  styledInput?: CSSProperties;
}

const InputUser = ({
  name,
  title,
  type = "text",
  placeholder,
  value,
  onChange,
  iconLeft,
  onBlur,
  errors,
  touched,
  pattern,
  styledInput,
  nullError = true,
}: IInput) => {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <InputContainer>
      <Label htmlFor={name}>{title}</Label>
      <InputBox>
        <InputText
          style={styledInput}
          autoComplete="off"
          type={type}
          id={name}
          placeholder={placeholder}
          value={value}
          ref={ref}
          pattern={pattern}
          onChange={onChange}
          onBlur={onBlur}
        />
        <InputLeft>{iconLeft}</InputLeft>
      </InputBox>
      {nullError && (
        <ErrorMessage>{errors && touched ? errors : ""}</ErrorMessage>
      )}
    </InputContainer>
  );
};

export default InputUser;
