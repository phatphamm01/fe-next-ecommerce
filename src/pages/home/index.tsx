import Banner from 'components/Banner';
import Layout from 'components/Layout';
import Tool from 'components/Tool';
import Meta from 'design/Meta';
import type { NextPage } from 'next';
import { Fragment } from 'react';

const Home: NextPage = () => {
  return (
    <Fragment>
      <Meta title="Trang chủ" />
      <Layout>
        <Banner />
        <Tool />
      </Layout>
    </Fragment>
  );
};

export default Home;
