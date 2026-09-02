interface LabelProps extends React.PropsWithChildren {
  htmlFor?: string;
}

export function Label({ htmlFor, children }: Readonly<LabelProps>): React.JSX.Element {
  return (
    <label htmlFor={htmlFor} className="mb-1 flex items-center gap-1 text-sm font-medium">
      {children}
    </label>
  );
}
