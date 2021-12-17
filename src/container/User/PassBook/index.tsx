import { FC } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import Layout from "../components/Layout";
import Button from "design/Button";

const PassBookContainer = styled.div`
  ${tw`max-w-[640px] mx-auto `}
`;
const Title = styled.p`
  ${tw`text-center font-semibold text-3xl py-12`}
`;
const PassBookBox = styled.div`
  ${tw`bg-white  h-[300px] shadow-card px-10 rounded-lg`}
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
interface IPassBook {}

const PassBook: FC<IPassBook> = () => {
  return (
    <Layout>
      <PassBookContainer>
        <Title>Sổ tiết kiệm</Title>
        <ButtonBox>
          <Button variant="container"> Tạo sổ tiết kiệm</Button>
        </ButtonBox>
        <PassBookBox>
          <MessageBox>
            <Message>Bạn chưa có sổ tiết kiệm</Message>
          </MessageBox>
        </PassBookBox>
      </PassBookContainer>
    </Layout>
  );
};

export default PassBook;
