import React, { useEffect, useState } from "react";
import {
  initializeBoard,
  getRandomPositionEmpty,
  IBoard,
  ISnake,
  initializeSnake,
  moveSnake,
  findSnakeByRowColumn,
  snakeCanEat,
  eatFood,
  initFood,
  IFood,
  findFoodByRowColumn,
  isAllowedMovement,
} from ".";
import useInterval from "../../hook/useInterval";
import Cell from "../Cell/Cell";
import "./board.style.css";
import useDirection from "../../hook/useDirection";
import { StateGame } from "../../pages/app.interface";

export default function Board({
  sizeRow,
  sizeColumn,
  delay,
  state,
  setStateGame,
}: {
  sizeRow: number;
  sizeColumn: number;
  delay: number;
  state: StateGame;
  setStateGame: (state: StateGame, score: number) => void;
}): JSX.Element {
  const [board, setBoard] = useState<IBoard>([]);
  const [snake, setSnake] = useState<ISnake>([]);
  const [food, setFood] = useState<IFood>(initFood);
  const [score, setScore] = useState(0);
  const direction = useDirection("left", snake, state);

  useEffect(() => {
    if (state === "play") {
      const newSnake = initializeSnake(sizeRow, sizeColumn);
      const newBoard = initializeBoard(sizeRow, sizeColumn);
      const cellEmpty = getRandomPositionEmpty(newBoard, newSnake);

      setSnake(newSnake);
      setFood(cellEmpty);
      setBoard(newBoard);
    }
  }, [state]);

  useInterval(() => {
    if (state !== "play") return;

    let nextMove: ISnake;
    if (snakeCanEat(snake, food)) {
      nextMove = eatFood([...snake], direction);
      const cellEmpty = getRandomPositionEmpty(board, nextMove);
      setFood(cellEmpty);
    } else {
      nextMove = moveSnake([...snake], direction);
    }

    if (isAllowedMovement(nextMove, sizeRow, sizeColumn)) {
      setSnake(nextMove);
      setScore((prev) => prev + 1);
    } else {
      setStateGame("gameOver", score);
    }
  }, delay);

  const createBoard = () => {
    return board.map((rowCells, rowIndex) => (
      <div key={`row-${rowIndex}`} className="board-row">
        {rowCells.map((_, columnIndex) => {
          const isSnake = findSnakeByRowColumn(snake, rowIndex, columnIndex);
          const isFood = findFoodByRowColumn(food, rowIndex, columnIndex);
          const isHead = findFoodByRowColumn(snake[0], rowIndex, columnIndex);
          return <Cell key={`cell-${columnIndex}`} isFood={isFood} isSnake={isSnake} isHead={isHead} />;
        })}
      </div>
    ));
  };

  const sizeBoard = () => {
    const width = sizeColumn * 10 + sizeColumn + 2;
    const height = sizeRow * 10 + sizeRow + 2;
    return { width, height };
  };

  const styleGameOver = state === "gameOver" ? "board-table-game-over" : "";

  return (
    <>
      <div className={`board-table ${styleGameOver}`} style={sizeBoard()}>
        {createBoard()}
      </div>
      <span className="board-current-score">Current score: {score}</span>
    </>
  );
}
