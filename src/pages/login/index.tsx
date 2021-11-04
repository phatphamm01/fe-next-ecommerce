import { Fragment } from 'react';
import { NextPage } from 'next';

import LoginPage from 'container/LoginPage';

import Meta from 'design/Meta';

const Login: NextPage = () => {
  return (
    <Fragment>
      <Meta title="Đăng nhập" />
      <LoginPage />
    </Fragment>
  );
};

export default Login;
