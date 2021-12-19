import Head from "next/head";
import { Fragment } from "react";

interface ITitle {
  title: string;
  description?: string;
}

const TitlePage = ({
  title,
  description = "Dịch vụ gửi tiền tiết kiệm",
}: ITitle) => {
  return (
    <Fragment>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
    </Fragment>
  );
};

export default TitlePage;
