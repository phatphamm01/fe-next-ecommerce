import { ReactChild, useRef } from "react";
import styled from "styled-components";
import tw from "twin.macro";

const InputContainer = styled.div`
  ${tw`text-gray-600`}
`;
const InputBox = styled.div`
  ${tw`relative border-b-[3px] border-b-red-500 text-sm`}
`;
const InputText = styled.input`
  ${tw`outline-none w-full pl-[10px] pb-[8px] pt-3 text-base font-medium placeholder:text-base placeholder:font-medium  placeholder:text-gray-600 text-gray-600`}
  background-color: transparent;
`;
const InputLeft = styled.div`
  ${tw`absolute top-1/2 -translate-y-1/2 right-0`}
`;
const ErrorMessage = styled.div`
  ${tw`text-red-500 pt-1 min-h-[0.75rem] text-xs`}
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
}

const Input = ({
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur,
  errors,
  pattern,
  touched,
  iconLeft,
}: IInput) => {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <InputContainer>
      <InputBox>
        <InputText
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

      {<ErrorMessage>{errors && touched ? errors : ""}</ErrorMessage>}
    </InputContainer>
  );
};

export default Input;
