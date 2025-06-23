import { Identifiable } from "../../@types/Identifiable";
import { MessageFunction } from "@inlang/paraglide-js";

export interface Trigger extends Identifiable {
  id: string;
  description: MessageFunction;
  order: number;
}
