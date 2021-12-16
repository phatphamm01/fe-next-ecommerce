import ATM from "container/ATM";
import Meta from "design/Meta";
import type { NextPage } from "next";
import { Fragment } from "react";

const ATMPage: NextPage = () => {
  return (
    <Fragment>
      <Meta title="ATM" />
      <ATM />
    </Fragment>
  );
};

export default ATMPage;
