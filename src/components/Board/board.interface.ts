export type IBoard = Array<Array<number>>;
export type ISnake = Array<ICoordinate>;
export type IFood = ICoordinate;

export interface ICoordinate {
  row: number;
  column: number;
}
