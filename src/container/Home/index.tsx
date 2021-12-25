import Banner from "@components/Banner";
import Layout from "@components/Layout";
import Tool from "@components/Tool";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    handleMailchimp();
  }, []);

  const handleMailchimp = () => {
    let link =
      "https://chimpstatic.com/mcjs-connected/js/users/ca76a5435dd6fb7a8efb0d6d4/bd2de19c76a741b74c3692c79.js";
    let m: any = document.createElement("script");
    let p: any = document.getElementsByTagName("script")[2];
    m.async = 1;
    m.src = link;
    p.parentNode.insertBefore(m, p);
  };

  return (
    <Layout>
      <Banner />
      <Tool />
    </Layout>
  );
};

export default Home;
