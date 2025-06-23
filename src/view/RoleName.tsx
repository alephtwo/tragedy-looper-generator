import React from "react";
import { DualRole, Role } from "../data/types/Role";

interface RoleNameProps {
  role: Role | DualRole;
}
export function RoleName({ role }: RoleNameProps): React.JSX.Element {
  if (role instanceof Role) {
    return <>{role.name()}</>;
  } else {
    return (
      <>
        L: {role.lightWorld.name()} / D: {role.darkWorld.name()}
      </>
    );
  }
}
