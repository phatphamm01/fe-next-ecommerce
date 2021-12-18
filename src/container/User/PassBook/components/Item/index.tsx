import { FC } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import Button from "design/Button";
import { IPassbookData } from "../..";
import moment from "moment";
import convertStringToMoney from "common/function/convertStringToMoney";
import Link from "design/Link";

const ItemContainer = styled.li<{ status: boolean }>`
  ${tw`text-center shadow-card bg-white rounded-lg p-4`}
  ${({ status }) => status && tw`bg-red-100`}
`;
const ItemMoney = styled.p`
  ${tw`text-lg font-semibold mb-1`}
`;
const ItemDay = styled.p`
  ${tw` mb-3`}
`;
const ItemStart = styled.p`
  ${tw`text-sm`}
`;
const ItemEnd = styled.p`
  ${tw`text-sm`}
`;
const ItemControl = styled.div`
  ${tw`flex gap-4 mt-4`}
`;

interface IItem {
  data: IPassbookData;
  handleWithdrawal: (id: string) => void;
}

const Item: FC<IItem> = ({ data, handleWithdrawal }) => {
  return (
    <ItemContainer status={data.status}>
      <ItemMoney>{convertStringToMoney(data.deposits + "")}VND</ItemMoney>
      <ItemDay>
        Thời hạn: <b tw="text-red-600">{data.option}</b> Tháng
      </ItemDay>
      <ItemStart>Ngày bắt đầu: {moment(data.createAt).format("L")}</ItemStart>
      <ItemEnd>Ngày kết thúc: {moment(data.endAt).format("L")}</ItemEnd>
      <ItemControl>
        <Link href={"/user/pass-book/" + data._id}>
          <Button variant="outlined">Xem chi tiết</Button>
        </Link>
        {!data.status && (
          <Button
            onClick={() => handleWithdrawal(data._id)}
            variant="container"
          >
            Rút tiền
          </Button>
        )}
      </ItemControl>
    </ItemContainer>
  );
};

export default Item;
