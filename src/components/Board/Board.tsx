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
import { useDispatch, useSelector } from "react-redux";
import { setScoreGame, setStateGame } from "../../redux/slices/settingGameSlice";
import { delayBoard, scorePoints, sizeBoard } from "../../constants";
import { RootState } from "../../redux/store";

export default function Board(): JSX.Element {
  const { row, column } = sizeBoard;
  const { stateGame } = useSelector((c: RootState) => c.settingGameSlice);
  const [board, setBoard] = useState<IBoard>([]);
  const [snake, setSnake] = useState<ISnake>([]);
  const [food, setFood] = useState<IFood>(initFood);
  const [score, setScore] = useState(0);
  const direction = useDirection(snake);
  const dispatch = useDispatch();

  useEffect(() => {
    if (stateGame === "play") initializeGame();
  }, [stateGame]);

  useInterval(() => {
    if (stateGame !== "play") return;

    let nextMove: ISnake;
    if (snakeCanEat(snake, food)) {
      nextMove = eatFood([...snake], direction);
      const cellEmpty = getRandomPositionEmpty(board, nextMove);
      setFood(cellEmpty);
      setScore((prev) => prev + scorePoints.eatFood);
    } else {
      nextMove = moveSnake([...snake], direction);
      setScore((prev) => prev + scorePoints.move);
    }

    if (isAllowedMovement(nextMove, row, column)) {
      setSnake(nextMove);
    } else {
      dispatch(setStateGame("gameOver"));
      dispatch(setScoreGame(score));
    }
  }, delayBoard);

  const initializeGame = () => {
    const newSnake = initializeSnake(row, column);
    const newBoard = initializeBoard(row, column);
    const cellEmpty = getRandomPositionEmpty(newBoard, newSnake);

    setSnake(newSnake);
    setFood(cellEmpty);
    setBoard(newBoard);
    setScore(0);
  };

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

  const styleSizeBoard = () => {
    const width = column * 10 + column + 2;
    const height = row * 10 + row + 2;
    return { width, height };
  };

  const styleGameOver = stateGame === "gameOver" ? "board-table-game-over" : "";

  return (
    <>
      <div className={`board-table ${styleGameOver}`} style={styleSizeBoard()}>
        {createBoard()}
      </div>
      <span className="board-current-score">Current score: {score}</span>
    </>
  );
}
