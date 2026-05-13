import * as React from "react";
import { useReducer, useEffect, useRef, useState } from "react";
import { ScriptGenerator } from "./ScriptGenerator";
import { reducer } from "../logic/State";
import * as ScriptCard from "./ScriptCard";
import { Cheatsheet } from "./Cheatsheet";
import { LocalePicker } from "./LocalePicker";
import { m } from "../paraglide/messages";
import * as TragedySets from "../data/TragedySets";
import { getLocale, setLocale } from "../paraglide/runtime";
import { Loading } from "./Loading";
import * as Icons from "./Icons";
import { Script } from "../model/Script";
import { PageTitle } from "./components/PageTitle";
import { TabButton } from "./components/TabButton";

type Tab = "mastermind" | "players" | "cheatsheet";

export function Application(): React.JSX.Element {
  const [state, dispatch] = useReducer(reducer, {
    tragedySet: TragedySets.firstSteps,
    castSize: 9,
    days: 7,
    incidents: 4,
    script: null,
    locale: getLocale(),
  });
  const [activeTab, setActiveTab] = useState<Tab>("mastermind");
  const scriptOutputRef = useRef<HTMLDivElement>(null);
  const prevScript = useRef<Script | null>(null);
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
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
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
            {script !== null && (
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
