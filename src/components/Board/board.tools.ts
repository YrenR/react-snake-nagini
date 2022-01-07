import { ICoordinate, IBoard, ISnake } from ".";
import { Direction } from "../../hook/direction.interface";
import { getRandomInt } from "../../utils/tools";
import { IFood } from "./board.interface";

export const initFood: IFood = { column: 0, row: 0 };

export const initializeBoard = (sizeRow: number, sizeColumn: number): IBoard => {
  return [...Array(sizeRow)].map((_) => Array(sizeColumn).fill(0)); // revisar, no me gusta
};

export const getRandomPositionEmpty = (board: IBoard, snake: ISnake): ICoordinate => {
  const row = board.length;
  const column = board[0].length;
  /**
   * TODO: revisar, el caso de que estuviera todo lleno
   * ¿recorrerlo entero y si al menos hay un hueco, seguir? throw?
   */
  let randomRow: number;
  let randomColumn: number;
  do {
    randomRow = getRandomInt(0, row);
    randomColumn = getRandomInt(0, column);
  } while (snake.some((x) => x.row === randomRow && x.column === randomColumn));

  return {
    row: randomRow,
    column: randomColumn,
  };
};

export const initializeSnake = (row: number, column: number): ISnake => {
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

export const moveSnake = (snake: ISnake, direction: Direction): ISnake => {
  const { column, row } = snake[0];
  snake.unshift(nextDirection(direction, row, column));
  snake.pop();
  return snake;
};

export const eatFood = (snake: ISnake, direction: Direction): ISnake => {
  const { column, row } = snake[0];
  snake.unshift(nextDirection(direction, row, column));
  return snake;
};

export const findSnakeByRowColumn = (snake: ISnake, cellRow: number, cellColumn: number): boolean => {
  return snake.some(({ row, column }) => row === cellRow && column === cellColumn);
};

export const findFoodByRowColumn = (food: IFood, cellRow: number, cellColumn: number): boolean => {
  return food.row === cellRow && food.column === cellColumn;
};

export const snakeCanEat = ([snakeHead]: ISnake, food: IFood): boolean => {
  return snakeHead.column === food.column && snakeHead.row === food.row;
};

export const isOutBoard = ([snakeHead]: ISnake, row: number, column: number): boolean => {
  return snakeHead.row < 0 || snakeHead.row >= row || snakeHead.column < 0 || snakeHead.column >= column;
};

export const isEatSnakeBody = ([snakeHead, ...snakeBody]: ISnake): boolean => {
  return snakeBody.some(({ row, column }) => snakeHead.row === row && snakeHead.column === column);
};

export const isAllowedMovement = (snake: ISnake, row: number, column: number): boolean => {
  return !isOutBoard(snake, row, column) && !isEatSnakeBody(snake);
};
