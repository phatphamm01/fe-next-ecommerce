import {
  Dispatch,
  FC,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import tw from "twin.macro";
import ReactSelect, { GetOptionLabel, StylesConfig } from "react-select";

const SelectContainer = styled.div`
  ${tw`text-lg bg-white w-full`}
`;
const SelectBox = styled.div`
  ${tw`relative `}
`;

const ErrorMessage = styled.div`
  ${tw`text-red-500 pt-1 h-3`}
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
    // console.log(selected);
    console.log(defaultValue);
  }, []);

  useEffect(() => {
    funcClear?.(() => handleClear);
  }, [ref]);

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
        {<ErrorMessage>{errors && touched ? errors : ""}</ErrorMessage>}
      </SelectBox>
    </SelectContainer>
  );
};

export default Select;
