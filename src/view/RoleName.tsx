import React from "react";
import { DualRole, Role } from "../data/types/Role";
import { useTranslation } from "react-i18next";

interface RoleNameProps {
  role: Role | DualRole;
}
export function RoleName({ role }: RoleNameProps): React.JSX.Element {
  const { t } = useTranslation();
  if (role instanceof Role) {
    return <>{t(role.name_i18n_key)}</>;
  } else {
    return (
      <>
        L: {t(role.lightWorld.name_i18n_key)} / D: {t(role.darkWorld.name_i18n_key)}
      </>
    );
  }
}
