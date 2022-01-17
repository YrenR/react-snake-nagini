export {
  initFood,
  getRandomPositionEmpty,
  initializeSnake,
  nextMoveSnake,
  findSnakeByCoordinate,
  snakeCanEat,
  eatFood,
  isOutBoard,
  isEatSnakeBody,
  isAllowedMovement,
  compareToCoordinate,
  findCellEatingSnakeByCoordinate,
  createBoardEmpty,
  isWinGame,
  swipControl,
} from "./board.tools";
export type { ICoordinate, ISnake } from "./board.interface";
