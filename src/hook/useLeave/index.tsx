import Router from "next/router";
import { useEffect } from "react";
import { useBeforeUnload } from "react-use";

const useLeave = (
  url: string = "/",
  isConfirm: boolean = true,
  message: string = "Are you sure want to leave this page?"
) => {
  useBeforeUnload(isConfirm, message);

  useEffect(() => {
    const handler = () => {
      if (isConfirm && !window.confirm(message)) {
        Router.events.emit("routeChangeError");
        window.history.pushState(url, "");
        throw "Abort route change. Please ignore this error.";
      }
    };

    Router.events.on("routeChangeStart", handler);

    return () => {
      Router.events.off("routeChangeStart", handler);
    };
  }, [isConfirm, message]);
};

export default useLeave;
