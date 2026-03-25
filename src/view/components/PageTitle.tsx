import * as React from "react";
import { m } from "../../paraglide/messages";
import { QuarterRedText } from "./QuarterRedText";

export function PageTitle(): React.JSX.Element {
  const title = m["scaffolding.title"]();

  // Get fancy...
  const tokens = title.split(" ");

  return (
    <span className="text-white text-4xl text-shadow-2xl">
      {tokens.map((token, i) => {
        // All but the last token are default font color.
        if (i !== tokens.length - 1) {
          return <span key={`title-${i}`}>{token} </span>;
        }
        return <QuarterRedText key={`title-${i}`} token={token} />;
      })}
    </span>
  );
}
