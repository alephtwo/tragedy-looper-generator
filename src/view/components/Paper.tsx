import * as React from "react";

interface PaperProps extends React.PropsWithChildren {
  className?: string;
}

export function Paper({ children, className }: PaperProps) {
  return (
    <div
      className={`w-full p-4 bg-slate-100/75 border border-slate-500 rounded-sm ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
