import * as React from "react";

import {
  PersonSearch,
  PsychologyAlt,
  Description,
  DateRange,
  PeopleAlt,
  CrisisAlert,
  MenuBook,
  FindInPage,
  Celebration,
  SportsKabaddi,
  AssignmentLate,
  Newspaper,
} from "@mui/icons-material";
import { SvgIconProps } from "@mui/material";

export const Mastermind = (props: SvgIconProps) => <PsychologyAlt {...props} />;
export const Players = (props: SvgIconProps) => <PersonSearch {...props} />;
export const Generate = (props: SvgIconProps) => <Description {...props} />;
export const Cast = (props: SvgIconProps) => <PeopleAlt {...props} />;
export const Days = (props: SvgIconProps) => <DateRange {...props} />;
export const Incidents = (props: SvgIconProps) => <CrisisAlert {...props} />;
export const TragedySet = (props: SvgIconProps) => <MenuBook {...props} />;
export const Cheatsheet = (props: SvgIconProps) => <FindInPage {...props} />;
export const WinConditions = (props: SvgIconProps) => <Celebration {...props} />;
export const MastermindAbilities = (props: SvgIconProps) => <AssignmentLate {...props} />;
export const RoleAbilities = (props: SvgIconProps) => <SportsKabaddi {...props} />;
export const PlotRules = (props: SvgIconProps) => <Newspaper {...props} />;
