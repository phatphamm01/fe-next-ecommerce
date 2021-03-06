import { numberToMoneyVer2 } from "@common/function/convertStringToMoney";
import moment from "moment";
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
const Summon = styled.div`
  ${tw`font-semibold text-xl text-red-500`}
`;

const TBody = styled.tbody`
  ${tw``}
`;
interface ITable {
  data: any;
}

const Table: FC<ITable> = ({ data }) => {
  return (
    <TableContainer>
      <TabelBox>
        <TBody>
          <TR>
            <TD>
              <Box>
                <Value>{data.passbook.option} Tháng</Value>
                <Title>Thời hạn</Title>
              </Box>
            </TD>
            <TD>
              <Box>
                <Value>{data.value} %</Value>
                <Title>Lãi suất</Title>
              </Box>
            </TD>
          </TR>
          <TR>
            <TD>
              <Box>
                <Value>{numberToMoneyVer2(data.passbook.deposits!)}</Value>
                <Title>Tiền gửi</Title>
              </Box>
            </TD>
            <TD>
              <Box>
                <Value>{numberToMoneyVer2(data.profit!)}</Value>
                <Title>Tiền lãi</Title>
              </Box>
            </TD>
          </TR>
          <TR>
            <TD>
              <Box>
                <Value>{moment(data.passbook.createAt).format("LL")}</Value>
                <Title>Ngày gửi</Title>
              </Box>
            </TD>
            <TD>
              <Box>
                <Value>{moment(data.passbook.endAt).format("LL")}</Value>
                <Title>Ngày đáo hạn</Title>
              </Box>
            </TD>
          </TR>
          <TR>
            <TD colSpan={2}>
              <Box>
                <Value>{numberToMoneyVer2(data.totalmoney!)}</Value>
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
