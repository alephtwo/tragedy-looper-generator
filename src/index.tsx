import * as React from "react";
import { createRoot } from "react-dom/client";
import { Application } from "./view/Application";
import "./i18n";

const app = (
  <React.Suspense fallback={<h1>Loading...</h1>}>
    <Application />
  </React.Suspense>
);

const root = createRoot(document.getElementById("app") as HTMLDivElement);
root.render(app);
