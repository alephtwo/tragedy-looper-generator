import * as React from "react";

export function Paper(props: React.PropsWithChildren) {
  return <div className="w-full p-4 bg-slate-100/75 border border-slate-500 rounded-sm">{props.children}</div>;
}
