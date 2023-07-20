import { ParseKeys } from "i18next";

export interface Trigger {
  id: string;
  description_i18n_key: ParseKeys;
  order: number;
}
