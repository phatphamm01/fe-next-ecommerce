import Verify from "@components/Verify";
import Button from "@design/Button";
import Input from "@design/InputAuth";
import { PopupContext } from "@pages/_app";
import fetchUser from "@services/user/auth";
import "antd/dist/antd.css";
import { Formik } from "formik";
import { Eye, EyeSlash } from "iconsax-react";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import tw from "twin.macro";
import Layout from "../components/Layout";

const LoginForm = styled.form`
  ${tw`lg:mx-10 mx-20 mt-12 grid gap-4`}
`;
const ButtonContainer = styled.div`
  ${tw`text-center grid gap-4`}
`;
const FormControl = styled.div`
  ${tw`flex justify-between`}
`;
const SavePass = styled.div`
  label {
    padding-left: 10px;
  }
`;
const ForgetPass = styled.div`
  ${tw``}
`;
const Link = styled.a`
  ${tw`text-red-600`}
`;

const Login = () => {
  const { setHtml, closePopup } = useContext(PopupContext);
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

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

  const JSXVerify = (email: string) => {
    return (
      <Verify
        headerTitle="Xác nhận Thiết Bị"
        headerContent="qua tài khoản email "
        content={
          <>
            Vui lòng lấy mã code từ email (
            <Link href="https://www.gmail.com" target="_blank">
              {email}
            </Link>
            ) của bạn để xác thực đăng nhập . Nếu không có mã vui lòng kiểm tra
            hộp thư mail spam.
          </>
        }
      />
    );
  };

  const handleVerify = (email: string) => {
    setHtml?.(JSXVerify(email));
  };

  return (
    <Layout>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={async (values) => {
          try {
            setLoading(true);
            await fetchUser.signin(values);

            handleVerify(values.email);
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
            <LoginForm onSubmit={handleSubmit}>
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
                placeholder="Password"
                type={isShowPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors.password}
                touched={touched.password}
                iconLeft={handlEyesPassword()}
              />
              <FormControl>
                <SavePass>
                  <input type="checkbox" name="savepass" id="savepass" />
                  <label htmlFor="savepass">Lưu mật khẩu</label>
                </SavePass>
                <ForgetPass>
                  <Link href="/forget">Quên mật khẩu</Link>
                </ForgetPass>
              </FormControl>
              <ButtonContainer>
                <Button disabled={loading} type="submit" variant="container">
                  Đăng nhập
                </Button>
                <Link href="/signup">
                  <Button type="button" variant="text">
                    Đăng kí
                  </Button>
                </Link>
              </ButtonContainer>
            </LoginForm>
          );
        }}
      </Formik>
    </Layout>
  );
};

export default Login;
