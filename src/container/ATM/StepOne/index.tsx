import Button from "@design/Button";
import fetchAtm from "@services/atm";
import { message } from "antd";
import "antd/dist/antd.css";
import { Formik } from "formik";
import { FC, useContext, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { setDataUser } from "..";
import { ATMContext } from "../index";

const StepOneContainer = styled.form`
  ${tw``}
`;

const StepOneBox = styled.div`
  ${tw`flex flex-col gap-4 max-w-[320px] mx-auto mt-6`}
`;
const Title = styled.p`
  ${tw`text-center font-bold text-red-600 text-xl`}
`;
const InputBox = styled.div`
  ${tw`border-2 border-red-400 rounded-lg`}
`;
const Input = styled.input`
  ${tw`outline-none bg-transparent w-full h-full py-3 px-3 text-red-600`}

  &::placeholder {
    ${tw`text-red-300 font-light`}
  }
`;
const ControlBox = styled.div`
  ${tw``}
`;

interface IStepOne {}

const StepOne: FC<IStepOne> = () => {
  const { dispatch } = useContext(ATMContext);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={async (values) => {
        setLoading(true);
        const payload = { ...values };
        try {
          const {
            data: { accessToken },
          }: any = await fetchAtm.login(payload);

          const { data: dataUser } = await fetchAtm.getUser({ accessToken });

          let data = { data: dataUser, token: accessToken };
          setLoading(false);
          await dispatch?.(setDataUser({ payload: data }));
        } catch (error: any) {
          message.error(error.message);
          setLoading(false);
        }
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
          <StepOneContainer onSubmit={handleSubmit}>
            <StepOneBox>
              <Title>Đăng nhập</Title>
              <InputBox>
                <Input
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  placeholder="Email"
                />
              </InputBox>
              <InputBox>
                <Input
                  name="password"
                  type="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder="Mật khẩu"
                />
              </InputBox>
              <ControlBox>
                <Button disabled={loading} type="submit" variant="container">
                  Đăng nhập
                </Button>
              </ControlBox>
            </StepOneBox>
          </StepOneContainer>
        );
      }}
    </Formik>
  );
};

export default StepOne;
