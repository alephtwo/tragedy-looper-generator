import * as React from "react";
import { useTranslation } from "react-i18next";
import { TragedySetPicker } from "./TragedySetPicker";
import { NumberPicker } from "./NumberPicker";
import { Message, State } from "../logic/State";

interface ScriptGeneratorProps {
  state: State;
  dispatch: React.Dispatch<Message>;
}
export function ScriptGenerator(props: ScriptGeneratorProps): React.JSX.Element {
  const { t } = useTranslation();
  const { dispatch } = props;
  const { tragedySet, castSize, days, incidents, script } = props.state;

  if (script !== null && script.cast.length > castSize) {
    console.warn(t("warnings.castSizeOverridden", { needed: script.cast.length }));
  }

  return (
    <div className="flex flex-col gap-2">
      <div>
        <label className="block text-sm font-bold mb-2" htmlFor="tragedy-set">
          {t("terms.tragedySet")}
        </label>
        <TragedySetPicker
          id="tragedy-set"
          selected={tragedySet}
          onChange={(ts) => dispatch({ action: "set-tragedy-set", value: ts })}
        />
      </div>
      <div>
        <label className="block text-sm font-bold mb-2" htmlFor="cast-size">
          {t("terms.castSize")}
        </label>
        <NumberPicker
          id="cast-size"
          min={6}
          max={11}
          selected={castSize}
          onChange={(n) => dispatch({ action: "set-cast-size", value: n })}
        />
      </div>
      <div>
        <label className="block text-sm font-bold mb-2" htmlFor="days">
          {t("terms.day_other")}
        </label>
        <NumberPicker
          id="days"
          min={4}
          max={8}
          selected={days}
          onChange={(n) => dispatch({ action: "set-days", value: n })}
        />
      </div>
      <div>
        <label className="block text-sm font-bold mb-2" htmlFor="incidents">
          {t("terms.incident_other")}
        </label>
        <NumberPicker
          id="incidents"
          min={0}
          // NB: The inclusion of cast size here isn't strictly accurate.
          // Serial Murder incidents can be perpetrated by the same cast member,
          // which allows you to have a much smaller cast with more incidents.
          // I don't want to fix that right now, so I'm just punting.
          // It doesn't really make sense to fix it anyway in my opinion.
          // If you're working on a script that goes against this, you should probably
          // just be writing it yourself anyway.
          max={Math.min(days, castSize, 7)}
          selected={incidents}
          onChange={(n) => dispatch({ action: "set-incidents", value: n })}
        />
      </div>
      <div>
        <button className="btn w-full" onClick={() => dispatch({ action: "generate" })}>
          {t("scaffolding.generateScript")}
        </button>
      </div>
    </div>
  );
}
