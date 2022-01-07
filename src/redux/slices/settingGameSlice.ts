import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISettingGame, StateGame } from "./settingGame.interface";

const initialState: ISettingGame = {
  bestScore: 0,
  stateGame: "start",
};

export const settingGameSlice = createSlice({
  name: "settingGame",
  initialState,
  reducers: {
    setScoreGame: (state, action: PayloadAction<number>) => {
      if (state.bestScore < action.payload) return { ...state, bestScore: action.payload };
      else return state;
    },
    setStateGame: (state, action: PayloadAction<StateGame>) => {
      return { ...state, stateGame: action.payload };
    },
  },
});

export const { setScoreGame, setStateGame } = settingGameSlice.actions;

export default settingGameSlice.reducer;
