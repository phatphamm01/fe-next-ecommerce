import { all, takeLatest } from "redux-saga/effects";
import { getDistrict, getProvice, getWard } from "redux/slices/location";
import { getDistrictSaga } from "./district";
import { getProviceSaga } from "./provice";
import { getWardSaga } from "./ward";

export default function* locationSaga() {
  yield all([
    takeLatest(getProvice.type, getProviceSaga),
    takeLatest(getDistrict.type, getDistrictSaga),
    takeLatest(getWard.type, getWardSaga),
  ]);
}
