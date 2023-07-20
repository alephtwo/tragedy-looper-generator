import { Grid } from "@mui/material";
import * as React from "react";
import { Script } from "../model/Script";
import { ReferenceCard } from "./ReferenceCard";

interface ReferenceCardsProps {
  script: Script;
}

export function ReferenceCards(props: ReferenceCardsProps): JSX.Element {
  if (!props.script.isValid()) {
    return <></>;
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={6}>
        <ReferenceCard script={props.script} mastermind={true} />
      </Grid>
      <Grid item xs={12} md={6}>
        <ReferenceCard script={props.script} mastermind={false} />
      </Grid>
    </Grid>
  );
}
