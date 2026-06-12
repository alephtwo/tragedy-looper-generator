import * as React from "react";
import { useReducer, useEffect, useRef, useState } from "react";

import * as TragedySets from "../data/TragedySets";
import { reducer } from "../logic/State";
import { Script } from "../model/Script";
import { m } from "../paraglide/messages";
import { getLocale, setLocale } from "../paraglide/runtime";
import { Cheatsheet } from "./Cheatsheet";
import { PageTitle } from "./components/PageTitle";
import { TabButton } from "./components/TabButton";
import * as Icons from "./Icons";
import { Loading } from "./Loading";
import { LocalePicker } from "./LocalePicker";
import * as ScriptCard from "./ScriptCard";
import { ScriptGenerator } from "./ScriptGenerator";

type Tab = "mastermind" | "players" | "cheatsheet";

export function Application(): React.JSX.Element {
  const [state, dispatch] = useReducer(reducer, {
    tragedySet: TragedySets.firstSteps,
    castSize: 9,
    days: 7,
    incidents: 4,
    locale: getLocale(),
  });
  const [activeTab, setActiveTab] = useState<Tab>("mastermind");
  const scriptOutputRef = useRef<HTMLDivElement>(null);
  const prevScript = useRef<Script | undefined>(null);
  const { script } = state;

  useEffect(() => {
    document.title = m["scaffolding.title"]();
  });

  useEffect(() => {
    if (script !== null && prevScript.current !== script) {
      if (prevScript.current === null) {
        setActiveTab("mastermind");
      }
      scriptOutputRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    prevScript.current = script;
  }, [script]);

  return (
    <div className="min-h-screen bg-linear-to-tr from-[#0b1a27] to-[#1d3a5c] bg-fixed">
      <React.Suspense fallback={<Loading />}>
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <PageTitle />
              <LocalePicker
                value={state.locale}
                onChange={(locale) => {
                  Promise.resolve(setLocale(locale, { reload: false })).catch(console.error);
                  document.documentElement.setAttribute("lang", locale);
                  document.title = m["scaffolding.title"]();
                  dispatch({ action: "set-locale", value: locale });
                }}
              />
            </div>
            <ScriptGenerator state={state} dispatch={dispatch} />
            {script !== undefined && (
              <div ref={scriptOutputRef} className="flex flex-col gap-2">
                <div className="flex gap-1">
                  <TabButton
                    active={activeTab === "mastermind"}
                    onClick={() => setActiveTab("mastermind")}
                  >
                    <Icons.Mastermind size={18} />
                    {m["terms.mastermind"]()}
                  </TabButton>
                  <TabButton
                    active={activeTab === "players"}
                    onClick={() => setActiveTab("players")}
                  >
                    <Icons.Players size={18} />
                    {m["terms.player"]({ count: 2 })}
                  </TabButton>
                  <TabButton
                    active={activeTab === "cheatsheet"}
                    onClick={() => setActiveTab("cheatsheet")}
                  >
                    <Icons.Cheatsheet size={18} />
                    {m["scaffolding.cheatsheet"]()}
                  </TabButton>
                </div>
                <div>
                  {activeTab === "mastermind" && <ScriptCard.Mastermind script={script} />}
                  {activeTab === "players" && <ScriptCard.Players script={script} />}
                  {activeTab === "cheatsheet" && <Cheatsheet script={script} />}
                </div>
              </div>
            )}
          </div>
        </div>
      </React.Suspense>
    </div>
  );
}
