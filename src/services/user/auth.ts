import AxiosService from "@common/utils/axios";

const url = {
  signup: "signup",
  signin: "signin",
  forget: "forgot-password",
  verify: "check-verification-code",
  resetPassword: "reset-password",
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
  async forget(payload: { email: string }) {
    const response = await AxiosService.post(url.forget, payload);
    return response;
  },
  async resetPassword(payload: {
    code?: string;
    password?: string;
    passwordConfirm?: string;
  }) {
    const response = await AxiosService.put(url.resetPassword, payload);
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
