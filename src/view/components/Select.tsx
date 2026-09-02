import { Label } from "./Label";

interface SelectProps<T extends string> extends React.PropsWithChildren {
  id?: string;
  label: React.ReactNode;
  value: T;
  onChange: (value: T) => void;
}

export function Select<T extends string>(props: SelectProps<T>): React.JSX.Element {
  const { id, label, value, onChange, children } = props;
  return (
    <div className="w-full">
      <Label htmlFor={id}>{label}</Label>
      <select
        id={id}
        className="w-full cursor-pointer rounded-md border border-slate-400 bg-white px-2 py-1 text-sm"
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
      >
        {children}
      </select>
    </div>
  );
}
