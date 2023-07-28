import * as React from "react";
import { useEffect, useReducer } from "react";
import { useTranslation } from "react-i18next";
import { ScriptGenerator } from "./ScriptGenerator";
import { reducer, initialState } from "../logic/State";
import * as ScriptCard from "./ScriptCard";
import { Cheatsheet } from "./Cheatsheet";

export function Application(): JSX.Element {
  const { t } = useTranslation();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { script } = state;

  useEffect(() => {
    document.title = t("scaffolding.title");
  }, []);

  function ScriptInfo(): React.JSX.Element {
    if (script === null) {
      return <></>;
    }
    return (
      <>
        <ScriptCard.Mastermind script={script} />
        <ScriptCard.Players script={script} />
        <Cheatsheet script={script} />
      </>
    );
  }

  return (
    <div className="container mx-auto">
      <div className="flex flex-col p-2 gap-2">
        <ScriptGenerator state={state} dispatch={dispatch} />
        <ScriptInfo />
      </div>
    </div>
  );
}
