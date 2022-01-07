import { useEffect, useRef } from "react";

export default function useInterval(callback: Function, delay: number): void {
  const refCallback = useRef<Function>();

  useEffect(() => {
    refCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const idInterval = setInterval(tick, delay);
    return () => clearInterval(idInterval);
  }, [delay]);

  const tick = () => refCallback.current && refCallback.current();
}
