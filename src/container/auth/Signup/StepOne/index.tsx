import Button from "@design/Button";
import Input from "@design/InputAuth";
import Link from "@design/Link";
import { Formik } from "formik";
import { Eye, EyeSlash } from "iconsax-react";
import { FC, useContext, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import * as Yup from "yup";
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
        email: data?.email || "",
        password: data?.password || "",
        passwordConfirm: data?.password || "",
        phoneNumber: data?.phoneNumber || "",
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("Chưa đúng định dạng Email")
          .max(255)
          .required("Vui lòng nhập email"),
        password: Yup.string()
          .required("Vui lòng nhập mật khẩu")
          .min(8, "Mật khẩu phải lớn hơn 8 kí tự")
          .matches(
            /^(?=.*[A-Z])(?=.*[0-9])(?=.*[.!@#\$%\^&\*])/,
            "Mật khẩu gồm 1 kí tự in hoa, 1 kí tự đặt biệt và 1 số"
          ),
        passwordConfirm: Yup.string().when("password", {
          is: (val: string) => (val && val.length > 0 ? true : false),
          then: Yup.string().oneOf(
            [Yup.ref("password")],
            "Mật khẩu xác thực không khớp"
          ),
        }),
        phoneNumber: Yup.string()
          .matches(phoneRegExp, "Số điện thoại không chính xác")
          .required("Vui lòng nhập số điện thoại"),
      })}
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

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
