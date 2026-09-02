interface DividerProps {
  className?: string;
}

export function Divider({ className }: Readonly<DividerProps>): React.JSX.Element {
  return <div className={`h-px w-full bg-slate-400/60 ${className ?? ""}`} />;
}
