import checkNullObject from "@common/function/checkNullObject";
import { numberToMoneyVer2 } from "@common/function/convertStringToMoney";
import fetchUser from "@services/user/auth";
import { FC, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import styled from "styled-components";
import tw from "twin.macro";
import Layout from "./components/Layout";

const UserContainer = styled.div`
  ${tw``}
`;
const Title = styled.p`
  ${tw`text-center font-semibold text-3xl pt-12`}
`;
const InfoBox = styled.div`
  ${tw`mx-auto bg-white max-w-[560px] mt-10 shadow-card px-10 py-4 rounded-lg`}
`;
const InfoTitle = styled.p`
  ${tw`text-lg font-bold mb-4`}
`;
const InfoItem = styled.p`
  ${tw`mb-4 text-gray-800`}
`;

interface IUser {}

const User: FC<IUser> = () => {
  const [user, setUser] = useState<any>();

  useEffect(() => {
    handleDataUser();
  }, []);

  const handleDataUser = async () => {
    const data = await getUserApi();

    setUser(data);
  };

  const getUserApi = async () => {
    const { data } = await fetchUser.get();
    return data;
  };

  const renderData = (data: any, key: any, affterText?: any) => {
    return (
      <>
        {key.map((value: any) => (
          <InfoItem key={value.id}>
            {!checkNullObject(data) ? (
              <>
                <b>{value.title}</b> :{" "}
                {affterText
                  ? data?.[value.id] && numberToMoneyVer2(data?.[value.id])
                  : data?.[value.id]}{" "}
                {affterText}
              </>
            ) : (
              <Skeleton />
            )}
          </InfoItem>
        ))}
      </>
    );
  };

  return (
    <Layout>
      <UserContainer>
        <Title>Tài khoản</Title>
        <InfoBox>
          <InfoTitle>Thông tin</InfoTitle>
          {renderData(user, infoArr)}
        </InfoBox>
        <InfoBox>
          <InfoTitle>Card</InfoTitle>
          {renderData(user, cardArr, "VND")}
        </InfoBox>
      </UserContainer>
    </Layout>
  );
};

export default User;

const infoArr = [
  { id: "id", title: "ID" },
  { id: "email", title: "Email" },
  { id: "fullName", title: "Họ và tên" },
  { id: "phoneNumber", title: "Số điện thoại" },
  { id: "address", title: "Địa chỉ" },
];

const cardArr = [{ id: "currentMoney", title: "Số tiền hiện tại" }];
