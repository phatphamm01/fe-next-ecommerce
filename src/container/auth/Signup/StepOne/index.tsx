import Input from "@design/InputAuth";
import Button from "@design/Button";
import Link from "@design/Link";
import { Formik } from "formik";
import { Eye, EyeSlash } from "iconsax-react";
import { FC, useContext, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { SignupContext } from "..";

const StepOneContainer = styled.div`
  ${tw``}
`;
const Form = styled.form`
  ${tw`h-full grid py-10 grid-rows-[260px 1fr]`}
`;
const ButtonContainer = styled.div`
  ${tw`mt-4 text-center grid gap-4`}
`;

interface IStepOne {}

export interface IDataStepOne {
  email: string;
  password: string;
  passwordConfirm: string;
  phoneNumber: string;
}

const StepOne: FC<IStepOne> = () => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const { data, setData, setStepNumber } = useContext(SignupContext);

  const handleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const handlEyesPassword = () => {
    return isShowPassword ? (
      <EyeSlash onClick={handleShowPassword} size="24" color="#9b9b9b" />
    ) : (
      <Eye onClick={handleShowPassword} size="24" color="#9b9b9b" />
    );
  };

  return (
    <Formik
      initialValues={{
        email: data?.email || "minhphatdev@gmail.com",
        password: data?.password || ".Phat2001",
        passwordConfirm: data?.password || ".Phat2001",
        phoneNumber: data?.phoneNumber || "0943987432",
      }}
      //   vali dationSchema={
      //     Yup.object().shape({
      //     email: Yup.string()
      //       .email("Must be a valid email")
      //       .max(255)
      //       .required("Please enter your email"),
      //     password: Yup.string()
      //       .min(6, "Password is more than 6 characters")
      //       .max(30, "Username less than 20 characters")
      //       .required("Please enter your password"),
      //   })
      // }

      onSubmit={async (payload: IDataStepOne) => {
        setData?.({ ...data, ...payload });
        setStepNumber?.(2);
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
                <Input
                  name="password"
                  placeholder="Mật khẩu"
                  type={isShowPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errors={errors.password}
                  touched={touched.password}
                  iconLeft={handlEyesPassword()}
                />
                <Input
                  name="passwordConfirm"
                  placeholder="Nhập lại mật khẩu"
                  type={isShowPassword ? "text" : "password"}
                  value={values.passwordConfirm}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errors={errors.passwordConfirm}
                  touched={touched.passwordConfirm}
                  iconLeft={handlEyesPassword()}
                />
                <Input
                  name="phoneNumber"
                  placeholder="Phone"
                  type="text"
                  value={values.phoneNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errors={errors.phoneNumber}
                  touched={touched.phoneNumber}
                />
              </div>

              <ButtonContainer>
                <Button type="submit" variant="container">
                  Đăng kí
                </Button>
                <Button type="button" variant="text">
                  <Link href="/login">Bạn đã có tài khoản? Đăng nhập</Link>
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
