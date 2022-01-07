import React, { useEffect } from "react";
import Board from "../components/Board/Board";
import { RootState } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { setStateGame } from "../redux/slices/settingGameSlice";
import "./tableBoard.css";

export default function TableBoard(): JSX.Element {
  const { bestScore, stateGame } = useSelector((c: RootState) => c.settingGameSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setStateGame("start"));
  }, []);

  const handlerStateGame = () => {
    dispatch(setStateGame("play"));
  };

  const getMessage = (): string => {
    if (stateGame === "start") return "Start Game!";
    else return "Retry!";
  };

  return (
    <div className="main-container">
      <div className="section-game">
        <div className="panel">
          <div className="panel-header">
            <span className="panel-score">🎉 Best score: {bestScore}</span>
            <button className="btn-start-game" onClick={() => handlerStateGame()}>
              {getMessage()}
            </button>
          </div>
        </div>
        <Board />
      </div>
    </div>
  );
}
