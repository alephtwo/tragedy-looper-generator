import { TragedySets } from "../data/TragedySets";
import { TragedySet } from "../data/types/TragedySet";
import { Script } from "../model/Script";
import { produce } from "immer";
import { generate } from "./generator/generate";

export interface State {
  tragedySet: TragedySet;
  castSize: number;
  days: number;
  incidents: number;
  script: MaybeScript;
}

export type Message =
  | { action: "set-tragedy-set"; value: TragedySet }
  | { action: "set-cast-size"; value: number }
  | { action: "set-days"; value: number }
  | { action: "set-incidents"; value: number }
  | { action: "generate" };

export function reducer(state: State, message: Message): State {
  switch (message.action) {
    case "set-tragedy-set":
      return produce(state, (next) => {
        next.tragedySet = message.value;
      });
    case "set-cast-size":
      return produce(state, (next) => {
        next.castSize = message.value;
        // Need to drop incidents if we don't have enough cast.
        next.incidents = Math.min(message.value, state.incidents);
      });
    case "set-days":
      return produce(state, (next) => {
        next.days = message.value;
        // Need to drop incidents if we don't have enough days.
        next.incidents = Math.min(message.value, state.incidents);
      });
    case "set-incidents":
      return produce(state, (next) => {
        next.incidents = message.value;
      });
    case "generate":
      return produce(state, (next) => {
        next.script = generate({
          tragedySet: state.tragedySet,
          incidents: state.incidents,
          days: state.days,
          castSize: state.castSize,
        });
      });
    default:
      return state;
  }
}

export const initialState: State = {
  tragedySet: TragedySets.firstSteps,
  castSize: 9,
  days: 7,
  incidents: 4,
  script: null,
};

export type MaybeScript = Script | null;
