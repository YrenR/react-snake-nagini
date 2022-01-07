import React, { useState } from "react";
import Board from "../components/Board/Board";
import "./App.css";
import { StateGame } from "./app.interface";
import { delayBoard, sizeBoard } from "../constants/index";

const Panel = ({
  state,
  setStateGame,
  score,
}: {
  state: StateGame;
  setStateGame: (state: StateGame, score: number) => void;
  score: number;
}): JSX.Element => {
  const getMessage = (): string => {
    if (state === "start") return "Start Game!";
    else return "Retry!";
  };

  return (
    <div className="panel">
      <div className="panel-header">
        <span className="panel-score">Best score: {score}</span>
        <button className="btn-start-game" onClick={() => setStateGame("play", 0)}>
          {getMessage()}
        </button>
      </div>
    </div>
  );
};

/**
 * Todo:
 * crear fichero de constantes para rowm column, delay
 * @returns
 */
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

  /**
   * Todo:
   * state={stateGame} y setStateGame, habria que pasarlo de otra forma, Context o algo
   */
  return (
    <div className="main-container">
      <div className="section-game">
        {JSON.stringify(stateGame)}
        <Panel state={stateGame} setStateGame={handlerStateGame} score={score} />
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
