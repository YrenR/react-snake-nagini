import settingGameSlice from "./settingGameSlice";
import { combineReducers } from "@reduxjs/toolkit";

const reducers = combineReducers({ settingGameSlice });

export const rootReducer = (state: any, action: any) => {
  return reducers(state, action);
};
