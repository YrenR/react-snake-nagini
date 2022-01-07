import React from "react";
import { colorFood } from "../../constants";
import { getRandomInt } from "../../utils/tools";
import "./cell.style.css";

export default function Cell({
  isFood,
  isSnake,
  isHead,
}: {
  isFood: boolean;
  isSnake: boolean;
  isHead: boolean;
}): JSX.Element {
  const styleSnake = isSnake ? "board-cell--snake" : "";
  const styleFood = isFood ? "board-cell--food" : "";
  const styleHead = isHead ? "board-cell--head" : "";

  const getRandomFoodColor = () => {
    const random = getRandomInt(0, colorFood.length);
    if (isFood) return colorFood[random];
  };

  return (
    <div
      className={`board-cell ${styleSnake} ${styleFood} ${styleHead}`}
      style={{ backgroundColor: getRandomFoodColor() }}
    />
  );
}
