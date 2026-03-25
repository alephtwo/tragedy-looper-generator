import * as React from "react";

interface TabButtonProps extends React.PropsWithChildren {
  active: boolean;
  onClick: () => void;
}

export function TabButton({ active, onClick, children }: TabButtonProps): React.JSX.Element {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-t-md border-t border-x transition-colors cursor-pointer ${
        active
          ? "bg-slate-100/75 border-slate-500 text-slate-800"
          : "bg-slate-100/20 border-transparent text-white/70 hover:text-white hover:bg-slate-100/30"
      }`}
    >
      {children}
    </button>
  );
}
