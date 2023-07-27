import { ParseKeys } from "i18next";
import { Identifiable } from "../../@types/Identifiable";

export interface Trigger extends Identifiable {
  id: string;
  description_i18n_key: ParseKeys;
  order: number;
}
