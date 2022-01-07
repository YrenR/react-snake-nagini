import React, { useState } from "react";
import Board from "../components/Board/Board";
import "./App.css";
import { StateGame } from "./app.interface";
import { delayBoard, sizeBoard } from "../constants/index";

function App(): JSX.Element {
  const [stateGame, setStateGame] = useState<StateGame>("start");
  const [score, setScore] = useState<number>(0);

  const handlerStateGame = (state: StateGame, scoreGame: number) => {
    // el score quizas mandarlo por redux, asi se puede guardar los ultimos 3
    if (state === "win") {
      //
    } else if (state === "gameOver") {
      //
    }
    setStateGame(state);
    setScore(scoreGame);
  };

  const getMessage = (): string => {
    if (stateGame === "start") return "Start Game!";
    else return "Retry!";
  };

  /**
   * Todo:
   * state={stateGame} y setStateGame, habria que pasarlo de otra forma, Context o algo
   */
  return (
    <div className="main-container">
      <div className="section-game">
        <div className="panel">
          <div className="panel-header">
            <span className="panel-score">Best score: {score}</span>
            <button className="btn-start-game" onClick={() => handlerStateGame("play", 0)}>
              {getMessage()}
            </button>
          </div>
        </div>
        <Board
          sizeRow={sizeBoard.row}
          sizeColumn={sizeBoard.column}
          delay={delayBoard}
          state={stateGame}
          setStateGame={handlerStateGame}
        />
      </div>
    </div>
  );
}

export default App;
