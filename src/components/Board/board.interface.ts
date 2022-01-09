export type ISnake = Array<Snake>;

interface Snake extends ICoordinate {
  eating?: boolean;
}
export interface ICoordinate {
  row: number;
  column: number;
}
