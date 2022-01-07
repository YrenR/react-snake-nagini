export {
  initFood,
  initializeBoard,
  getRandomPositionEmpty,
  initializeSnake,
  moveSnake,
  findSnakeByRowColumn,
  snakeCanEat,
  eatFood,
  findFoodByRowColumn,
  isOutBoard,
  isEatSnakeBody,
  isAllowedMovement,
} from "./board.tools";
export type { ICoordinate, IBoard, ISnake, IFood } from "./board.interface";
