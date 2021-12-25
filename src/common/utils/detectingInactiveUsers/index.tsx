import { Modal } from "antd";
import router from "next/router";

let INACTIVE_USER_TIME_THRESHOLD = 1 * 1000 * 60;

const DetectingInactiveUsers = (() => {
  let userActivityTimeout: any = null;

  let resetUserActivityTimeout = () => {
    console.log(123);

    clearTimeout(userActivityTimeout);

    userActivityTimeout = setTimeout(() => {
      inactiveUserAction();
    }, INACTIVE_USER_TIME_THRESHOLD);
  };

  let inactiveUserAction = () => {
    localStorage.clear();
    router.push("/login");
    Modal.info({
      width: "500px",
      title: "Thông báo",

      content: "Tài khoản của bạn đã hết thời hạn vui lòng đăng nhập lại",
      onOk() {},
    });
  };

  let add = () => {
    let isUser = localStorage.getItem("token");
    console.log(isUser);

    if (isUser) {
      window.addEventListener("mousemove", resetUserActivityTimeout);
      window.addEventListener("scroll", resetUserActivityTimeout);
      window.addEventListener("keydown", resetUserActivityTimeout);
      window.addEventListener("resize", resetUserActivityTimeout);
    }
  };

  let remove = () => {
    window.removeEventListener("mousemove", resetUserActivityTimeout);
    window.removeEventListener("scroll", resetUserActivityTimeout);
    window.removeEventListener("keydown", resetUserActivityTimeout);
    window.removeEventListener("resize", resetUserActivityTimeout);
  };

  return {
    add: add,
    remove: remove,
  };
})();

export default DetectingInactiveUsers;
