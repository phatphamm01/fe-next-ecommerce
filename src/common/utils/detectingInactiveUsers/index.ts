let INACTIVE_USER_TIME_THRESHOLD = 2 * 1000;

const DetectingInactiveUsers = (function () {
  let userActivityTimeout: any = null;

  let resetUserActivityTimeout = () => {
    clearTimeout(userActivityTimeout);

    userActivityTimeout = setTimeout(() => {
      inactiveUserAction();
    }, INACTIVE_USER_TIME_THRESHOLD);
  };

  let inactiveUserAction = () => {
    console.log("LOGOUT");
  };

  let add = () => {
    let isUser = true;
    console.log(123);
    if (isUser) {
      console.log(123);

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
