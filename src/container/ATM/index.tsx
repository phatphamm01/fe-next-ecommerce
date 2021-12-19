import { FC, useEffect, useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import ATMLayout from "./components/Layout";
import router from "next/dist/client/router";
import useLeave from "@hook/useLeave";

const ATMContainer = styled.div`
  ${tw`min-h-[100vh] min-w-[100vw] flex justify-center items-center`}
  background-image: url("https://toigingiuvedep.vn/wp-content/uploads/2021/08/background-anime-duong-pho-ve-dem.jpeg");
`;
const ATMView = styled.div`
  ${tw`w-full h-full`}
`;
const OffBox = styled.div`
  ${tw`w-full h-full flex items-center justify-center pointer-events-none`}
`;
const GreetingMessage = styled.span`
  ${tw`text-red-600 text-xl font-bold text-center pb-10 `}
`;

interface IATM {}

const ATM: FC<IATM> = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  try {
    useLeave("/atm", isOpen);
  } catch (error) {
    console.log(error);
  }

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <ATMContainer>
      <ATMLayout>
        <ATMLayout.View>
          <ATMView>
            {!isOpen && (
              <OffBox>
                <GreetingMessage>
                  Chào mừng bạn đến với ATM Virtual <br />
                  Vui lòng khởi động để sử dụng dịch vụ
                </GreetingMessage>
              </OffBox>
            )}
          </ATMView>
        </ATMLayout.View>
        <ATMLayout.Control handleButton={handleOpen} active={isOpen} />
      </ATMLayout>
    </ATMContainer>
  );
};

export default ATM;
