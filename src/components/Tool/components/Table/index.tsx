import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import tw from "twin.macro";
import moment, { Moment } from "moment";
moment.locale("vi");
const TableContainer = tw.div`inline-block border border-red-500 overflow-hidden rounded-xl`;
const TableBox = tw.table`mx-auto rounded-xl text-center `;
const THead = tw.thead`bg-red-600 text-white  z-20`;
const TBody = tw.tbody``;
const Tr = styled.tr(() => [
  css`
    th:first-child,
    td:first-child {
      border-left: none !important;
    }
    th:last-child,
    td:last-child {
      border-right: none !important;
    }

    th {
      border-top: none !important;
    }

    &:last-child td {
      font-size: 16px;
      font-weight: 500;
      border-bottom: none !important;
    }
  `,
]);
const styleCell = tw`border border-red-500 overflow-hidden overflow-ellipsis max-w-[200px]`;
const Th = styled.th(() => [styleCell, tw`px-4 py-3 uppercase`]);
const Td = styled.td(() => [styleCell, tw`px-4 py-5 text-sm text-gray-600`]);

let MONEY = 1000;
const SENDING_TEMRM = 3;
const INTEREST_RATE = 6;
const NO_INTEREST_RATE = 0.2;

const Table = () => {
  const [rawMonthsData, setRawMonthsData] = useState<any>();
  const [dayData, setDayData] = useState<any>();

  const divide = (num1: number, num2: number): number =>
    (num1 - (num1 % num2)) / num2;

  useEffect(() => {
    let date1 = moment("12012021", "DDMMYYYY");
    let date2 = moment("15102021", "DDMMYYYY");

    let start = date1.toDate().getTime();
    let end = date2.toDate().getTime();

    let { rawMonths, residualMonth, day } = handleDate(end, start);
    handleRawMonth(date1, rawMonths);

    console.log(rawMonthsData?.[rawMonthsData?.length - 1]?.day);

    handleDay(
      residualMonth,
      day,
      date2,
      rawMonthsData?.[rawMonthsData?.length - 1]?.day
    );
  }, []);

  const handleRawMonth = (start: Moment, rawMonths: number) => {
    let data: any = [];
    let totalMoney = MONEY;
    for (let month = 0; month < rawMonths; month++) {
      const monthExtra = moment(start);
      monthExtra.add(month * SENDING_TEMRM, "M");

      let interest = ((totalMoney / 100) * INTEREST_RATE) / 12;
      let totalMeneyExtra = totalMoney + interest;
      data.push({
        id: month + 1,
        day: monthExtra,
        time: "Month",
        interest: interest,
        receiver: totalMoney,
        totalMoney: totalMeneyExtra,
      });

      totalMoney += interest;
    }

    setRawMonthsData(data);
  };

  const handleDay = (
    month: number,
    day: number,
    endDay: Moment,
    centerDay?: Moment
  ) => {
    if (!centerDay) {
      console.log(123);

      return;
    }

    let start = centerDay.toDate().getTime();
    let end = endDay?.toDate().getTime();
    let dayHandle = (end - start) / 60 / 60 / 24 / 1000;

    let totalMoney = MONEY;
    let interest = ((totalMoney / 100) * dayHandle) / 360;
    let totalMeneyExtra = totalMoney + interest;

    setDayData({
      id: month + 1,
      day: endDay,
      time: `Day x ${dayHandle}`,
      interest: interest,
      receiver: totalMoney,
      totalMoney: totalMeneyExtra,
    });
  };

  const handleDate = (end: number, start: number) => {
    let timespan = (end - start) / 60 / 60 / 24 / 1000;
    let months = divide(timespan, 30);

    let rawMonths = divide(months, SENDING_TEMRM);

    let day = timespan - months * 30;
    let residualMonth = months - rawMonths * SENDING_TEMRM;

    return { rawMonths, residualMonth, day };
  };

  const numberToMoney = (num: number): string => {
    const formatter = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
    });
    return formatter.format(num);
  };

  return (
    <TableContainer>
      <TableBox>
        <THead>
          <Tr>
            <Th>STT</Th>
            <Th>Kỳ nhận tiền</Th>
            <Th>Thời gian</Th>
            <Th>Gốc</Th>
            <Th>Lãi</Th>
            <Th>Tổng tiền</Th>
          </Tr>
        </THead>
        <TBody>
          {rawMonthsData &&
            rawMonthsData.map((value: any) => (
              <Tr key={value?.id}>
                <Td>{value?.id}</Td>
                <Td>{value?.day?.format("DD/MM/YYYY")}</Td>
                <Td>{value?.time}</Td>
                <Td>{numberToMoney(value?.receiver)}</Td>
                <Td>{numberToMoney(value?.interest)}</Td>
                <Td>{numberToMoney(value?.totalMoney)}</Td>
              </Tr>
            ))}
          {dayData && (
            <Tr key={dayData.id}>
              <Td>{dayData.id}</Td>
              <Td>{dayData.day?.format("DD/MM/YYYY")}</Td>
              <Td>{dayData.time}</Td>
              <Td>{numberToMoney(dayData.receiver)}</Td>
              <Td>{numberToMoney(dayData.interest)}</Td>
              <Td>{numberToMoney(dayData.totalMoney)}</Td>
            </Tr>
          )}

          <Tr>
            <Td colSpan={3}>TỔNG CỘNG</Td>
            <Td>1,000,000,000,000</Td>
            <Td>55,000,000,004</Td>
            <Td>1,155,000,000,004</Td>
          </Tr>
        </TBody>
      </TableBox>
    </TableContainer>
  );
};

export default Table;
