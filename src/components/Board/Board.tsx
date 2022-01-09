import React, { useEffect, useState } from "react";
import {
  getRandomPositionEmpty,
  ISnake,
  initializeSnake,
  nextMoveSnake,
  snakeCanEat,
  eatFood,
  initFood,
  isAllowedMovement,
  createBoardEmpty,
  isWinGame,
  ICoordinate,
} from ".";
import useInterval from "../../hook/useInterval";
import useDirection from "../../hook/useDirection";
import Cell from "../Cell/Cell";
import { useDispatch, useSelector } from "react-redux";
import { setScoreGame, setStateGame } from "../../redux/slices/settingGameSlice";
import { delayBoard, scorePoints, sizeBoard } from "../../constants";
import { RootState } from "../../redux/store";
import { isEmpty } from "../../utils/tools";
import "./board.style.css";

export default function Board(): JSX.Element {
  const { stateGame } = useSelector((c: RootState) => c.settingGameSlice);
  const [snake, setSnake] = useState<ISnake>([]);
  const [food, setFood] = useState<ICoordinate>(initFood);
  const [score, setScore] = useState(0);
  const [direction, setDirection] = useDirection(snake);
  const dispatch = useDispatch();

  useEffect(() => {
    initializeGame();
  }, [stateGame]);

  useInterval(() => {
    if (stateGame !== "play" || isEmpty(snake)) return;

    if (isWinGame(snake, sizeBoard)) {
      dispatch(setStateGame("win"));
      dispatch(setScoreGame(score));
    } else {
      const nextMove = snakeCanEat(snake, food) ? eatingSnake() : nextMoveSnake([...snake], direction);
      movingSnake(nextMove);
    }
  }, delayBoard);

  const initializeGame = (): void => {
    if (stateGame !== "play") return;

    const newSnake = initializeSnake(sizeBoard);
    const cellEmpty = getRandomPositionEmpty(newSnake, sizeBoard);

    setSnake(newSnake);
    setFood(cellEmpty);
    setDirection("left");
    setScore(0);
  };

  const movingSnake = (nextMove: ISnake): void => {
    if (isAllowedMovement(nextMove, sizeBoard)) {
      setSnake(nextMove);
    } else {
      dispatch(setStateGame("gameOver"));
      dispatch(setScoreGame(score));
    }
  };

  const eatingSnake = (): ISnake => {
    const nextMove = eatFood([...snake], direction);
    const cellEmpty = getRandomPositionEmpty(nextMove, sizeBoard);
    setFood(cellEmpty);
    setScore((prev) => prev + scorePoints.eatFood);
    return nextMove;
  };

  const createBoard = (): JSX.Element[] => {
    const board = createBoardEmpty(sizeBoard);
    return board.map((rowCells, row) => (
      <div key={`row-${row}`} className="board-row">
        {rowCells.map((_, column) => (
          <Cell key={`cell-${column}`} snake={snake} food={food} coordinate={{ row, column }} />
        ))}
      </div>
    ));
  };

  const styleGameOver = stateGame === "gameOver" ? "board-table-game-over" : "";

  return (
    <>
      <div className={`board-table ${styleGameOver}`}>{createBoard()}</div>
      <span className="board-current-score">Current score: {score}</span>
    </>
  );
}
