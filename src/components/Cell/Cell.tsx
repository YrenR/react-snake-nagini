import React from "react";
import "./cell.style.css";
import { ISnake, ICoordinate } from "../Board/board.interface";
import { compareToCoordinate, findCellEatingSnakeByCoordinate, findSnakeByCoordinate } from "../Board";

function Cell({ snake, food, coordinate }: { snake: ISnake; food: ICoordinate; coordinate: ICoordinate }): JSX.Element {
  const styleSnake = findSnakeByCoordinate(snake, coordinate) ? "board-cell--snake" : "";
  const styleFood = compareToCoordinate(food, coordinate) ? "board-cell--food" : "";
  const styleHead = compareToCoordinate(snake[0], coordinate) ? "board-cell--head" : "";
  const styleEating = findCellEatingSnakeByCoordinate(snake, coordinate) ? "board-cell--eating" : "";
  return <div className={`board-cell ${styleSnake} ${styleFood} ${styleEating} ${styleHead}`} />;
}

export default React.memo(Cell);
