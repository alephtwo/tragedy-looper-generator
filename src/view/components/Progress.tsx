interface ProgressProps {
  className?: string;
  "aria-label"?: string;
}

// No value attribute means the browser renders its native indeterminate animation.
export function Progress({ className, ...rest }: Readonly<ProgressProps>): React.JSX.Element {
  return (
    <progress
      className={`h-2 w-full rounded-full [&::-moz-progress-bar]:rounded-full [&::-moz-progress-bar]:bg-current [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-bar]:bg-white/20 [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-current ${className ?? ""}`}
      {...rest}
    />
  );
}
