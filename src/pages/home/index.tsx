import Home from "@container/Home";
import Meta from "@design/Meta";
import type { NextPage } from "next";
import { Fragment } from "react";

const HomePage: NextPage = () => {
  return (
    <Fragment>
      <Meta title="Trang chủ" />
      <Home />
    </Fragment>
  );
};

export default HomePage;
