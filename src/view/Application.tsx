import * as React from "react";
import { useEffect, useReducer } from "react";
import { useTranslation } from "react-i18next";
import { ScriptGenerator } from "./ScriptGenerator";
import { reducer, initialState, State } from "../logic/State";

export function Application(): JSX.Element {
  const { t } = useTranslation();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    document.title = t("scaffolding.title");
  }, []);

  return (
    <div className="container mx-auto p-2">
      <div className="grid grid-cols-6 gap-2">
        <ScriptGenerator state={state} dispatch={dispatch} />
      </div>
    </div>
  );
}
