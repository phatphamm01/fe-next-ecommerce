import AxiosService from "common/utils/axios";

const url = {
  get: (payload: any) => `location/wards/${payload}`,
};

const fetchWard = {
  async get(payload: any) {
    const response = await AxiosService.get(url.get(payload));
    return response;
  },
};

export default fetchWard;
