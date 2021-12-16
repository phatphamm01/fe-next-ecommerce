import { all } from "@redux-saga/core/effects";

import locationSaga from "./location";

export default function* rootSaga() {
  yield all([locationSaga()]);
}
