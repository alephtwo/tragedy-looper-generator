interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "soft";
}

export function Button({
  variant = "solid",
  className,
  ...rest
}: Readonly<ButtonProps>): React.JSX.Element {
  return (
    <button
      className={`inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-semibold transition-colors ${
        variant === "solid"
          ? "bg-blue-700 text-white hover:bg-blue-800"
          : "bg-blue-100 text-blue-800 hover:bg-blue-200"
      } ${className ?? ""}`}
      {...rest}
    />
  );
}
