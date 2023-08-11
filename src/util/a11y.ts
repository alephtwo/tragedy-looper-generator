import type * as React from "react";

export async function reportAccessibility(App: typeof React, config?: Record<string, unknown>) {
  if (process.env.NODE_ENV !== "production") {
    const axe = await import("@axe-core/react");
    const ReactDOM = await import("react-dom");

    await axe.default(App, ReactDOM, 1_000, config);
  }
}
