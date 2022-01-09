export type StateGame = "start" | "play" | "win" | "gameOver";

export interface ISettingGame {
  bestScore: number;
  stateGame: StateGame;
}
