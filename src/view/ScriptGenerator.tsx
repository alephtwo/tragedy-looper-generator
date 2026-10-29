import { m } from "@i18n/messages";

import { NumberPicker } from "@/components/NumberPicker";
import { Paper } from "@/components/Paper";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";

import { Message, State } from "../logic/State";
import * as Icons from "./Icons";
import { TragedySetPicker } from "./TragedySetPicker";

interface ScriptGeneratorProps {
  state: State;
  dispatch: React.Dispatch<Message>;
}
export function ScriptGenerator(props: Readonly<ScriptGeneratorProps>): React.JSX.Element {
  const { dispatch } = props;
  const { tragedySet, castSize, days, incidents, script } = props.state;

  if (script !== undefined && script.cast.length > castSize) {
    console.warn(m["warnings.castSizeOverridden"]({ needed: script.cast.length }));
  }

  return (
    <Paper>
      <div className="grid grid-cols-12 gap-x-8 gap-y-4">
        <div className="col-span-12 sm:col-span-6 md:col-span-3">
          <TragedySetPicker
            id="tragedy-set"
            selected={tragedySet}
            onChange={(ts) => dispatch({ action: "set-tragedy-set", value: ts })}
          />
        </div>
        <div className="col-span-12 sm:col-span-6 md:col-span-3">
          <Field className="h-full justify-between">
            <FieldLabel>
              <Icons.Cast fontSize="small" />
              {m["terms.castSize"]()}
            </FieldLabel>
            <NumberPicker
              id="cast-size"
              min={6}
              max={11}
              value={castSize}
              onChange={(n) => dispatch({ action: "set-cast-size", value: n })}
            />
          </Field>
        </div>
        <div className="col-span-12 sm:col-span-6 md:col-span-3">
          <Field className="h-full justify-between">
            <FieldLabel>
              <Icons.Days fontSize="small" />
              {m["terms.day"]({ count: 2 })}
            </FieldLabel>
            <NumberPicker
              id="days"
              min={4}
              max={8}
              value={days}
              onChange={(n) => dispatch({ action: "set-days", value: n })}
            />
          </Field>
        </div>
        <div className="col-span-12 sm:col-span-6 md:col-span-3">
          <Field className="h-full justify-between">
            <FieldLabel>
              <Icons.Incidents fontSize="small" />
              {m["terms.incident"]({ count: 2 })}
            </FieldLabel>
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
              value={incidents}
              onChange={(n) => dispatch({ action: "set-incidents", value: n })}
            />
          </Field>
        </div>
        <div className="col-span-12 flex justify-center">
          <Button onClick={() => dispatch({ action: "generate" })}>
            <Icons.Generate />
            {m["scaffolding.generateScript"]()}
          </Button>
        </div>
      </div>
    </Paper>
  );
}
