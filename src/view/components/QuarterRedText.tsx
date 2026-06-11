import * as React from "react";

interface QuarterRedTextProps {
  token: string;
}

export function QuarterRedText(props: QuarterRedTextProps) {
  const { token } = props;
  // The first quarter of characters in the last token are red.
  const quarter = Math.ceil(token.length / 4);
  const begin = token.slice(0, quarter);
  const end = token.slice(quarter);
  return (
    <>
      <span className="font-bold text-red-900 [-webkit-text-stroke:1px_white]">{begin}</span>
      <span>{end}</span>
    </>
  );
}
