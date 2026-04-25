import { Character } from "../../data/types/Character";
import { Incident } from "./Incident";
import { Plot } from "./Plot";
import { MessageFunction } from "@inlang/paraglide-js";

export interface TragedySet {
  readonly id: string;
  readonly name: MessageFunction;
  readonly order: number;
  readonly characters: Array<Character>;
  readonly mainPlots: Array<Plot>;
  readonly maxSubplots: 1 | 2;
  readonly subplots: Array<Plot>;
  readonly incidents: Array<Incident>;
}
