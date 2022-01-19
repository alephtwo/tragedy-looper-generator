import * as React from 'react';
import { useState } from 'react';
import { AppBar, Container, Grid, Tab, Tabs } from '@mui/material';
import { ScriptGenerator } from './scriptGenerator/ScriptGenerator';
import { Script } from './types/Script';
import { ReferenceCards } from './referenceCard/ReferenceCards';
import { Cheatsheet } from './referenceCard/Cheatsheet';
import { TragedySets } from './data/TragedySets';
import { ScriptEditor } from './scriptEditor/ScriptEditor';

const initialScript: Script = new Script({
  tragedySet: TragedySets.basicTragedy,
  mainPlot: TragedySets.basicTragedy.mainPlots[0],
  subplots: [],
  days: 7,
  cast: [],
});

export function Application(): JSX.Element {
  const [tab, setTab] = useState(0);
  const [script, setScript] = useState(initialScript);

  return (
    <Container sx={styles.application}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <AppBar position="static">
            <Tabs value={tab} onChange={(_e, v: number) => setTab(v)} textColor="secondary" indicatorColor="secondary">
              <Tab sx={{ color: 'white' }} label="Generator" />
              <Tab sx={{ color: 'white' }} label="Editor" />
            </Tabs>
          </AppBar>
        </Grid>
        <TabPanel index={0} currentTab={tab}>
          <Grid item xs={12}>
            <ScriptGenerator setScript={setScript} />
          </Grid>
          <Grid item xs={12}>
            <ReferenceCards script={script} />
          </Grid>
          <Grid item xs={12}>
            <Cheatsheet script={script} />
          </Grid>
        </TabPanel>
        <TabPanel index={1} currentTab={tab}>
          <Grid item xs={12}>
            <ScriptEditor setScript={setScript} />
          </Grid>
        </TabPanel>
      </Grid>
    </Container>
  );
}

interface TabProps {
  index: number;
  currentTab: number;
  children: React.ReactNode;
}
function TabPanel(props: TabProps): JSX.Element {
  return props.currentTab === props.index ? <>{props.children}</> : <></>;
}

const styles = {
  application: {
    marginTop: 1,
    marginBottom: 1,
  },
};
