import { Fragment } from "react";
import { NextPage } from "next";

import PassBook from "@container/User/PassBook/Id";

import Meta from "@design/Meta";

const UserPage: NextPage = () => {
  return (
    <Fragment>
      <Meta title="User - Summon" />
      <PassBook />
    </Fragment>
  );
};

export default UserPage;
