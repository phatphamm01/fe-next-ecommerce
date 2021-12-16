import { FC, useContext, ReactChild } from "react";
import tw from "twin.macro";
import styled, { keyframes } from "styled-components";
import Input from "design/Input";
import Button from "design/Button";
import { PopupContext } from "pages/_app";

const top = keyframes`
  from {
    opacity: 0;
    top:46%;
  }

  to {
    top:50%;
    opacity: 1;
  }
`;

const VerifyContainer = styled.div`
  ${tw`absolute grid grid-rows-[160px 1fr] bg-white rounded-lg overflow-hidden`}
  top:50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 500px;
  min-height: 440px;

  animation: ${top} 300ms linear;
`;

const Header = styled.div`
  ${tw`text-center bg-red-700 pt-8`}
`;

const HeaderTitle = styled.p`
  ${tw`font-medium text-xl text-white`}
`;
const HeaderContext = styled.i`
  ${tw`text-white`}
`;
const HeaderIcon = styled.i`
  ${tw`text-3xl text-white mb-1`}
`;
const Main = styled.div`
  ${tw`px-12 py-8`}
`;
const Content = styled.p`
  ${tw`mt-4 text-gray-600 text-sm `}
`;
const MainControl = styled.div`
  ${tw`flex mt-10 gap-6`}
`;
const Link = styled.a`
  ${tw`text-red-400`}
`;

interface IVerify {
  headerTitle: string;
  headerContent: string;
  content: ReactChild;
}

const Verify: FC<IVerify> = ({ content, headerContent, headerTitle }) => {
  const { setHtml, closePopup } = useContext(PopupContext);
  return (
    <VerifyContainer>
      <Header>
        <HeaderIcon className="fas fa-mobile-alt" />
        <HeaderTitle>{headerTitle}</HeaderTitle>
        <HeaderContext>{headerContent}</HeaderContext>
      </Header>
      <Main>
        <Input
          style={{ fontSize: "18px", paddingBottom: "4px" }}
          placeholder="Code"
          title=""
          name=""
          type="text"
        />
        <Content>{content}</Content>
        <MainControl>
          <Button onClick={() => closePopup?.()} variant="outlined">
            Trở lại
          </Button>
          <Button variant="container">Xác nhận</Button>
        </MainControl>
      </Main>
    </VerifyContainer>
  );
};

export default Verify;
