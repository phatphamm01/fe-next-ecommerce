import AxiosService from "common/utils/axios";

const url = {
  getAll: "passbook/getpassbook",
  getDetail: (payload: any) => `passbook/check/${payload.id}`,
  withdrawMoney: (payload: any) =>
    `passbook/withdrawMoneyPassbook/${payload.passbookid}`,
};

const fetchPassbook = {
  async getAll() {
    const response = await AxiosService.get(url.getAll);
    return response;
  },
  async getDetail(payload: { id: string }) {
    const response = await AxiosService.get(url.getDetail(payload));
    return response;
  },
  async withdrawMoney(payload: { passbookid: string }) {
    const response = await AxiosService.post(url.withdrawMoney(payload));
    return response;
  },
};

export default fetchPassbook;
