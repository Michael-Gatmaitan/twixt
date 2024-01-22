"use client";
import { Dispatch, SetStateAction, useEffect } from "react";

export const useLabelWarning = (
  initState: boolean,
  setInitState: Dispatch<SetStateAction<boolean>>
) => {
  useEffect(() => {
    let warningTimeout: NodeJS.Timeout;

    if (initState) warningTimeout = setTimeout(() => setInitState(false), 2000);

    return () => {
      if (initState) clearTimeout(warningTimeout);
    };
  }, [initState, setInitState]);
};