import * as React from "react";
import { createRoot } from "react-dom/client";

import { reportAccessibility } from "./util/a11y";
import { Application } from "./view/Application";

const root = createRoot(document.getElementById("app") as HTMLDivElement);
root.render(<Application />);

reportAccessibility(React).catch(console.error);
