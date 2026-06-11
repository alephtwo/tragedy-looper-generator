import * as React from "react";

interface PaperProps extends React.PropsWithChildren {
  className?: string;
}

export function Paper({ children, className }: PaperProps) {
  return (
    <div
      className={`w-full rounded-sm border border-slate-500 bg-slate-100/75 p-4 ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
