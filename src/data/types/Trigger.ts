import { MessageFunction } from "@inlang/paraglide-js";

export interface Trigger {
  id: string;
  description: MessageFunction;
  order: number;
}
