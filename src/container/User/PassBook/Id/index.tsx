import { FC, useContext, useEffect, useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";

import Button from "design/Button";

import { PopupContext } from "pages/_app";
import fetchPassbook from "services/passbook";
import Layout from "container/User/components/Layout";
import Table from "./components/Table";
import { useRouter } from "next/router";
import Link from "design/Link";
import IconLoading from "design/IconLoading";

const PassBookContainer = styled.div`
  ${tw`max-w-[1000px] mx-auto `}
`;
const Title = styled.p`
  ${tw`text-center font-semibold text-3xl py-12`}
`;
const PassBookBox = styled.div`
  ${tw`h-[300px] mt-10`}
`;
const ButtonBox = styled.div`
  ${tw`w-[200px] mb-2 mr-auto`}
`;
const MessageBox = styled.div`
  ${tw`w-full h-full flex items-center justify-center`}
`;
const Message = styled.span`
  ${tw`font-medium text-2xl`}
`;
const LoadingBox = styled.div`
  ${tw`h-[400px]`}
`;

const TableBox = styled.div`
  ${tw`mt-8`}
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
    const { data } = await fetchPassbook.getDetail({ id });
    return data;
  };

  return (
    <Layout>
      <PassBookContainer>
        <Title>Chi tiết sổ tiết kiệm</Title>
        <ButtonBox>
          <Link href={"/user/pass-book"}>
            <Button variant="outlined">Quay lại</Button>
          </Link>
        </ButtonBox>

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
