import AxiosService from "@common/utils/axios";

const url = {
  add: "cart",
  checkout: "cart/checkout",
  update: (payload: any) => `cart/${payload.quantity}`,
};

const fetchCart = {
  async add(payload: { option: number; deposits: number }) {
    const response = await AxiosService.post(url.add, payload);
    return response;
  },
  async checkout() {
    const response = await AxiosService.post(url.checkout);
    return response;
  },
  async update(payload: { quantity: number }) {
    const response = await AxiosService.patch(url.update(payload));
    return response;
  },
};

export default fetchCart;
