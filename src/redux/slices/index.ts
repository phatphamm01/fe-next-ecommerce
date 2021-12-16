import { combineReducers } from "@reduxjs/toolkit";

import locationReducers from "./location";

const rootReducers = combineReducers({
  locationReducers,
});

export default rootReducers;
export type RootState = ReturnType<typeof rootReducers>;
