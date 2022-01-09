import React, { useEffect } from "react";
import Board from "../components/Board/Board";
import { RootState } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { setStateGame } from "../redux/slices/settingGameSlice";
import "./tableBoard.css";

export default function TableBoard(): JSX.Element {
  const { stateGame } = useSelector((c: RootState) => c.settingGameSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setStateGame("start"));
  }, []);

  const handlerStateGame = () => {
    dispatch(setStateGame("play"));
  };

  const getMessage = (): string => {
    if (stateGame === "start") return "Start Game!";
    else if (stateGame === "win") return "YOU WIN!";
    else return "Retry!";
  };

  return (
    <div className="main-container">
      <div className="section-game">
        <div className="panel">
          <div className="panel-header">
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
