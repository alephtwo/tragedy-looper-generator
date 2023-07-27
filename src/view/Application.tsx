import * as React from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { TragedySetPicker } from "./TragedySetPicker";
import { TragedySets } from "../data/TragedySets";
import { NumberPicker } from "./NumberPicker";
import { Script } from "../model/Script";
import { generate } from "../logic/generator/generate";

export function Application(): JSX.Element {
  const { t, i18n } = useTranslation();

  const [tragedySet, setTragedySet] = useState(TragedySets.firstSteps);
  const [castSize, setCastSize] = useState(9);
  const [days, setDays] = useState(7);
  const [incidents, setIncidents] = useState(4);
  const [script, setScript] = useState<Script | null>(null);

  useEffect(() => {
    document.title = t("scaffolding.title");
  }, []);

  return (
    <div className="container mx-auto p-2">
      <div className="grid grid-cols-6 gap-2">
        <div className="flex flex-col gap-2">
          <div>
            <label className="block text-sm font-bold mb-2" htmlFor="tragedy-set">
              {t("terms.tragedySet")}
            </label>
            <TragedySetPicker id="tragedy-set" selected={tragedySet} onChange={setTragedySet} />
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
              onChange={(n) => {
                setCastSize(n);
                // Need to drop incidents if we don't have enough cast.
                setIncidents(Math.min(n, incidents));
              }}
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
              onChange={(n) => {
                setDays(n);
                // Need to drop incidents if we don't have enough days.
                setIncidents(Math.min(n, incidents));
              }}
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
              onChange={setIncidents}
            />
          </div>
          <div>
            <button
              className="btn w-full"
              onClick={() => {
                const script = generate({ castSize, days, incidents, tragedySet }, i18n);
                setScript(script);
              }}
            >
              {t("scaffolding.generateScript")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
