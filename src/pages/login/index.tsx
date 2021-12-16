import { Fragment } from "react";
import { NextPage } from "next";

import Login from "container/auth/Login";

import Meta from "design/Meta";

const LoginPage: NextPage = () => {
  return (
    <Fragment>
      <Meta title="Đăng nhập" />
      <Login />
    </Fragment>
  );
};

export default LoginPage;
