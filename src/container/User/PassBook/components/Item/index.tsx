import checkNullObject from "@common/function/checkNullObject";
import { numberToMoneyVer2 } from "@common/function/convertStringToMoney";
import Box from "@design/Box";
import Button from "@design/Button";
import Link from "@design/Link";
import { PopupContext } from "@pages/_app";
import fetchPassbook from "@services/passbook";
import moment from "moment";
import { FC, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { IPassbookData } from "../..";
import Table from "./Table";

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
const TableBox = styled.div`
  ${tw`px-4 pb-6`}
`;
const ButtonBox = styled.div`
  ${tw`pt-3`}
`;

interface IItem {
  data: IPassbookData;
}

const Item: FC<IItem> = ({ data }) => {
  const { setHtml, closePopup } = useContext(PopupContext);
  const [dataDetail, setDataDetail] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    if (checkNullObject(dataDetail)) return;

    handleCreate();
  }, [dataDetail]);

  const handleGetDetailPassbook = async () => {
    try {
      setLoading(true);
      const result = await getDetailPassbookApi(data._id);
      setDataDetail(result);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const getDetailPassbookApi = async (passbookid: string) => {
    const { data } = await fetchPassbook.getDetail({ passbookid });
    return data;
  };

  const handleCreate = () => {
    const component = (
      <Box style={{ width: "560px" }} title="Chi tiết sổ tiết kiệm">
        <TableBox>
          <Table data={dataDetail} />
          <ButtonBox>
            <Button
              onClick={() => {
                closePopup?.();
              }}
              variant="outlined"
            >
              Thoát
            </Button>
          </ButtonBox>
        </TableBox>
      </Box>
    );
    setHtml?.(component);
  };

  return (
    <ItemContainer status={data.status}>
      <ItemMoney>{numberToMoneyVer2(data.deposits)}VND</ItemMoney>
      <ItemDay>
        Thời hạn: <b tw="text-red-600">{data.option}</b> Tháng
      </ItemDay>
      <ItemStart>Ngày bắt đầu: {moment(data.createAt).format("L")}</ItemStart>
      <ItemEnd>Ngày kết thúc: {moment(data.endAt).format("L")}</ItemEnd>
      <ItemControl>
        {!data.status && (
          <>
            <Button
              disabled={loading}
              onClick={() => handleGetDetailPassbook()}
              variant="outlined"
            >
              Xem chi tiết
            </Button>

            <Button variant="container">
              <Link href={"/user/pass-book/" + data._id}>Rút tiền</Link>
            </Button>
          </>
        )}
        {data.status && (
          <Button variant="outlined">
            <Link href={"/user/pass-book/" + data._id}>Xem chi tiết</Link>
          </Button>
        )}
      </ItemControl>
    </ItemContainer>
  );
};

export default Item;
