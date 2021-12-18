import { FC } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { numberToMoneyVer2 } from "common/function/convertStringToMoney";

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
const Summon = styled.div`
  ${tw`font-semibold text-xl text-red-500`}
`;
const THead = styled.thead`
  ${tw``}
`;
const TBody = styled.tbody`
  ${tw``}
`;

interface ITable extends Record<string, any> {
  depositinpassbook?: number;
  deposits?: number;
  profit?: number;
  profitinpassbook?: number;
  totalProfit?: number;
  numberPassBook?: number;
}

const Table: FC<ITable> = ({
  depositinpassbook,
  deposits,
  profit,
  profitinpassbook,
  totalProfit,
  numberPassBook,
}) => {
  return (
    <TableContainer>
      <TabelBox>
        {/* <TR>
          <TD>
            <Box>
              <Summon>Summon gợi ý</Summon>
            </Box>
          </TD>
          <TD>
            <Box>
              <Value>{numberPassBook}</Value>
              <Title>Tài khoản tiết kiệm</Title>
            </Box>
          </TD>
        </TR> */}
        <TBody>
          <TR>
            <TD>
              <Box>
                <Value>{numberToMoneyVer2(depositinpassbook!)}</Value>
                <Title>Số tiền mỗi TK</Title>
              </Box>
            </TD>
            <TD>
              <Box>
                <Value>{numberToMoneyVer2(deposits!)}</Value>
                <Title>Tổng tiền gửi</Title>
              </Box>
            </TD>
          </TR>
          <TR>
            <TD>
              <Box>
                <Value>{numberToMoneyVer2(profitinpassbook!)}</Value>
                <Title>Tiền lãi mỗi TK</Title>
              </Box>
            </TD>
            <TD>
              <Box>
                <Value>{numberToMoneyVer2(profit!)}</Value>
                <Title>Tổng tiền lãi</Title>
              </Box>
            </TD>
          </TR>
          <TR>
            <TD colSpan={2}>
              <Box>
                <Value>{numberToMoneyVer2(totalProfit!)}</Value>
                <Title>Số dư tại ngày đến hạn</Title>
              </Box>
            </TD>
          </TR>
        </TBody>
      </TabelBox>
    </TableContainer>
  );
};

export default Table;
