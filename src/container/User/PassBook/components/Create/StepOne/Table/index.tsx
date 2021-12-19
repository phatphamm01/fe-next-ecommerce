import { FC } from "react";
import styled from "styled-components";
import tw from "twin.macro";

const TableContainer = styled.div`
  ${tw`w-full h-full`}
`;
const TabelBox = styled.table`
  ${tw`w-full text-center bg-red-100 rounded-lg overflow-hidden`}
`;
const TR = styled.tr`
  ${tw``}
`;
const TD = styled.td`
  ${tw`border-[1px] border-gray-300 w-[50%]`}
`;
const Box = styled.div`
  ${tw`py-4`}
`;
const Title = styled.div`
  ${tw`text-transform[uppercase] text-xs font-normal text-gray-500`}
`;
const Value = styled.div`
  ${tw`text-lg text-red-500 font-semibold mb-1`}
`;
const TBody = styled.tbody`
  ${tw``}
`;
interface ITable {
  annualInterest: {
    title: string;
    value: string;
  };
  totalProfit: {
    title: string;
    value: string;
  };
  openDate: {
    title: string;
    value: string;
  };
  endDate: {
    title: string;
    value: string;
  };
  result: {
    title: string;
    value: string;
  };
}

const Table: FC<ITable> = ({
  annualInterest,
  endDate,
  openDate,
  result,
  totalProfit,
}) => {
  return (
    <TableContainer>
      <TabelBox>
        <TBody>
          <TR>
            <TD>
              <Box>
                <Value>{annualInterest.value}</Value>
                <Title>{annualInterest.title}</Title>
              </Box>
            </TD>
            <TD>
              <Box>
                <Value>{totalProfit.value}</Value>
                <Title>{totalProfit.title}</Title>
              </Box>
            </TD>
          </TR>
          <TR>
            <TD>
              <Box>
                <Value>{openDate.value}</Value>
                <Title>{openDate.title}</Title>
              </Box>
            </TD>
            <TD>
              <Box>
                <Value>{endDate.value}</Value>
                <Title>{endDate.title}</Title>
              </Box>
            </TD>
          </TR>
          <TR>
            <TD colSpan={2}>
              <Box>
                <Value>{result.value}</Value>
                <Title>{result.title}</Title>
              </Box>
            </TD>
          </TR>
        </TBody>
      </TabelBox>
    </TableContainer>
  );
};

export default Table;
