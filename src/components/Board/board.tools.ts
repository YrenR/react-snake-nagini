import { ICoordinate, ISnake } from ".";
import { Direction } from "../../hook/direction.interface";
import { getRandomInt } from "../../utils/tools";

export const initFood: ICoordinate = { column: -1, row: -1 };

export const createBoardEmpty = ({ row, column }: ICoordinate): Array<Array<number>> => {
  return [...Array(row)].map((_) => Array(column).fill(0));
};

export const getRandomPositionEmpty = (snake: ISnake, { row, column }: ICoordinate): ICoordinate => {
  const isWin = isWinGame(snake, { row, column });
  let randomRow: number;
  let randomColumn: number;
  do {
    randomRow = getRandomInt(0, row);
    randomColumn = getRandomInt(0, column);
  } while (!isWin && snake.some((x) => compareToCoordinate(x, { row: randomRow, column: randomColumn })));

  return {
    row: randomRow,
    column: randomColumn,
  };
};

export const initializeSnake = ({ row, column }: ICoordinate): ISnake => {
  const midCol = Math.floor(column / 2);
  const midRow = Math.floor(row / 2);
  const head: ICoordinate = { row: midRow, column: midCol };
  const body: ICoordinate[] = [
    { row: midRow, column: midCol + 1 },
    { row: midRow, column: midCol + 2 },
  ];
  return [head, ...body];
};

export const nextDirection = (direction: Direction, row: number, column: number): ICoordinate => {
  switch (direction) {
    case "left":
      return { column: column - 1, row };
    case "up":
      return { column, row: row - 1 };
    case "right":
      return { column: column + 1, row };
    case "down":
      return { column, row: row + 1 };
    default:
      return { row, column };
  }
};

export const nextMoveSnake = (snake: ISnake, direction: Direction): ISnake => {
  const { column, row } = snake[0];
  snake.unshift(nextDirection(direction, row, column));
  snake.pop();
  return snake;
};

export const eatFood = (snake: ISnake, direction: Direction): ISnake => {
  const { column, row } = snake[0];
  snake.unshift({ ...nextDirection(direction, row, column), eating: true });
  return snake;
};

export const findSnakeByCoordinate = (snake: ISnake, { row, column }: ICoordinate): boolean => {
  return snake.some((body) => compareToCoordinate(body, { row, column }));
};

export const findCellEatingSnakeByCoordinate = (snake: ISnake, { row, column }: ICoordinate): boolean => {
  return snake.find((body) => compareToCoordinate(body, { row, column }))?.eating || false;
};

export const snakeCanEat = ([snakeHead]: ISnake, food: ICoordinate): boolean => {
  return compareToCoordinate(snakeHead, food);
};

export const isOutBoard = ([snakeHead]: ISnake, row: number, column: number): boolean => {
  return snakeHead.row < 0 || snakeHead.row >= row || snakeHead.column < 0 || snakeHead.column >= column;
};

export const isEatSnakeBody = ([snakeHead, ...snakeBody]: ISnake): boolean => {
  return snakeBody.some((body) => compareToCoordinate(snakeHead, body));
};

export const isAllowedMovement = (snake: ISnake, { row, column }: ICoordinate): boolean => {
  return !isOutBoard(snake, row, column) && !isEatSnakeBody(snake);
};

export const compareToCoordinate = (c1: ICoordinate, c2: ICoordinate): boolean => {
  return c1?.column === c2?.column && c1?.row === c2?.row;
};

export const isWinGame = (snake: ISnake, { row, column }: ICoordinate): boolean => {
  return snake.length >= row * column;
};

export const swipControl = (
  setDir: (dir: Direction) => void,
): {
  onSwipedLeft: () => void;
  onSwipedUp: () => void;
  onSwipedRight: () => void;
  onSwipedDown: () => void;
  preventDefaultTouchmoveEvent: boolean;
  trackMouse: boolean;
} => ({
  onSwipedLeft: () => setDir("left"),
  onSwipedUp: () => setDir("up"),
  onSwipedRight: () => setDir("right"),
  onSwipedDown: () => setDir("down"),
  preventDefaultTouchmoveEvent: true,
  trackMouse: true,
});
