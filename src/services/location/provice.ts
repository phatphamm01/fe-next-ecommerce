import AxiosService from "@common/utils/axios";

const url = {
  get: "location/province",
};

const fetchProvice = {
  async get() {
    const response = await AxiosService.get(url.get);
    return response;
  },
};

export default fetchProvice;
