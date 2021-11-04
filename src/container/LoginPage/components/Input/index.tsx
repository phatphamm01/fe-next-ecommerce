import { ReactChild, RefObject, useRef } from 'react';
import tw from 'twin.macro';

const InputContainer = tw.div`text-gray-600`;
const Label = tw.label``;
const InputBox = tw.div`relative border-b-[3px] border-b-red-500 text-sm`;
const InputText = tw.input`outline-none w-full pl-2 pb-[13px] pt-4 text-base font-medium placeholder:text-base placeholder:font-medium  placeholder:text-gray-600 text-gray-600`;
const InputLeft = tw.div`absolute top-1/2 -translate-y-1/2 right-0`;

interface IInput {
  name: string;
  value?: string;
  title: string;
  onChange?: (value: string, ref: RefObject<HTMLInputElement>) => void;
  type: 'text' | 'number';
  placeholder: string;
  iconLeft?: ReactChild;
}

const Input = ({
  name,
  title,
  type = 'text',
  placeholder,
  value,
  onChange,
  iconLeft,
}: IInput) => {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <InputContainer>
      {/* <Label htmlFor={name}>{title}</Label> */}
      <InputBox>
        <InputText
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
