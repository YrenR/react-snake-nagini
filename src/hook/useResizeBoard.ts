import { useEffect, useState } from "react";
import { ICoordinate } from "../components/Board/board.interface";
import { getSizeBoard } from "./resizeBoard.tools";

export default function useResizeBoard(): ICoordinate {
  const [sizeTableBaord, setSizeTableBoard] = useState<ICoordinate>(getSizeBoard());

  useEffect(() => {
    window.addEventListener("resize", resizeBoard);
    return () => window.removeEventListener("resize", resizeBoard);
  }, []);

  const resizeBoard = () => {
    setSizeTableBoard(getSizeBoard());
  };

  return sizeTableBaord;
}
