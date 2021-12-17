import { Fragment } from "react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";

import User from "container/User";

import Meta from "design/Meta";

const UserPage: NextPage = () => {
  return (
    <Fragment>
      <Meta title="User - Summon" />
      <User />
    </Fragment>
  );
};

export default UserPage;
