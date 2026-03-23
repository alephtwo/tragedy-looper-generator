import * as React from "react";
import { createRoot } from "react-dom/client";
import { Application } from "./view/Application";
import { reportAccessibility } from "./util/a11y";

const root = createRoot(document.getElementById("app") as HTMLDivElement);
root.render(<Application />);

reportAccessibility(React).catch(console.error);
