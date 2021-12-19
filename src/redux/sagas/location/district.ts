import { call, put } from "redux-saga/effects";
import { IDataResponse } from "@common/types/IAxiosResponse";
import fetchDistrict from "@services/location/district";
import { getDistrictSuccess } from "@redux/slices/location";

export function* getDistrictSaga(action: any) {
  const { payload } = action;
  const response: IDataResponse = yield call(fetchDistrict.get, payload);

  const { data } = response;

  yield put(getDistrictSuccess(data.districts));
}
