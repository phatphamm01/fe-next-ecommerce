import { ReactNode, useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import DetectingInactiveUsers from "common/utils/detectingInactiveUsers";

interface IMain {
  children: ReactNode;
}

const Main = ({ children }: IMain) => {
  useEffect(() => {
    DetectingInactiveUsers.add();
    return () => {
      DetectingInactiveUsers.remove();
    };
  }, []);

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Main;
