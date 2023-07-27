import { ParseKeys } from "i18next";
import { Identifiable } from "../../@types/Identifiable";

export interface Location extends Identifiable {
  id: string;
  name_i18n_key: ParseKeys;
}
