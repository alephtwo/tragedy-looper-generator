import * as React from 'react';
import { Paper, Typography } from '@mui/material';
import { Script } from '../model/Script';
import { useTranslation } from 'react-i18next';

interface ScriptEditorProps {
  setScript: React.Dispatch<Script>;
}
export function ScriptEditor(_props: ScriptEditorProps): JSX.Element {
  const { t } = useTranslation();
  const x = t('scaffolding.comingSoon');
  return (
    <Paper sx={styles.paper}>
      <Typography variant="h1">{x}</Typography>
    </Paper>
  );
}

const styles = {
  paper: {
    padding: 2,
  },
};
