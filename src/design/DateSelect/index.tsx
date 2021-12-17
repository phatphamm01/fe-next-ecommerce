import Input from "container/Auth/components/InputAuth";
import React, { Fragment, useEffect, useRef, useState } from "react";
import Calendar from "react-calendar";
import tw from "twin.macro";
import "react-calendar/dist/Calendar.css";
import { Calendar2 } from "iconsax-react";

import styled from "styled-components";
import useToggleAndClose from "hook/useToggleAndClose";

const InputContainer = tw.div`text-gray-600`;
const Label = tw.label``;
const InputBox = tw.div`relative border-b border-b-gray-400 text-sm`;
const InputText = tw.div`w-full pb-3 pt-2 font-bold text-2xl text-red-600`;
const InputTextChild = tw.input`inline outline-none font-bold text-2xl text-red-600`;
const InputLeft = tw.div`absolute top-1/2 -translate-y-1/2 right-0`;

const CalendarContainer = styled.div<{ isActive: boolean }>(() => [
  ({ isActive }) => (isActive ? tw`visible` : tw`invisible`),
  tw`absolute z-50 transition-all duration-200 w-[320px] bg-white shadow-lg p-2 rounded`,
]);

const CalendarBox = tw(Calendar)`z-20`;
interface IDateSelect {
  name: string;
  value?: string;
  title: string;
  onChange?: (value: string) => void;
}

const DateSelect = ({ name, value, title }: IDateSelect) => {
  const [date, setDate] = useState<Date>(new Date());

  const [day, setDay] = useState<number>(0);
  const [month, setMonth] = useState<number>(0);
  const [year, setYear] = useState<number>(0);

  const calandar = useRef<any>();
  const [isPick, setIsPick] = useToggleAndClose(calandar);

  useEffect(() => {
    setDay(date.getDate());
    setMonth(date.getMonth() + 1);
    setYear(date.getFullYear());
  }, [date]);

  const handleZero = (value: string) =>
    value.length === 1 ? `0${value}` : value;

  const handleWidth = (value: number) =>
    handleZero(value + "")
      .split("")
      .reduce((result, value) => (value != "1" ? result + 16 : result + 10), 0);

  const InputTextMemo = React.memo(() => {
    return <CalendarBox onChange={setDate} value={date} />;
  });

  return (
    <InputContainer>
      <Label htmlFor={name}>{title}</Label>
      <InputBox>
        <InputText>
          <InputTextChild
            readOnly
            style={{ width: `${handleWidth(day)}px` }}
            type="text"
            value={handleZero(day + "")}
          />
          /
          <InputTextChild
            readOnly
            style={{ width: `${handleWidth(month)}px` }}
            type="text"
            value={handleZero(month + "")}
          />
          /<InputTextChild readOnly type="text" value={year} />
        </InputText>
        <CalendarContainer isActive={isPick} ref={calandar}>
          <InputTextMemo />
        </CalendarContainer>

        <InputLeft>
          <Calendar2 onClick={setIsPick} size="32" color="#615e5d" />
        </InputLeft>
      </InputBox>
    </InputContainer>
  );
};

export default DateSelect;
