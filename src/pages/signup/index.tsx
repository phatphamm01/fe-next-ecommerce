import { Fragment } from "react";
import { NextPage } from "next";

import Signup from "container/Auth/Signup";

import Meta from "design/Meta";

const SignupPage: NextPage = () => {
  return (
    <Fragment>
      <Meta title="Đăng kí" />
      <Signup />
    </Fragment>
  );
};

export default SignupPage;
