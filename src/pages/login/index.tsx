import Login from "@container/Auth/Login";
import Meta from "@design/Meta";
import { NextPage } from "next";
import { Fragment } from "react";

const LoginPage: NextPage = () => {
  return (
    <Fragment>
      <Meta title="Đăng nhập" />
      <Login />
    </Fragment>
  );
};

export default LoginPage;
