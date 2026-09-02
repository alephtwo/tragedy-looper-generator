interface TableProps extends React.PropsWithChildren {
  className?: string;
}

// Provides daisyui-style compact table spacing/borders for plain table/thead/tbody markup.
export function Table({ children, className }: TableProps): React.JSX.Element {
  return (
    <table
      className={`w-full text-left text-sm [&_tbody_tr:not(:last-child)]:border-b [&_tbody_tr:not(:last-child)]:border-slate-200 [&_td]:px-2 [&_td]:py-1 [&_th]:px-2 [&_th]:py-1 [&_th]:font-semibold [&_thead_tr]:border-b [&_thead_tr]:border-slate-400 ${className ?? ""}`}
    >
      {children}
    </table>
  );
}
