import { m } from "@i18n/messages";
import { useReducer, useEffect, useRef, Suspense } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { PageTitle } from "../components/PageTitle";
import * as TragedySets from "../data/TragedySets";
import { reducer } from "../logic/State";
import { Script } from "../model/Script";
import { getLocale, setLocale } from "../paraglide/runtime";
import { Cheatsheet } from "./Cheatsheet";
import * as Icons from "./Icons";
import { Loading } from "./Loading";
import { LocalePicker } from "./LocalePicker";
import * as ScriptCard from "./ScriptCard";
import { ScriptGenerator } from "./ScriptGenerator";

export function Application(): React.JSX.Element {
  const [state, dispatch] = useReducer(reducer, {
    tragedySet: TragedySets.firstSteps,
    castSize: 9,
    days: 7,
    incidents: 4,
    locale: getLocale(),
  });
  const scriptOutputRef = useRef<HTMLDivElement>(null);
  const prevScript = useRef<Script | undefined>(null);
  const { script } = state;

  useEffect(() => {
    document.title = m["scaffolding.title"]();
  });

  useEffect(() => {
    if (script !== null && prevScript.current !== script) {
      scriptOutputRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }

    prevScript.current = script;
  }, [script]);

  return (
    // oxlint-disable-next-line tailwindcss/enforce-sort-order
    <div className="from-darkbg to-lightbg min-h-screen bg-linear-to-tr bg-fixed">
      <Suspense fallback={<Loading />}>
        <div className="mx-auto max-w-7xl p-4">
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
              <div ref={scriptOutputRef} className="flex flex-col">
                <Tabs defaultValue="mastermind">
                  <TabsList>
                    <TabsTrigger value="mastermind">
                      <Icons.Mastermind size={18} />
                      {m["terms.mastermind"]()}
                    </TabsTrigger>
                    <TabsTrigger value="player">
                      <Icons.Players size={18} />
                      {m["terms.player"]({ count: 2 })}
                    </TabsTrigger>
                    <TabsTrigger value="cheatsheet">
                      <Icons.Cheatsheet size={18} />
                      {m["scaffolding.cheatsheet"]()}
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="mastermind">
                    <ScriptCard.Mastermind script={script} />
                  </TabsContent>
                  <TabsContent value="player">
                    <ScriptCard.Players script={script} />
                  </TabsContent>
                  <TabsContent value="cheatsheet">
                    <Cheatsheet script={script} />
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </div>
        </div>
      </Suspense>
    </div>
  );
}
