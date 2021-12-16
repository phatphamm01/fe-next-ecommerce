import Button from "design/Button";
import Link from "design/Link";
import Logo from "design/Logo";
import { Formik } from "formik";
import { Eye, EyeSlash } from "iconsax-react";
import { PopupContext } from "pages/_app";
import { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import Input from "../components/InputAuth";
import Layout from "../components/Layout";
import Verify from "../../../components/Verify/index";
import fetchUser from "services/user/auth";

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

const Login = () => {
  const { setHtml, closePopup } = useContext(PopupContext);
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

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
        headerContent="qua tài khoản email"
        content={
          <>
            Vui lòng lấy mã code từ email:{" "}
            <Link href="http://www.gmail.com">{email}</Link> để xác nhận quá
            trình đăng nhập . Nếu không có mail vui lòng kiểm tra hộp thư mail
            spam
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
          email: "minhphatdev@gmail.com",
          password: ".Phat2001",
        }}
        onSubmit={async (values) => {
          try {
            const reponse = await fetchUser.signin(values);
            debugger;
            handleVerify(values.email);
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
                <ForgetPass>Quên mật khẩu</ForgetPass>
              </FormControl>
              <ButtonContainer>
                <Button type="submit" variant="container">
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
