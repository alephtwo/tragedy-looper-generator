interface RangeProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
}

export function Range({
  min,
  max,
  value,
  onChange,
  className,
  ...rest
}: Readonly<RangeProps>): React.JSX.Element {
  return (
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className={`h-1.5 w-full cursor-pointer rounded-full accent-blue-700 ${className ?? ""}`}
      {...rest}
    />
  );
}
