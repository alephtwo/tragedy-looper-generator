import * as React from "react";
import { useTranslation } from "react-i18next";
import { Script } from "../model/Script";

interface CheatsheetProps {
  script: Script;
}
export function Cheatsheet(_props: CheatsheetProps): React.JSX.Element {
  const { t } = useTranslation();
  return (
    <div className="h-10 p-2 bg-blue-500">
      <h1>{t("scaffolding.cheatsheet")}</h1>
    </div>
  );
}
