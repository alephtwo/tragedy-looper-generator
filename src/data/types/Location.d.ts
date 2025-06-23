import { Identifiable } from "../../@types/Identifiable";
import { MessageFunction } from "@inlang/paraglide-js";

export interface Location extends Identifiable {
  id: string;
  name: MessageFunction;
}
