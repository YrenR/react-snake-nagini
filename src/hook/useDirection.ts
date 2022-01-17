import React, { useEffect, useState } from "react";
import { Direction } from "./direction.interface";
import { ISnake } from "../components/Board/board.interface";

export default function useDirection(snake: ISnake): [Direction, (dir: Direction) => void] {
  const [currentDirection, setCurrentDirection] = useState<Direction>("left");

  useEffect(() => {
    window.addEventListener("keydown", keyDownHandler);
    return () => {
      window.removeEventListener("keydown", keyDownHandler);
    };
  }, [snake]);

  const isRestrictedDirections = (key: string): boolean => {
    return (
      ((key === "ArrowLeft" || key === "left") && currentDirection === "right") ||
      ((key === "ArrowUp" || key === "up") && currentDirection === "down") ||
      ((key === "ArrowRight" || key === "right") && currentDirection === "left") ||
      ((key === "ArrowDown" || key === "down") && currentDirection === "up")
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

  const setDirection = (dir: Direction) => {
    if (!isRestrictedDirections(dir)) setCurrentDirection(dir);
  };

  return [currentDirection, setDirection];
}
