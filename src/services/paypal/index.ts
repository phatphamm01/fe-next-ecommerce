import AxiosService from "common/utils/axios";

const url = {
  convertVNDtoUSD: `paypal/getmoney`,
  recharge: `addmoney`,
};

const fetchPaypal = {
  async convertVNDtoUSD() {
    const response = await AxiosService.get(url.convertVNDtoUSD);
    return response;
  },
  async recharge(payload: { vnd: number }) {
    const response = await AxiosService.post(url.recharge, payload);
    return response;
  },
};

export default fetchPaypal;
