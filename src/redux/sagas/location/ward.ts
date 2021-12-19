import { call, put } from "redux-saga/effects";
import { IDataResponse } from "@common/types/IAxiosResponse";
import fetchWard from "@services/location/ward";
import { getWardSuccess } from "@redux/slices/location";

export function* getWardSaga(action: any) {
  const { payload } = action;
  const response: IDataResponse = yield call(fetchWard.get, payload);

  const { data } = response;

  yield put(getWardSuccess(data.wards));
}
