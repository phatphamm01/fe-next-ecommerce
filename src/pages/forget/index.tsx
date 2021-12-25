import Forget from "@container/Auth/Forget";
import Meta from "@design/Meta";
import { NextPage } from "next";
import { Fragment } from "react";

const ForgetPage: NextPage = () => {
  return (
    <Fragment>
      <Meta title="Quên mật khẩu" />
      <Forget />
    </Fragment>
  );
};

export default ForgetPage;
