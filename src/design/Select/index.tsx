import { Dispatch, FC, SetStateAction, useEffect, useRef } from "react";
import ReactSelect, { GetOptionLabel, StylesConfig } from "react-select";
import styled from "styled-components";
import tw from "twin.macro";

const SelectContainer = styled.div`
  ${tw`text-lg bg-white w-full`}
`;
const SelectBox = styled.div`
  ${tw`relative `}
`;

const ErrorMessage = styled.div`
  ${tw`text-red-500 pt-1 min-h-[0.75rem] text-xs`}
  background: #f4f5f6;
`;

const colourStyles: StylesConfig = {
  control: (styles) => ({
    ...styles,
    background: "#f4f5f6",
    border: "none",
    borderRadius: "none",
    borderBottom: "3px solid rgb(239, 68, 68)",
    boxShadow: "none",

    ":hover": {
      border: "none",
      borderBottom: "3px solid rgb(239, 68, 68)",
    },
    ":focus": {
      border: "none",
      borderBottom: "3px solid rgb(239, 68, 68)",
    },
  }),
  placeholder: (styles) => ({
    ...styles,
    color: "rgb(75, 85, 99)",
    fontWeight: 500,
    fontSize: "1rem",
    lineHeight: "1.5rem",
  }),
  singleValue: (styles) => ({
    ...styles,
    fontSize: "1rem",
    fontWeight: 500,
    color: "rgb(75,85,99)",
  }),
};

interface IOption {
  [key: string]: any;
}

interface ISelect {
  defaultValue?: IOption;
  options: Array<IOption>;
  onChange: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
  onBlur: (
    field: string,
    isTouched?: boolean | undefined,
    shouldValidate?: boolean | undefined
  ) => void;
  errors?: any;
  touched?: any;
  name: string;
  placeholder?: string;
  getOptionLabel?: GetOptionLabel<any>;
  getOptionValue?: GetOptionLabel<any>;
  funcClear?: Dispatch<SetStateAction<(() => void) | undefined>>;
}

const Select: FC<ISelect> = ({
  name,
  onChange,
  onBlur,
  options,
  errors,
  placeholder = "Select",
  touched,
  getOptionLabel,
  getOptionValue,
  funcClear,
  defaultValue,
}) => {
  const ref = useRef<any>();

  useEffect(() => {
    funcClear?.(() => handleClear);
  }, [ref]);

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  const handleClear = () => {
    ref?.current?.clearValue();
  };

  const handleChange = (value: any) => {
    onChange(name, value);
  };

  const handleBlur = () => {
    onBlur(name, true);
  };

  return (
    <SelectContainer>
      <SelectBox>
        <ReactSelect
          id={name}
          styles={colourStyles}
          placeholder={placeholder}
          options={options}
          onChange={handleChange}
          onBlur={handleBlur}
          defaultValue={defaultValue}
          getOptionLabel={getOptionLabel}
          getOptionValue={getOptionValue}
          ref={ref}
        />
        {<ErrorMessage>{errors ? errors : ""}</ErrorMessage>}
      </SelectBox>
    </SelectContainer>
  );
};

export default Select;
