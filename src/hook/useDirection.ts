import React, { useEffect, useState } from "react";
import { Direction } from "./direction.interface";
import { ISnake } from "../components/Board/board.interface";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";

export default function useDirection(snake: ISnake): Direction {
  const { stateGame } = useSelector((c: RootState) => c.settingGameSlice);
  const [currentDirection, setCurrentDirection] = useState<Direction>("left");

  useEffect(() => {
    setCurrentDirection("left");
  }, [stateGame]);

  useEffect(() => {
    window.addEventListener("keydown", keyDownHandler);
    return () => {
      window.removeEventListener("keydown", keyDownHandler);
    };
  }, [snake]);

  const isRestrictedDirections = (key: string): boolean => {
    return (
      (key === "ArrowLeft" && currentDirection === "right") ||
      (key === "ArrowUp" && currentDirection === "down") ||
      (key === "ArrowRight" && currentDirection === "left") ||
      (key === "ArrowDown" && currentDirection === "up")
    );
  };

  const keyDownHandler = ({ key }: KeyboardEvent): void => {
    if (isRestrictedDirections(key)) return;

    switch (key) {
      case "ArrowLeft":
        setCurrentDirection("left");
        break;
      case "ArrowUp":
        setCurrentDirection("up");
        break;
      case "ArrowRight":
        setCurrentDirection("right");
        break;
      case "ArrowDown":
        setCurrentDirection("down");
        break;

      default:
        break;
    }
  };
  return currentDirection;
}
