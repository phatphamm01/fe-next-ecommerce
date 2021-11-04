import { ReactChild, RefObject, useRef } from 'react';
import tw from 'twin.macro';

const InputContainer = tw.div`text-gray-600`;
const Label = tw.label``;
const InputBox = tw.div`relative border-b border-b-gray-400 text-sm`;
const InputText = tw.input`outline-none w-full pb-3 pt-2 font-bold text-2xl text-red-600`;
const InputLeft = tw.div`absolute top-1/2 -translate-y-1/2 right-0`;

interface IInput {
  name: string;
  value?: string;
  title: string;
  onChange?: (value: string, ref: RefObject<HTMLInputElement>) => void;
  type: 'text' | 'number';
  placeholder?: string;
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
      <Label htmlFor={name}>{title}</Label>
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
