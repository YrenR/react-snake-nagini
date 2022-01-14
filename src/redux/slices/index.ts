import settingGameSlice from "./settingGameSlice";
import { AnyAction, CombinedState, combineReducers } from "@reduxjs/toolkit";

const reducers = combineReducers({ settingGameSlice });

export const rootReducer = (state: CombinedState<any>, action: AnyAction): CombinedState<any> => {
  return reducers(state, action);
};
