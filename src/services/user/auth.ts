import AxiosService from "common/utils/axios";

const url = {
  signup: "signup",
  signin: "signin",
};

const fetchUser = {
  async signup(payload: any) {
    const response = await AxiosService.post(url.signup, payload);
    return response;
  },
  async signin(payload: any) {
    const response = await AxiosService.post(url.signin, payload);
    return response;
  },
};

export default fetchUser;
