import { UUID } from "crypto";
import { Identifiable } from "../../@types/Identifiable";
import { TragedySet } from "./TragedySet";
import { ParseKeys } from "i18next";

export interface Expansion extends Identifiable {
  readonly id: UUID;
  readonly name_i18n_key: ParseKeys;
  readonly tragedySets: Array<TragedySet>;
}
