import { FC, useContext, useEffect, useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";

import Button from "@design/Button";

import { PopupContext } from "@pages/_app";
import fetchPassbook from "@services/passbook";
import Layout from "@container/User/components/Layout";
import Table from "./components/Table";
import { useRouter } from "next/router";
import Link from "@design/Link";
import IconLoading from "@design/IconLoading";
import { toast } from "react-toastify";

const PassBookContainer = styled.div`
  ${tw`max-w-[1000px] mx-auto `}
`;
const Title = styled.p`
  ${tw`text-center font-semibold text-3xl py-12`}
`;
const ControlBox = styled.div`
  ${tw`flex items-center justify-between`}
`;
const Control = styled.div`
  ${tw`flex gap-4`}
`;
const ButtonBox = styled.div`
  ${tw`w-[200px]`}
`;

const LoadingBox = styled.div`
  ${tw`h-[400px]`}
`;
const MessageBox = styled.div`
  ${tw``}
`;
const Message = styled.span<{ active: boolean }>`
  ${({ active }) => (active ? tw`text-red-500` : tw`text-green-500`)}
`;
const TableBox = styled.div`
  ${tw`mt-6`}
`;

interface IPassBook {}
export interface IPassbookData {
  createAt: string;
  deposits: number;
  endAt: string;
  option: number;
  status: false;
  _id: string;
}

const PassBook: FC<IPassBook> = () => {
  const router = useRouter();
  const {
    query: { id },
  } = router;

  const { setHtml, closePopup } = useContext(PopupContext);
  const [passbook, setPassbook] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      handleGetAllPassbook();
    }
  }, [id]);

  const handleGetAllPassbook = async () => {
    try {
      setLoading(true);
      const data = await getDetailPassbookApi(id as string);

      setPassbook(data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const getDetailPassbookApi = async (id: string) => {
    const { data } = await fetchPassbook.getDetailPay({ id });
    return data;
  };

  const handleWithdrawal = async (id: string) => {
    let ok = confirm("Bạn chắc chắn muốn rút sổ này ?");
    if (!ok) return;

    try {
      await fetchPassbook.withdrawMoney({
        passbookid: id,
      });

      toast.success("Rút tiền thành công !");
      handleGetAllPassbook();
    } catch (error: any) {
      toast.error(error);
    }
  };

  return (
    <Layout>
      <PassBookContainer>
        <Title>Chi tiết sổ tiết kiệm</Title>
        <ControlBox>
          <MessageBox>
            <b>Trạng thái:</b>{" "}
            <Message active={passbook?.passbook.status}>
              {passbook?.passbook.status ? "Đã rút" : "Chưa rút"}
            </Message>
          </MessageBox>
          <Control>
            <ButtonBox>
              <Button variant="outlined">
                <Link href={"/user/pass-book"}>Quay lại</Link>
              </Button>
            </ButtonBox>
            <ButtonBox>
              <Button
                onClick={() => handleWithdrawal(id as string)}
                variant="container"
              >
                Xác nhận rút
              </Button>
            </ButtonBox>
          </Control>
        </ControlBox>

        {loading ? (
          <LoadingBox>
            <IconLoading widtH={50} border={6} />
          </LoadingBox>
        ) : (
          passbook && (
            <TableBox>
              <Table data={passbook} />
            </TableBox>
          )
        )}
      </PassBookContainer>
    </Layout>
  );
};

export default PassBook;
