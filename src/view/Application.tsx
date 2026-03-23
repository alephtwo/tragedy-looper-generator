import * as React from "react";
import { useReducer, useEffect } from "react";
import { ScriptGenerator } from "./ScriptGenerator";
import { reducer } from "../logic/State";
import * as ScriptCard from "./ScriptCard";
import { Cheatsheet } from "./Cheatsheet";
import { LocalePicker } from "./LocalePicker";
import { m } from "../paraglide/messages";
import * as TragedySets from "../data/TragedySets";
import { getLocale, setLocale } from "../paraglide/runtime";
import { Loading } from "./Loading";

export function Application(): React.JSX.Element {
  const [state, dispatch] = useReducer(reducer, {
    tragedySet: TragedySets.firstSteps,
    castSize: 9,
    days: 7,
    incidents: 4,
    script: null,
    locale: getLocale(),
  });
  const { script } = state;

  useEffect(() => {
    document.title = m["scaffolding.title"]();
  });

  function ScriptInfo(): React.JSX.Element {
    if (script === null) {
      return <></>;
    }
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <ScriptCard.Mastermind script={script} />
        <ScriptCard.Players script={script} />
        <div className="md:col-span-2">
          <Cheatsheet script={script} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-tr from-[#0b1a27] to-[#1d3a5c] bg-fixed">
      <React.Suspense fallback={<Loading />}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
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
            <ScriptInfo />
          </div>
        </div>
      </React.Suspense>
    </div>
  );
}

function PageTitle(): React.JSX.Element {
  const title = m["scaffolding.title"]();

  // Get fancy...
  const tokens = title.split(" ");

  return (
    <span className="text-white text-4xl text-shadow-2xl">
      {tokens.map((token, i) => {
        // All but the last token are default font color.
        if (i !== tokens.length - 1) {
          return <span key={`title-${i}`}>{token} </span>;
        }
        return <QuarterRedText key={`title-${i}`} token={token} />;
      })}
    </span>
  );
}

interface QuarterRedTextProps {
  token: string;
}
function QuarterRedText(props: QuarterRedTextProps) {
  const { token } = props;
  // The first quarter of characters in the last token are red.
  const quarter = Math.ceil(token.length / 4);
  const begin = token.slice(0, quarter);
  const end = token.slice(quarter);
  return (
    <>
      <span className="text-red-900 font-bold [-webkit-text-stroke:1px_white]">{begin}</span>
      <span>{end}</span>
    </>
  );
}
