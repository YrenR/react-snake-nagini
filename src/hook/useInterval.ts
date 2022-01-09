import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export default function useInterval(callback: Function, delay: number): void {
  const { stateGame } = useSelector((c: RootState) => c.settingGameSlice);
  const refCallback = useRef<Function>();

  useEffect(() => {
    refCallback.current = callback;
  }, [callback, stateGame]);

  useEffect(() => {
    if (stateGame === "play") {
      const idInterval = setInterval(tick, delay);
      return () => clearInterval(idInterval);
    }
  }, [delay, stateGame]);

  const tick = () => refCallback.current && refCallback.current();
}
