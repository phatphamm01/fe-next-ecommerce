import axios from "axios";

axios.defaults.baseURL = "https://server-one-kappa.vercel.app";

const url = {
  login: "login",
  getUser: "getuserbytoken",
  addMoney: "addmoney",
};

const fetchAtm = {
  async login(payload: { email: string; password: string }) {
    try {
      const response = await axios.post(url.login, payload);
      if (response.data && response.data.success === "false") {
        throw Error(response.data.message);
      }
      return response;
    } catch (error: any) {
      if (error.response.data) {
        throw Error(error.response.data.message);
      }
      throw Error(error.message);
    }
  },
  async addmoney(accessToken: string, payload: { vnd: number }) {
    try {
      const response = await axios({
        method: "post",
        url: url.addMoney,
        data: payload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.data && response.data.success === "false") {
        throw Error(response.data.message);
      }
      return response;
    } catch (error: any) {
      if (error.response.data) {
        throw Error(error.response.data.message);
      }
      throw Error(error.message);
    }
  },
  async getUser(payload: { accessToken: string }) {
    try {
      const response = await axios({
        method: "get",
        url: url.getUser,
        headers: {
          Authorization: `Bearer ${payload.accessToken}`,
        },
      });

      if (response.data && response.data.success === "false") {
        throw Error(response.data.message);
      }
      return response;
    } catch (error: any) {
      if (error.response.data) {
        throw Error(error.response.data.message);
      }
      throw Error(error.message);
    }
  },
};

export default fetchAtm;
