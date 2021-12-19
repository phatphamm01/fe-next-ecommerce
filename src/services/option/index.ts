import AxiosService from "@common/utils/axios";

const url = {
  getCurrentOption: "option/getcurrentoption",
};

const fetchOptions = {
  async getCurrentOption() {
    const response = await AxiosService.get(url.getCurrentOption);
    return response;
  },
};

export default fetchOptions;
