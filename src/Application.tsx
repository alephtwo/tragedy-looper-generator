import * as React from 'react';
import { Container, makeStyles } from '@material-ui/core';
import { ScriptGenerator } from './script/ScriptGenerator';

export function Application(): JSX.Element {
  const styles = useStyles();
  return (
    <Container className={styles.application}>
      <ScriptGenerator />
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  application: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));
