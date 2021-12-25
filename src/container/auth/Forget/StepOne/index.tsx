import Button from "@design/Button";
import Input from "@design/InputAuth";
import Link from "@design/Link";
import fetchUser from "@services/user/auth";
import { Formik } from "formik";
import { FC, useContext, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import tw from "twin.macro";
import * as Yup from "yup";
import { ForgetContext } from "..";

const StepOneContainer = styled.div`
  ${tw``}
`;
const Form = styled.form`
  ${tw`h-full grid pt-20 grid-rows-[1fr 260px]`}
`;
const ButtonContainer = styled.div`
  ${tw`mt-4 text-center`}
`;

interface IStepOne {}

export interface IDataStepOne {
  email: string;
}

const StepOne: FC<IStepOne> = () => {
  const { setStepNumber } = useContext(ForgetContext);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <Formik
      initialValues={{
        email: "minhphatdev@gmail.com",
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("Chưa đúng định dạng Email")
          .max(255)
          .required("Vui lòng nhập email"),
      })}
      onSubmit={async (payload: IDataStepOne) => {
        try {
          setLoading(true);
          await fetchUser.forget(payload);
          toast.success("Vui lòng kiểm tra email để nhận mã xác thực");
          setStepNumber?.(2);
        } catch (error: any) {
          toast.error(error);
        } finally {
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
          <StepOneContainer>
            <Form onSubmit={handleSubmit}>
              <div>
                <Input
                  name="email"
                  placeholder="Email"
                  type="text"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errors={errors.email}
                  touched={touched.email}
                />
              </div>

              <ButtonContainer>
                <Button disabled={loading} type="submit" variant="container">
                  Gửi mã xác thực
                </Button>
                <Button type="button" variant="text">
                  <Link href="/login">
                    Bạn vẫn còn nhớ tài khoản? Đăng nhập
                  </Link>
                </Button>
              </ButtonContainer>
            </Form>
          </StepOneContainer>
        );
      }}
    </Formik>
  );
};

export default StepOne;

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
