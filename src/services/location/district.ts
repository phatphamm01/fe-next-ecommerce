import AxiosService from "common/utils/axios";

const url = {
  get: (payload: any) => `location/district/${payload}`,
};

const fetchDistrict = {
  async get(payload: any) {
    const response = await AxiosService.get(url.get(payload));
    return response;
  },
};

export default fetchDistrict;
