import * as React from 'react';
import { makeStyles, Paper, Typography } from '@material-ui/core';
import { Script } from '../types/Script';

interface ScriptEditorProps {
  setScript: React.Dispatch<Script>;
}
export function ScriptEditor(props: ScriptEditorProps): JSX.Element {
  const styles = useStyles();
  console.debug(props);

  return (
    <Paper className={styles.paper}>
      <Typography variant="h1">Coming Soon</Typography>
    </Paper>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
}));
