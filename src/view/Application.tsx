import * as React from "react";
import { useEffect, useState, useReducer } from "react";
import { useTranslation } from "react-i18next";
import { ScriptGenerator } from "./ScriptGenerator";
import { reducer, initialState } from "../logic/State";
import * as ScriptCard from "./ScriptCard";
import { Cheatsheet } from "./Cheatsheet";

export function Application(): JSX.Element {
  const { t, i18n } = useTranslation();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [lang, setLang] = useState("en");
  const { script } = state;

  useEffect(() => {
    document.title = t("scaffolding.title");
  }, []);

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);

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
        <div className="flex justify-end">
          <select className="form-select rounded shadow" value={lang} onChange={(e) => setLang(e.target.value)}>
            <option value="en">🇬🇧 EN</option>
          </select>
        </div>
        <ScriptGenerator state={state} dispatch={dispatch} />
        <ScriptInfo />
      </div>
    </div>
  );
}
