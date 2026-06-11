import * as React from "react";

interface TabButtonProps extends React.PropsWithChildren {
  active: boolean;
  onClick: () => void;
}

export function TabButton({ active, onClick, children }: TabButtonProps): React.JSX.Element {
  return (
    <button
      onClick={onClick}
      className={`flex cursor-pointer items-center gap-2 rounded-t-md border-x border-t px-4 py-2 text-sm font-semibold transition-colors ${
        active
          ? "border-slate-500 bg-slate-100/75 text-slate-800"
          : "border-transparent bg-slate-100/20 text-white/70 hover:bg-slate-100/30 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}
