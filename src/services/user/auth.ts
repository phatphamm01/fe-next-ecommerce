import AxiosService from "common/utils/axios";

const url = {
  signup: "signup",
};

const fetchUser = {
  async signup(payload: any) {
    const response = await AxiosService.post(url.signup, payload);
    return response;
  },
};

export default fetchUser;
