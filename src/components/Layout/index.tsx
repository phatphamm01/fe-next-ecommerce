import { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

interface IMain {
  children: ReactNode;
}

const Main = ({ children }: IMain) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Main;
