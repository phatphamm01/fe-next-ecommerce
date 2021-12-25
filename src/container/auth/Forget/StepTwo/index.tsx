import Button from "@design/Button";
import Input from "@design/InputAuth";
import { Formik } from "formik";
import { Eye, EyeSlash } from "iconsax-react";
import { useRouter } from "next/router";
import { FC, useContext, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import tw from "twin.macro";
import * as Yup from "yup";
import { ForgetContext } from "..";
import fetchUser from "../../../../services/user/auth";

const StepTwoContainer = styled.div`
  ${tw``}
`;
const Form = styled.form`
  ${tw`h-full grid py-10 grid-rows-[260px 1fr]`}
`;
const ButtonContainer = styled.div`
  ${tw`mt-4 text-center grid gap-4`}
`;

interface IStepTwo {}

export interface IDataStepTwo {
  code?: string;
  password?: string;
  passwordConfirm?: string;
}

const StepTwo: FC<IStepTwo> = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const { setStepNumber } = useContext(ForgetContext);

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
        code: "",
        password: "",
        passwordConfirm: "",
      }}
      validationSchema={Yup.object().shape({
        code: Yup.string()
          .required("Vui lòng nhập code")
          .length(6, "Mã code không chính xác")
          .matches(/^(?=.*[0-9])/, "Mã code không chính xác"),
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
      })}
      onSubmit={async (payload: IDataStepTwo) => {
        try {
          setLoading(true);
          await fetchUser.resetPassword(payload);
          router.push("/login");
          toast.success("Đã thay đổi mật khẩu thành công");
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

        const handleChangeStepOne = () => {
          setStepNumber?.(1);
        };

        return (
          <StepTwoContainer>
            <Form onSubmit={handleSubmit}>
              <div>
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
              </div>

              <ButtonContainer>
                <Button disabled={loading} variant="container">
                  Xác nhận
                </Button>
                <Button
                  type="button"
                  onClick={handleChangeStepOne}
                  variant="text"
                >
                  Quay lại
                </Button>
              </ButtonContainer>
            </Form>
          </StepTwoContainer>
        );
      }}
    </Formik>
  );
};

export default StepTwo;
