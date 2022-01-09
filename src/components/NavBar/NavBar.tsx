import React from "react";
import { useSelector } from "react-redux";
import "./navBar.style.css";
import { RootState } from "../../redux/store";

export default function NavBar(): JSX.Element {
  const { bestScore } = useSelector((c: RootState) => c.settingGameSlice);
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <img className="navbar-brand-img" src="./react-snake-nagini-192.png" alt="snake nagini logo" />
          <p className="navbar-title">Snake Nagini</p>
        </div>
        <div className="score-container">
          <p className="score">Best score: {bestScore}</p>
        </div>
      </div>
    </nav>
  );
}
