import AxiosService from "common/utils/axios";

const url = {
  signup: "signup",
  signin: "signin",
  verify: "check-verification-code",
  get: "getuserbytoken",
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
  async verify(payload: any) {
    const response = await AxiosService.post(url.verify, payload);
    return response;
  },
  async get() {
    const response = await AxiosService.get(url.get);
    return response;
  },
};

export default fetchUser;
