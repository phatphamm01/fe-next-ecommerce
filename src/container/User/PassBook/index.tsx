import { FC, useContext, useEffect, useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import Layout from "../components/Layout";
import Button from "design/Button";
import Box from "design/Box";
import Create from "./components/Create";
import { PopupContext } from "pages/_app";
import fetchPassbook from "services/passbook";
import Item from "./components/Item";
import IconLoading from "../../../design/IconLoading/index";
import { toast } from "react-toastify";

const PassBookContainer = styled.div`
  ${tw`max-w-[800px] mx-auto`}
`;
const Title = styled.p`
  ${tw`text-center font-semibold text-3xl py-12`}
`;
const PassBookBox = styled.div`
  ${tw`h-[300px] mt-10`}
`;
const ButtonBox = styled.div`
  ${tw`w-[200px] mb-2 ml-auto`}
`;
const MessageBox = styled.div`
  ${tw`w-full h-full flex items-center justify-center`}
`;
const Message = styled.span`
  ${tw`font-medium text-2xl`}
`;

const List = styled.ul`
  ${tw`grid sm:grid-cols-1 grid-cols-2 gap-6 pb-16`}
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
  const { setHtml, closePopup } = useContext(PopupContext);
  const [passbookList, setPassbookList] = useState<IPassbookData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    handleGetAllPassbook();
  }, []);

  const handleGetAllPassbook = async () => {
    try {
      setLoading(true);
      const data = await getAllPassbookApi();

      let handleData = [...data].sort(
        (a, b) => Number(a.status) - Number(b.status)
      );

      setPassbookList(handleData);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const getAllPassbookApi = async () => {
    const { data } = await fetchPassbook.getAll();
    return data;
  };

  const handleCreate = () => {
    const component = (
      <Box style={{ width: "560px" }} title="Tạo sổ tiết kiệm">
        <Create
          handleGetAllPassbook={handleGetAllPassbook}
          closePopup={handleClosePopup}
        />
      </Box>
    );
    setHtml?.(component);
  };

  const handleClosePopup = () => {
    closePopup?.();
  };

  return (
    <Layout>
      <PassBookContainer>
        <Title>Sổ tiết kiệm</Title>
        <ButtonBox>
          <Button variant="container" onClick={handleCreate}>
            Tạo sổ tiết kiệm
          </Button>
        </ButtonBox>
        <PassBookBox>
          {loading ? (
            <IconLoading widtH={50} border={6} />
          ) : passbookList.length > 0 ? (
            <List>
              {passbookList.map((value) => (
                <Item key={value._id} data={value} />
              ))}
            </List>
          ) : (
            <MessageBox>
              <Message>Bạn chưa có sổ tiết kiệm</Message>
            </MessageBox>
          )}
        </PassBookBox>
      </PassBookContainer>
    </Layout>
  );
};

export default PassBook;
