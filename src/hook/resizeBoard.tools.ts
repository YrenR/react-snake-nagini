import { ICoordinate } from "../components/Board";
import { sizeBoardDesktop, sizeBoardMobile } from "../constants";

export const getSizeBoard = (): ICoordinate => {
  return window.innerWidth < 768 ? sizeBoardMobile : sizeBoardDesktop;
};
