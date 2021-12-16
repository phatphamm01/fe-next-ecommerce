import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@redux-ts-starter-kit/slice";
import {
  IDistrict,
  IProvice,
  ILocationPayload,
  IWard,
} from "redux/types/location";

interface ILocationSlice {
  provice: IProvice;
  district: IDistrict;
  ward: IWard;
}

const initialState: ILocationSlice = {
  provice: [],
  district: [],
  ward: [],
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  cases: {
    getProvice() {},
    getProviceSuccess(state, action: any) {
      state.provice = action.payload;
      state.district = [];
      state.ward = [];
    },
    getDistrict(state, action: PayloadAction<ILocationPayload>) {},
    getDistrictSuccess(state, action: any) {
      state.district = action.payload;
      state.ward = [];
    },
    getWard(state, action: PayloadAction<ILocationPayload>) {},
    getWardSuccess(state, action: any) {
      state.ward = action.payload;
    },
  },
});

export const {
  getProvice,
  getProviceSuccess,
  getDistrict,
  getDistrictSuccess,
  getWard,
  getWardSuccess,
} = locationSlice.actions;

const locationReducers = locationSlice.reducer;
export default locationReducers;
