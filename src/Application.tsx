import * as React from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export function Application(): JSX.Element {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t("scaffolding.title");
  }, []);

  return <h1 className="text-6xl">Hello, World!</h1>;
}
