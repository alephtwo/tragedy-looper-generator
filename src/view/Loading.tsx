import * as React from "react";

export function Loading(): React.JSX.Element {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <span className="text-4xl text-gray-100">Loading...</span>
      <progress className="progress text-gray-100 w-1/2" aria-label="Loading Progress" />
    </div>
  );
}
