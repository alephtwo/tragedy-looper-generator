import * as React from 'react';
import { Paper, Typography } from '@mui/material';
import { Script } from '../types/Script';

interface ScriptEditorProps {
  setScript: React.Dispatch<Script>;
}
export function ScriptEditor(props: ScriptEditorProps): JSX.Element {
  console.debug(props);

  return (
    <Paper sx={styles.paper}>
      <Typography variant="h1">Coming Soon</Typography>
    </Paper>
  );
}

const styles = {
  paper: {
    padding: 2,
  },
};
