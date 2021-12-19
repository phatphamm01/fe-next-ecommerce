import { call, put } from "redux-saga/effects";
import { IDataResponse } from "@common/types/IAxiosResponse";
import fetchProvice from "@services/location/provice";
import { getProviceSuccess } from "@redux/slices/location";

export function* getProviceSaga() {
  const response: IDataResponse = yield call(fetchProvice.get);

  const { data } = response;

  yield put(getProviceSuccess(data));
}
