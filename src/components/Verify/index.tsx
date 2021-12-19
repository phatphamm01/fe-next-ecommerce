import { FC, useContext, ReactChild } from "react";
import tw from "twin.macro";
import styled, { keyframes } from "styled-components";
import Input from "@design/Input";
import Button from "@design/Button";
import { PopupContext } from "@pages/_app";
import { Formik } from "formik";
import fetchUser from "@services/user/auth";
import { useRouter } from "next/router";

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
  ${tw`absolute max-w-[500px] grid grid-rows-[160px 1fr] bg-white rounded-lg overflow-hidden`}
  top:50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
const Main = styled.form`
  ${tw`px-12 py-8 `}
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
  const router = useRouter();
  const { setHtml, closePopup } = useContext(PopupContext);
  return (
    <VerifyContainer>
      <Header>
        <HeaderIcon className="fas fa-mobile-alt" />
        <HeaderTitle>{headerTitle}</HeaderTitle>
        <HeaderContext>{headerContent}</HeaderContext>
      </Header>
      <Formik
        initialValues={{
          code: "",
        }}
        onSubmit={async (values) => {
          try {
            const { data } = await fetchUser.verify(values);
            let { accessToken = "" } = data;

            if (accessToken) {
              localStorage.setItem("token", data?.accessToken);
              router.push("/user");
            }
            closePopup?.();
          } catch (error) {}
        }}
      >
        {(props) => {
          const {
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
          } = props;

          return (
            <Main onSubmit={handleSubmit}>
              <Input
                name="code"
                placeholder="Code"
                type="text"
                value={values.code}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors.code}
                touched={touched.code}
              />
              <Content>{content}</Content>
              <MainControl>
                <Button
                  type="button"
                  onClick={() => closePopup?.()}
                  variant="outlined"
                >
                  Trở lại
                </Button>
                <Button type="submit" variant="container">
                  Xác nhận
                </Button>
              </MainControl>
            </Main>
          );
        }}
      </Formik>
    </VerifyContainer>
  );
};

export default Verify;
