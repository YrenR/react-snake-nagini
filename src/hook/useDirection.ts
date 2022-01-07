import React, { useEffect, useState } from "react";
import { Direction } from "./direction.interface";
import { ISnake } from "../components/Board/board.interface";
import { StateGame } from "../pages/app.interface";

export default function useDirection(direction: Direction, snake: ISnake, state: StateGame): Direction {
  const [currentDirection, setCurrentDirection] = useState<Direction>(direction);

  useEffect(() => {
    setCurrentDirection("left");
  }, [state]);

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
